import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { getExchangeRate } from "../utils/api";
import { comma } from "../utils/comma";
import { FIRST_CALCULATOR_OPTIONS } from "../utils/constants";

function FirstCalculator() {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [remittance, setRemittance] = useState(0); // 송금액
  const [receviedAmount, setReceviedAmount] = useState(0); // 수취금액
  const [exchangeRate, setExchangeRate] = useState({
    USDKRW: 0,
    USDJPY: 0,
    USDPHP: 0,
  });
  const [selectedExchangeRate, setSelectedExchangeRate] = useState({
    rate: 0,
    nation: "",
  });

  const getData = async () => {
    try {
      setLoading(true);
      const { quotes } = await getExchangeRate();
      const { USDKRW, USDJPY, USDPHP } = quotes;
      console.log(typeof USDKRW)
      setExchangeRate({ USDKRW, USDJPY, USDPHP });
      setSelectedExchangeRate({
        rate: USDKRW.toFixed(2),
        nation: "KRW",
      });
    } catch (e) {
      setIsError(true);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeOption = (e) => {
    const rate = exchangeRate[`USD${e.target.value}`].toFixed(2);
    const nation = e.target.value;
    setSelectedExchangeRate({
      rate,
      nation,
    });
    setReceviedAmount(0);
  };

  const onChangeRemittance = (e) => {
    setRemittance(e.target.value);
  };

  const onSubmit = () => {
    setReceviedAmount(
      (parseInt(remittance) * selectedExchangeRate.rate).toFixed(2)
    );
  };

  if (isError) return <div>로딩 중 에러가 발생 했습니다.</div>;
  if (loading) return <div>환율 정보 로딩중...</div>;

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
                <Option key={`option-${key}`} value={value}>
                  {name}
                </Option>
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

        {receviedAmount !== 0 && (
          <CalculatorBlock>
            <CalculatorText>
              수취금액은 {comma(receviedAmount)} {selectedExchangeRate.nation}{" "}
              입니다.
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
`;

const Option = styled.option``;

const SubmitButton = styled(Button)`
  width: 110px;
  height: 40px;
  font-size: 18px;
`;

export default FirstCalculator;
