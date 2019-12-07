import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Lottie from "react-lottie";
import ReactNipple from "react-nipple";
import styled from "styled-components";
import "react-nipple/lib/styles.css";
import * as animationData from "../assets/lottie/11250-count-down.json";

const lottieOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


export default inject("socket")(
  observer(props => {
    const { socket } = props.socket;
    const [isCountdown, setCountdown] = useState(true);

    useEffect(() => {
      window.navigator.vibrate([
        200,
        800,
        200,
        800,
        200,
        800,
        200,
        800,
        200,
        800,
        200,
        800
      ]);
    }, []);

    let dir = "";
    let lastSentDir = "";
    let lastSentStatus = "";

    const handleMove = (event, data) => {
      if (data.force >= 0.75) {
        if (lastSentDir !== dir || lastSentStatus === "up") {
          socket.emit("gamepad:keyDown", dir);
          lastSentDir = dir;
          lastSentStatus = "down";
          window.navigator.vibrate(50);
        }
      } else if (lastSentStatus !== "up") {
        socket.emit("gamepad:keyUp", dir);
        lastSentStatus = "up";
      }
    };
    const handleDir = (event, data) => {
      console.log(event, data);
      dir = data.direction.angle;
    };
    const handleEnd = () => {
      socket.emit("gamepad:keyUp");
      lastSentStatus = "up";
    };

    return (
      <Wrapper>
        {isCountdown && (
          <>
            <Lottie
              options={lottieOptions}
              width="100%"
              height="240"
              eventListeners={[
                {
                  eventName: "complete",
                  callback: () => setCountdown(false)
                }
              ]}
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        )}

        <ReactNipple
          options={{ mode: "static", position: { top: "50%", left: "50%" } }}
          style={{
            // outline: "1px dashed red",
            width: "100%",
            height: 500,
            // backgroundColor: "#eee",
            position: "absolute",
            left: 0,
            bottom: 0
          }}
          onMove={handleMove}
          onDir={handleDir}
          onEnd={handleEnd}
        />
      </Wrapper>
    );
  })
);
