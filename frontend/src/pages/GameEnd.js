import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import Lottie from "react-lottie";
import styled from "styled-components";
import * as animationData from "../assets/lottie/899-like.json";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  color: #ffffff;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
`;

export default inject("socket")(
  observer(({ socket }) => {
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
        <Lottie options={lottieOptions} width="100%" height="320" />
        <Text>저희 게임을 즐겨주셔서 감사합니다!</Text>
      </Wrapper>
    );
  })
);
