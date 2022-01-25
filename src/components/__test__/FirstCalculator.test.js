import { render, screen, fireEvent } from "@testing-library/react";
import FirstCalculator from "../FirstCalculator";
import { comma } from "../../utils/comma";

test("수취국가의 기본 값은 한국인가", async () => {
  render(<FirstCalculator />);

  const option = await screen.findByRole("option", { selected: true });
  expect(option).toHaveTextContent("한국(KRW)");
});

test("송금액 입력이 0일 경우 Submit 클릭 했을 때 수취금액 유효성 검사", async () => {
  render(<FirstCalculator />);
  const submitButton = await screen.findByRole("button");
  const input = screen.getByPlaceholderText("송금액을 입력해주세요");

  fireEvent.change(input, {
    target: {
      value: "0",
    },
  });

  expect(submitButton).toHaveTextContent("Submit");
  expect(input.value).toBe("0");
  fireEvent.click(submitButton);

  const text = screen.getByTestId("amountText");
  expect(text).toHaveTextContent("송금액이 바르지 않습니다");
});

test("송금액 입력이 10001일 경우 Submit 클릭 했을 때 수취금액 유효성 검사", async () => {
  render(<FirstCalculator />);
  const submitButton = await screen.findByRole("button");
  const input = screen.getByPlaceholderText("송금액을 입력해주세요");

  fireEvent.change(input, {
    target: {
      value: "10001",
    },
  });

  fireEvent.click(submitButton);

  const text = screen.getByTestId("amountText");
  expect(text).toHaveTextContent("송금액이 바르지 않습니다");
});

test("송금액 입력이 0초과 10000 이하일 경우 Submit 클릭 했을 때 수취금액", async () => {
  render(<FirstCalculator />);
  const submitButton = await screen.findByRole("button");
  const input = screen.getByPlaceholderText("송금액을 입력해주세요");
  const exchangeRate = screen.getByTestId("exchangeRateText");
  fireEvent.change(input, {
    target: {
      value: "100",
    },
  });

  fireEvent.click(submitButton);

  const text = screen.getByTestId("amountText");

  expect(text).toHaveTextContent(
    `수취금액은 ${comma(
      (+input.value * +exchangeRate.textContent).toFixed(2)
    )} KRW 입니다.`
  );
});
