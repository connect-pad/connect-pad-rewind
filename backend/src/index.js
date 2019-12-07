require("dotenv").config();
// const app = require("https").createServer({});
const io = require("socket.io")(process.env.PORT);

const { log } = console;
log(`listening on *:${process.env.PORT}`);

const settings = {
  scene: "",
  devices: {
    screen: null,
    gamepads: {
      players: [],
      waiters: []
    }
  }
};

const clearDisconnectedSocket = () => {
  settings.devices.gamepads.players = settings.devices.gamepads.players.filter(
    ({ disconnected }) => !disconnected
  );
  settings.devices.gamepads.waiters = settings.devices.gamepads.waiters.filter(
    ({ disconnected }) => !disconnected
  );
};

io.on("connection", socket => {
  log(`[${socket.id}] Device connected`);

  socket.on("setDevice", deviceType => {
    switch (deviceType) {
      case "screen":
        log(`[${socket.id}] Try to set device 'Screen'...`);
        settings.scene = "splash";
        settings.devices.screen = socket;
        log(`[${socket.id}] Successfully set device 'Screen'.`);

        // io.of("/")
        //   .in("screen")
        //   .clients((error, socketIds) => {
        //     if (error) throw error;
        //     socketIds.forEach(socketId =>
        //       io.sockets.sockets[socketId].leave("screen")
        //     );
        //     socket.join("screen");
        //   });
        break;
      case "gamepad":
      case "gamepads":
      case "player":
      case "players":
        log(`[${socket.id}] Try to set device 'Gamepad'`);
        socket.join("gamepad");
        settings.devices.gamepads.waiters.push(socket);
        log(`[${socket.id}] Successfully set device 'Gamepad'.`);
        socket.emit("gamepad:changeScene", "waitForNextGame");

        if (settings.scene === "recruit") {
          socket.emit("gamepad:recruit");
        }
        // log(
        //   settings.devices.gamepads.waiters.map(
        //     ({ disconnected }) => disconnected
        //   )
        // );
        // setTimeout(() => {
        //   socket.emit("gamepad:recruit");
        // }, 3000);

        break;
      default:
        log(
          `[${socket.id}] Failed to set device type. Unknown device type: ${deviceType}`
        );
        break;
    }
  });

  socket.on("screen:recruit", () => {
    log("Start recruiting participants.");
    settings.scene = "recruit";
    io.to("gamepad").emit("gamepad:recruit");
  });

  socket.on("gamepad:participate", () => {
    const { gamepads } = settings.devices;
    if (gamepads.players.length < process.env.MAX_PLAYERS_PER_GAME) {
      if (!gamepads.players.includes(socket)) {
        gamepads.players.push(socket);
        gamepads.waiters.splice(gamepads.waiters.indexOf(socket), 1);
        socket.emit("gamepad:changeScene", "waitForPlayers");
        settings.devices.screen.emit("screen:newPlayer", { id: socket.id });
        log(`[${socket.id}] joins`);
      }
    }
    log(gamepads.players.length);
    if (gamepads.players.length >= process.env.MAX_PLAYERS_PER_GAME) {
      settings.scene = "selectCharacter";
      settings.devices.screen.emit("screen:gameReady");
      gamepads.players.forEach(s => {
        s.emit("gamepad:gameReady");
      });
      gamepads.waiters.forEach(s => {
        s.emit("gamepad:recruitEnd");
      });

      log("Player recruitment is over.");
      log("Game Ready!");
    }
  });

  socket.on("gamepad:changeCharacter", characterIndex => {
    settings.devices.screen.emit("screen:changeCharacter", {
      id: socket.id,
      characterIndex
    });
  });

  socket.on("gamepad:gameReady", status => {
    settings.devices.screen.emit("screen:playerReady", {
      id: socket.id,
      status: status ? true : false
    });
  });

  socket.on("screen:gameStart", () => {
    settings.scene = "inGame";

    settings.devices.gamepads.players.forEach(s => {
      s.emit("gamepad:gameStart");
    });
  });

  socket.on("gamepad:keyDown", key => {
    settings.devices.screen.emit("screen:keyDown", {
      id: socket.id,
      key
    });
    log(`[${socket.id}] key down: ${key}`);
  });

  socket.on("gamepad:keyUp", key => {
    settings.devices.screen.emit("screen:keyUp", {
      id: socket.id,
      key
    });
    log(`[${socket.id}] key up: ${key}`);
  });

  socket.on("screen:gameEnd", summary => {
    settings.scene = "GameOver";

    settings.devices.gamepads.players.forEach(s => {
      s.emit("gamepad:gameEnd", summary);
    });

    settings.devices.gamepads.waiters.push(
      ...settings.devices.gamepads.players
    );

    settings.devices.gamepads.players(
      0,
      settings.devices.gamepads.players.length
    );
    log("Game is over!");
  });

  socket.on("disconnect", reason => {
    log(`[${socket.id}] Disconnected: ${reason}`);
    settings.devices.screen.emit("screen:playerOut", { id: socket.id });
    clearDisconnectedSocket();
  });

  // socket.join("screen");
});

require("./screen");
