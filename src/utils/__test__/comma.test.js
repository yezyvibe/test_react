const { comma } = require("../comma");

test("정수 입력했을 때 콤마 잘 찍히나?", () => {
  expect(comma(123456789)).toBe("123,456,789");
});

test("정수만 입력해도 소수점 잘 나오나?", () => {
  const num = 123456789;
  expect(comma(num.toFixed(2))).toBe("123,456,789.00");
});

test("소수 입력했을 때 콤마 잘 찍히나?", () => {
  expect(comma(123456.78)).toBe("123,456.78");
});
