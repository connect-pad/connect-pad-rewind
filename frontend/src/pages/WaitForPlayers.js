import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

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

  
    return (
      <Wrapper>
        <Text>다른 참가자를 기다리고 있습니다.</Text>
      </Wrapper>
    );
  })
);
