import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Slick from "react-slick";
import styled from "styled-components";

import Button from "components/Button";

import imgChar1 from "assets/img/char1.png";
import imgChar2 from "assets/img/char2.png";
import imgChar3 from "assets/img/char3.png";
import imgChar4 from "assets/img/char4.png";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: #ffffff;
`;

const Item = styled.div`
  height: 120px;
  text-align: center;
  overflow: visible;
`;

const Img = styled.img`
  display: inline-block !important;
`;

export default inject("socket")(
  observer(props => {
    const { socket } = props.socket;
    const [isReady, setIsReady] = useState(false);
    // useEffect(() => {
    //   socket.socket.emit("setDevice", "player");
    // }, []);

    const handleReadyClick = () => {
      const newReadyState = !isReady;
      socket.emit("gamepad:gameReady", newReadyState);
      setIsReady(newReadyState);
    };

    return (
      <Wrapper>
        <h3>게임이 준비되었습니다</h3>
        <h4>캐릭터를 선택해주세요.</h4>
        <br />
        <br />
        <div style={{ width: "100%", position: "relative" }}>
          <Slick
            {...{
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: 0,
              arrows: true
            }}
            style={{
              width: "100%"
            }}
            afterChange={index => {
              socket.emit("gamepad:changeCharacter", index);
            }}
          >
            <Item>
              <Img src={imgChar1} alt="character1" />
            </Item>
            <Item>
              <Img src={imgChar2} alt="character2" />
            </Item>
            <Item>
              <Img src={imgChar3} alt="character3" />
            </Item>
            <Item>
              <Img src={imgChar4} alt="character4" />
            </Item>
          </Slick>
        </div>
        <br />
        <br />
        <Button
          type={isReady ? "danger" : "success"}
          onClick={handleReadyClick}
        >
          {isReady ? "준비 해제" : "준비 완료"}
        </Button>
      </Wrapper>
    );
  })
);
