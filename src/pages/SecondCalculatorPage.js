import React, { useState, useEffect } from "react";
import { getExchangeRate } from "../utils/api";
import styled from "styled-components";

function SecondCalculator() {
  const [money, setMoney] = useState(0);
  const [selectedTab, setSelectedTab] = useState("CAD");
  const [activeTab, setActiveTab] = useState("CAD");
  const [selectedCountry, setCountry] = useState("USD");
  const [result, setResult] = useState(0);

  const data = [
    { id: "0", tabTitle: "USD", tabContent: "Tab Content 0" },
    { id: "1", tabTitle: "CAD", tabContent: "Tab Content 1" },
    { id: "2", tabTitle: "KRW", tabContent: "Tab Content 2" },
    { id: "3", tabTitle: "HKD", tabContent: "Tab Content 3" },
    { id: "4", tabTitle: "JPY", tabContent: "Tab Content 4" },
    { id: "5", tabTitle: "CNY", tabContent: "Tab Content 5" },
  ];

  useEffect(() => {
    getData();
  }, []);

  const handleSelect = (e) => {
    setCountry(e.target.value);
    calculate();
  };

  const handleClick = (e) => {
    setSelectedTab(e.target.id);
    setActiveTab(e.target.id);
    calculate();
  };

  const calculate = () => {
    const fromCurrency = "USD" + selectedCountry;
    const toCurrency = "USD" + selectedTab;
    setResult(
      exchangeRateInfo[toCurrency] *
        (1 / exchangeRateInfo[fromCurrency]) *
        money
    );
  };

  const [referenceDate, setReferenceDate] = useState("");
  const [exchangeRateInfo, setExchangeRateInfo] = useState({});

  const getData = async () => {
    try {
      const { quotes, timestamp } = await getExchangeRate();
      const { USDUSD, USDKRW, USDJPY, USDCAD, USDCNY, USDHKD } = quotes;
      setExchangeRateInfo({ USDUSD, USDKRW, USDJPY, USDCAD, USDCNY, USDHKD });
      convertDate(timestamp);
    } catch (e) {
      console.log(e);
    }
  };

  const convertDate = (time) => {
    const dateObject = new window.Date(time * 1000);
    const dateFormat = dateObject.toLocaleDateString();
    const monthName = dateObject.toLocaleString("en-US", {
      month: "short",
    });
    setReferenceDate(
      dateFormat.slice(0, 4) + "-" + monthName + "-" + dateFormat.slice(9, 11)
    );
  };

  const handleChange = (e) => {
    setMoney(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.charCode === 13) {
      if (money > 1000) {
        setMoney(1000);
      }
    }
    calculate();
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
        {data
          .filter((item) => item.tabTitle !== selectedCountry)
          .map((item) => (
            <Tab
              key={item.id}
              id={item.tabTitle}
              onClick={handleClick}
              className={
                activeTab === item.id
                  ? "tab-title tab-title-active"
                  : "tab-title"
              }
            >
              {item.tabTitle}
            </Tab>
          ))}
      </Tabs>
      <ResultBox>
        <hr />
        <Currency>
          {selectedTab} : {result.toFixed(2)}
        </Currency>
        <Date>기준일 : {referenceDate}</Date>
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
  list-style: none;
  padding: 0px;
  margin: 0;
  .tab-content {
    background-color: #f6d55c;
    padding: 5px;
    margin: 0;
  }
`;
const Tab = styled.div`
  margin: 5px;

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
`;

const Currency = styled.div``;

const Date = styled.div``;
