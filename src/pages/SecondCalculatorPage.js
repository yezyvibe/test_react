import React, { useState } from "react";
import styled from "styled-components";

function SecondCalculator() {
  const [money, setMoney] = useState("");

  const handleChange = (e) => {
    setMoney(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.charCode === 13) {
      if (isNaN(money)) {
        alert("not a number");
      } else if (money < 1000) {
        setMoney(1000);
      }
    }
  };

  return (
    <CalculatorContainer>
      <InputBox>
        <input
          onChange={handleChange}
          onKeyPress={handleEnter}
          value={money}
        ></input>
        <select>
          <option>USD</option>
          <option>CAD</option>
          <option>KRW</option>
          <option>HKD</option>
          <option>JPY</option>
          <option>CNY</option>
        </select>
      </InputBox>
      <ResultBox>
        <Tabs>
          <Tab>CAD</Tab>
          <Tab>KRW</Tab>
          <Tab>HKD</Tab>
          <Tab>JPY</Tab>
          <Tab>CNY</Tab>
        </Tabs>
      </ResultBox>
    </CalculatorContainer>
  );
}

export default SecondCalculator;

const CalculatorContainer = styled.div``;
const InputBox = styled.div``;
const ResultBox = styled.div``;
const Tabs = styled.div``;
const Tab = styled.div``;
