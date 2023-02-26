import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICurrencyList } from "../../../types/ICurrencyList";
import axios from "axios";

export const fetchCurrencyList = createAsyncThunk<
  ICurrencyList,
  { currencies: string; source: string },
  { rejectValue: string }
>(
  "currencyList/fetchCurrencyList",
  async ({ currencies, source }, thunkAPI) => {
    try {
      const API_KEY = "X89HNQxl6xe0wpWanNpCptRNDEkjtvWi";
      const response = await axios.get<ICurrencyList>(
        `https://api.apilayer.com/currency_data/live?source=${source}&currencies=${currencies}&apikey=${API_KEY}`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Error while loading data");
    }
  }
);
