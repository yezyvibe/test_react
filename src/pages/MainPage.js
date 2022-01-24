import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

function MainPage() {
  const navigate = useNavigate();
  return (
    <MainPageContainer>
      <Button variant="primary" onClick={() => navigate("/first")}>
        첫 번째 환율 계산기
      </Button>
      <Button variant="secondary" onClick={() => navigate("/second")}>
        두 번째 환율 계산기
      </Button>
    </MainPageContainer>
  );
}

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainPage;
