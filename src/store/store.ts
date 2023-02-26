import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currencyConverter from "./reducers/slices/CurrencyConverterSlice";
import currencyList from "./reducers/slices/CurrencyListSlice";

const rootReducer = combineReducers({
  currencyConverter,
  currencyList,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
