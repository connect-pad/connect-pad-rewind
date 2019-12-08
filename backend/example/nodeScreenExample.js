require("dotenv").config();

const io = require("socket.io-client");
const socket = io(`http://localhost:${process.env.PORT}`);

socket.emit("setDevice", "screen");

setTimeout(() => {
  socket.emit("screen:recruit");
}, 3000);
const players = [];

function player(id) {
  return players.find(p => p.id === id);
}

socket.on("screen:newPlayer", ({ id }) => {
  players.push({ id });
});

socket.on("screen:playerOut", ({ id }) => {
  players.splice(players.indexOf(player(id)), 1);
});

socket.on("screen:gameReady", () => {});

socket.on("screen:changeCharacter", ({ id, characterIndex }) => {
  const c = player(id);
  c.characterIndex = characterIndex;
});

socket.on("screen:playerReady", ({ id, status }) => {
  const c = player(id);
  c.ready = status;

  if (players.length <= players.filter(({ ready }) => ready).length) {
    socket.emit("screen:gameStart");
  }
});

socket.on("screen:keyDown", ({ id, key }) => {
  const c = player(id);
  c.key = key;
});

socket.on("screen:keyUp", ({ id, key }) => {
  const c = player(id);
  c.key = null;
});

setInterval(() => {
  console.log(players);
}, 100);

// "screen:changeCharacter", {
//   id: socket.id,
//   characterIndex
// }

// "screen:playerReady", {
//   id: socket.id,
//   status: status ? true : false
// }

// "screen:keyDown", {
//   id: socket.id,
//   key
// }

// "screen:keyUp", {
//   id: socket.id,
//   key
// }
