import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import useExchangeRateLoad from "../hooks/useExchangeRateLoad";
import { comma } from "../utils/comma";
import { FIRST_CALCULATOR_OPTIONS } from "../utils/constants";

function FirstCalculator() {
  const [remittance, setRemittance] = useState(0); // 송금액
  const [receviedAmount, setReceviedAmount] = useState(0); // 수취금액
  const [isResult, setIsResult] = useState(false); // 결과값이 있는지 여부
  const [exchangeRate, setExchangeRate] = useState({
    USDKRW: 0,
    USDJPY: 0,
    USDPHP: 0,
  });
  const [selectedExchangeRate, setSelectedExchangeRate] = useState({
    rate: 0,
    nation: "",
  });
  const [isValidAmount, setIsValidAmount] = useState(true);
  const { isLoading, isError, data } = useExchangeRateLoad();

  useEffect(() => {
    if (data) {
      const { USDKRW, USDJPY, USDPHP } = data;
      setExchangeRate({ USDKRW, USDJPY, USDPHP });
      setSelectedExchangeRate({
        rate: USDKRW.toFixed(2),
        nation: "KRW",
      });
    }
  }, [data]);

  const onChangeOption = (e) => {
    const rate = exchangeRate[`USD${e.target.value}`].toFixed(2);
    const nation = e.target.value;
    setSelectedExchangeRate({
      rate,
      nation,
    });
    setIsResult(false);
  };

  const onChangeRemittance = (e) => {
    setRemittance(e.target.value);
  };

  const onSubmit = () => {
    const parsedRemittance = parseFloat(remittance);
    setIsResult(true);
    if (
      parsedRemittance <= 0 ||
      parsedRemittance >= 10000 ||
      isNaN(parsedRemittance)
    ) {
      setIsValidAmount(false);
      return;
    }
    setIsValidAmount(true);
    setReceviedAmount(
      (parsedRemittance * selectedExchangeRate.rate).toFixed(2)
    );
  };

  const amountMessage = (isValidAmount) => {
    return isValidAmount
      ? `수취금액은 ${comma(receviedAmount)} ${selectedExchangeRate.nation}
    입니다.`
      : "송금액이 바르지 않습니다";
  };

  if (isError) return <div>로딩 중 에러가 발생 했습니다.</div>;
  if (isLoading) return <div>환율 정보 로딩중...</div>;

  return (
    <FirstCalculatorContainer>
      <CalculatorInner>
        <CalculatorHeader>환율 계산</CalculatorHeader>

        <CalculatorBlock>
          <CalculatorText>송금국가: 미국(USD)</CalculatorText>
        </CalculatorBlock>

        <CalculatorBlock>
          <CalculatorText>수취국가: </CalculatorText>
          <select onChange={onChangeOption}>
            {FIRST_CALCULATOR_OPTIONS.map((option) => {
              const { key, value, name } = option;
              return (
                <option key={`option-${key}`} value={value}>
                  {name}
                </option>
              );
            })}
          </select>
        </CalculatorBlock>

        <CalculatorBlock>
          <CalculatorText>환율: </CalculatorText>
          {selectedExchangeRate.rate} {selectedExchangeRate.nation}/USD
        </CalculatorBlock>

        <CalculatorBlock>
          <CalculatorText>송금액:</CalculatorText>
          <input type="number" onChange={onChangeRemittance} />
          <CalculatorText>USD</CalculatorText>
        </CalculatorBlock>

        <SubmitButton variant="secondary" onClick={onSubmit}>
          Submit
        </SubmitButton>

        {isResult && (
          <CalculatorBlock>
            <CalculatorText error={!isValidAmount}>
              {amountMessage(isValidAmount)}
            </CalculatorText>
          </CalculatorBlock>
        )}
      </CalculatorInner>
    </FirstCalculatorContainer>
  );
}

const FirstCalculatorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CalculatorInner = styled.div`
  width: 500px;
`;

const CalculatorHeader = styled.h1`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -1.5px;
  margin-bottom: 30px;
`;

const CalculatorBlock = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const CalculatorText = styled.span`
  font-size: 18px;
  font-weight: 500;
  ${(props) => props.error && "color: #b3130b;"}
`;

const SubmitButton = styled(Button)`
  width: 110px;
  height: 40px;
  font-size: 18px;
`;

export default FirstCalculator;
