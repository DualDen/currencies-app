import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrencyList } from "../action-creators/CurrencyListAC";
import { ICurrencyList } from "../../../types/ICurrencyList";

interface ICurrencyListState {
  source: string;
  quotes: Record<string, number>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ICurrencyListState = {
  source: "USD",
  quotes: {
    USDRUB: 1,
  },
  isLoading: false,
  error: null,
};

export const currencyListSlice = createSlice({
  name: "currencyList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencyList.pending, (state: ICurrencyListState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCurrencyList.fulfilled,
      (state: ICurrencyListState, action: PayloadAction<ICurrencyList>) => {
        state.source = action.payload.source;
        state.quotes = action.payload.quotes;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(
      fetchCurrencyList.rejected,
      (state: ICurrencyListState, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export default currencyListSlice.reducer;
