const { getExchangeRate } = require("../api");
const { EXCHANGE_RATE_API_URL } = require("../constants");
const mockData = require("./exchangeRate.json");

test("GET 성공 시 Status 는 200 을 반환한다.", async () => {
  const response = await fetch(EXCHANGE_RATE_API_URL, { method: "GET" });
  expect(response.status).toBe(200);
});

// test("api 주소가 다르면 안되니 ?", async () => {
//   const response = await fetch("https://www.naver.com", { method: "GET" });
//   expect(response.status).toBe(200);
// });

// test("데이터가 비슷하니?", async () => {
//   const response = await getExchangeRate();
//   expect(response).toMatchObject(mockData);
// });

// const mockFetch = (data, body = undefined) => {
//   global.fetch = jest.fn().mockResolvedValue({
//     status: 200,
//     ok: true,
//     text: async () => data,
//     json: async () => {
//       if (body) return body;
//       if (data) return { data };
//       throw Error();
//     },
//   });
// };

// test("asd", async () => {
//   mockFetch("데이터를 성공적으로 불러왔습니다");
//   const { success } = await getExchangeRate();
//   expect(success).toBe(true);
// });
