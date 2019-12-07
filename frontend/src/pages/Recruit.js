import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import Lottie from "react-lottie";
import styled from "styled-components";
import Button from "components/Button";
import * as animationData from "../assets/lottie/3610-user-connection.json";

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
    // useEffect(() => {
    //   socket.socket.emit("setDevice", "player");
    // }, []);
    const lottieOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <Wrapper>
        <Lottie options={lottieOptions} width="100%" height="240" />
        <br />
        <br />
        <Button
          onClick={() => {
            socket.emit("gamepad:participate");
          }}
          type="primary"
        >
          참가하기
        </Button>
      </Wrapper>
    );
  })
);
