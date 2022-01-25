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

  const handleSelectTab = (e) => {
    setCountry(e.target.value);
    calculate();
  };

  const handleClick = (e) => {
    setSelectedTab(e.target.id);
    setActiveTab(e.target.id);
    console.log(activeTab);
    // console.log(e.target.id);
    // console.log(selectedTab);
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
    calculate();
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
        <select onChange={handleSelectTab}>
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
              isActive={activeTab === item.tabTitle}
            >
              {item.tabTitle}
            </Tab>
          ))}
      </Tabs>
      <ResultBox>
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
  justify-content: flex-start;
  padding-top: 30vh;
  height: 100vh;
`;
const InputBox = styled.div`
  display: flex;
  margin-bottom: 30px;

  input {
    width: 180px;
    height: 50px;
    margin-right: 20px;
    border: none;
    border-radius: 1rem;
    outline: none;
    font-size: 24px;
    font-weight: bold;
    padding: 0 4vmin;
    background: #fef9ef;
    color: #ff865e;
    caret-color: #ff865e;
    box-shadow: inset 0.1rem 0.1rem 0.25rem;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    width: 100px;
    height: 50px;
    padding: 0.6em 1.4em;
    border: 1px solid #fff;
    text-align: center;
    border-radius: 0.5em;
    caret-color: #ff865e;
    background-color: #ff865e;
    color: #fff;

    select: focus {
      border-color: #ff695e;
    }
  }
`;
const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  background-color: #fef9ef;
`;

const Tabs = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  margin: 0;
  .tab-content {
    background-color: #f6d55c;
    padding: 5px;
    margin: 0;
  }
`;
const Tab = styled.div`
  background: ${(props) => (props.isActive ? "#ff865e" : "#FEF9EF")};
  color: ${(props) => (props.isActive ? "#FEF9EF" : "black")};
  cursor: pointer;
  padding: 10px;
  width: 60px;
`;

const Currency = styled.h3`
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 20px;
  color: #ff695e;
`;

const Date = styled.p`
  color: #ff695e;
`;
