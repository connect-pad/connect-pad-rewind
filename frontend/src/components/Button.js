import styled, { css } from "styled-components";

import imgButton1 from "assets/img/buttons/_1.png";
import imgButton2 from "assets/img/buttons/_2.png";
import imgButton3 from "assets/img/buttons/_3.png";
import imgButton4 from "assets/img/buttons/_4.png";

export default styled.button`
  width: auto;
  height: auto;
  position: relative;
  padding: 12px 24px 18px 24px;
  border: none;
  background-color: transparent;
  ${props =>
    props.type === "primary" &&
    css`
  background-image: url('${imgButton1}');`}
  
  ${props =>
    props.type === "warning" &&
    css`
  background-image: url('${imgButton2}');`}
  
  ${props =>
    props.type === "danger" &&
    css`
  background-image: url('${imgButton3}');`}
  
  ${props =>
    props.type === "success" &&
    css`
  background-image: url('${imgButton4}');`}

  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 36px;
  color: #000000;
`;
