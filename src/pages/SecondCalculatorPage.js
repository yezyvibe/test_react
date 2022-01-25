import React, { useState } from "react";
import { getExchangeRate } from "../utils/api";
import styled from "styled-components";

function SecondCalculator() {
  const [money, setMoney] = useState("");
  const [selectedTab, setSelectedTab] = useState("CAD");
  const [standard, setStandard] = useState("");
  const [selectedCountry, setCountry] = useState("USD");
  const data = [
    { id: "0", tabTitle: "USD", tabContent: "Tab Content 0" },
    { id: "1", tabTitle: "CAD", tabContent: "Tab Content 1" },
    { id: "2", tabTitle: "KRW", tabContent: "Tab Content 2" },
    { id: "3", tabTitle: "HKD", tabContent: "Tab Content 3" },
    { id: "4", tabTitle: "JPY", tabContent: "Tab Content 4" },
    { id: "5", tabTitle: "CNY", tabContent: "Tab Content 5" },
  ];
  const [activeTab, setActiveTab] = useState(data[0].id);

  const listTitles = data.map((item) => (
    <li
      onClick={() => setActiveTab(item.id)}
      className={
        activeTab === item.id ? "tab-title tab-title-active" : "tab-title"
      }
    >
      {item.tabTitle}
    </li>
  ));

  const listContent = data.map((item) => (
    <p style={activeTab === item.id ? {} : { display: "none" }}>
      {item.tabContent}
    </p>
  ));

  const handleChange = (e) => {
    setMoney(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.charCode === 13) {
      if (money > 1000) {
        setMoney(1000);
      }
    }
  };

  const handleSelect = (e) => {
    setCountry(e.target.value);
    setStandard(selectedCountry + selectedTab);
  };

  const handleClick = (e) => {
    setSelectedTab(e.target.id);
    // getData(setCountry, selectedTab);
  };

  return (
    <CalculatorContainer>
      <InputBox>
        <input
          onChange={handleChange}
          onKeyPress={handleEnter}
          value={money}
          type="number"
        ></input>
        <select onChange={handleSelect}>
          {data.map((item) => (
            <option key={item.id}>{item.tabTitle}</option>
          ))}
        </select>
      </InputBox>

      <Tabs>
        <ul className="tabs-titles">
          {data
            .filter((item) => item.tabTitle !== selectedCountry)
            .map((item) => (
              <li>
                <Tab key={item.id} id={item.tabTitle} onClick={handleClick}>
                  {item.tabTitle}
                </Tab>
              </li>
            ))}
        </ul>
        <div className="tab-content">{listContent}</div>
      </Tabs>
      <ResultBox>
        <hr />
        <Currency>{selectedTab}</Currency>
        <Date>날짜</Date>
      </ResultBox>
    </CalculatorContainer>
  );
}

export default SecondCalculator;

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const InputBox = styled.div`
  margin-bottom: 30px;
  // input {
  //   border-radius: 5px;
  // }
  // input:focus {
  //   outline: 2px solid #f6d55c;
  // }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;
const ResultBox = styled.div``;
const Tabs = styled.div`
  display: flex;
  .tabs-titles {
    list-style: none;
    padding: 0px;
    margin: 0;
  }

  .tab-title {
    background-color: #fff;
    display: inline-block;
    padding: 10px;
    color: #c7c6c2;
    cursor: pointer;
    margin-left: 1px;
  }

  .tab-title-active {
    background-color: #f6d55c;
    color: #00070a;
  }

  .tab-content {
    background-color: #f6d55c;
    padding: 5px;
    margin: 0;
  }
`;
const Tab = styled.div``;

const Currency = styled.div``;

const Date = styled.div``;
