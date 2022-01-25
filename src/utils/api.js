import axios from "axios";
import { EXCHANGE_RATE_API_URL } from "./constants";

export const getExchangeRate = async (from, to) => {
  const response = await axios.get(
    `${EXCHANGE_RATE_API_URL}&from=${from}&to=${to}&amount=10`
  );
  return response.data;
};
