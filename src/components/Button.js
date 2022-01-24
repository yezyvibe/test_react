import React from "react";
import styled, { css } from "styled-components";

function Button({ children, variant, ...rest }) {
  return (
    <ButtonStyled variant={variant} {...rest}>
      {children}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  width: 200px;
  height: 80px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 8px;
  ${(props) =>
    props.variant === "primary"
      ? css`
          background-color: #5086ff;
          border: none;
          color: white;
        `
      : css`
          background-color: white;
          border: 1px solid #5086ff;
          color: #5086ff;
        `}

  &:first-child {
    margin-right: 20px;
  }
`;

export default Button;
