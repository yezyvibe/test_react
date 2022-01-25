import axios from "axios";
import { EXCHANGE_RATE_API_URL } from "./constants";

export const getExchangeRate = async () => {
  const response = await axios.get(EXCHANGE_RATE_API_URL);

  return response.data;
};
