import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICurrencyConverter } from "../../../types/ICurrencyConverter";

export const fetchCurrencyConverter = createAsyncThunk<
  ICurrencyConverter,
  { from: string; to: string; amount: number },
  { rejectValue: string }
>(
  "currencyConverter/fetchCurrencyConverter",
  async ({ from, to, amount }, thunkAPI) => {
    try {
      const API_KEY = "X89HNQxl6xe0wpWanNpCptRNDEkjtvWi";
      const response = await axios.get<ICurrencyConverter>(
        `https://api.apilayer.com/currency_data/convert?from=${from}&to=${to}&amount=${amount}&apikey=${API_KEY}`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Error while loading data");
    }
  }
);
