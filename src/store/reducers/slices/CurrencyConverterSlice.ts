import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrencyConverter } from "../action-creators/CurrencyConverterAC";
import { ICurrencyConverter } from "../../../types/ICurrencyConverter";

interface ICurrencyConverterState {
  quote: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ICurrencyConverterState = {
  quote: 1,
  isLoading: false,
  error: null,
};

export const currencyConverterSlice = createSlice({
  name: "currencyConverter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCurrencyConverter.fulfilled,
      (
        state: ICurrencyConverterState,
        action: PayloadAction<ICurrencyConverter>
      ) => {
        state.quote = action.payload.info.quote;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(
      fetchCurrencyConverter.pending,
      (state: ICurrencyConverterState) => {
        state.isLoading = true;
        state.error = null;
      }
    );
    builder.addCase(
      fetchCurrencyConverter.rejected,
      (state: ICurrencyConverterState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default currencyConverterSlice.reducer;
