import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import WaitForNextGame from "pages/WaitForNextGame";
import Recruit from "pages/Recruit";
import WaitForPlayers from "pages/WaitForPlayers";
import SelectCharacter from "pages/SelectCharacter";
import Gamepad from "pages/Gamepad";
import GameEnd from "pages/GameEnd";
import FullScreen from "react-request-fullscreen";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export default inject("routing")(
  inject("socket")(
    observer(props => {
      const { routing } = props;
      const { socket } = props.socket;

      socket.on("connect", () => {
        socket.emit("setDevice", "player");
        routing.push("/waitForNextGame");
        // routing.push("/selectCharacter");
      });

      socket.on("gamepad:changeScene", scene => {
        routing.push(`/${scene}`);
      });

      socket.on("gamepad:recruit", () => {
        toast.info("참가자 모집이 시작되었습니다!");
        routing.push(`/recruit`);
      });

      socket.on("gamepad:recruitEnd", () => {
        toast.info("참가자 모집이 마감되었습니다.");
        routing.push(`/waitForNextGame`);
      });

      socket.on("gamepad:gameReady", () => {
        toast.info("참가자 모집이 완료되었습니다.");
        routing.push("/selectCharacter");
      });

      socket.on("gamepad:gameStart", () => {
        routing.push("/gamepad");
      });

      useEffect(() => {
        // const elem = document.documentElement;
        // if (elem.requestFullscreen) {
        //   elem.requestFullscreen();
        // } else if (elem.mozRequestFullScreen) {
        //   /* Firefox */
        //   elem.mozRequestFullScreen();
        // } else if (elem.webkitRequestFullscreen) {
        //   /* Chrome, Safari and Opera */
        //   elem.webkitRequestFullscreen();
        // } else if (elem.msRequestFullscreen) {
        //   /* IE/Edge */
        //   elem.msRequestFullscreen();
        // }
      }, []);

      return (
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>connect-pad-rewind-frontend</title>
          </Helmet>
          <FullScreen>
            <ToastContainer
              position={toast.POSITION.TOP_CENTER}
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
            <Switch>
              <Route path="/" exact component={WaitForNextGame} />
              <Route path="/waitForNextGame" component={WaitForNextGame} />
              <Route path="/recruit" component={Recruit} />
              <Route path="/waitForPlayers" component={WaitForPlayers} />
              <Route path="/selectCharacter" component={SelectCharacter} />
              <Route path="/gamepad" component={Gamepad} />
            </Switch>
          </FullScreen>
        </div>
      );
    })
  )
);
