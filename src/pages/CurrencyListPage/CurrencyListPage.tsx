import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchCurrencyList } from "../../store/reducers/action-creators/CurrencyListAC";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Select } from "antd";
import Loader from "../../components/Loader/Loader";
import CurrencyListItem from "../../components/CurrencyListItem/CurrencyListItem";
import "./CurrencyListPage.css";
import { flags } from "../../utils/flags";

const CurrencyListPage: FC = () => {
  const [currentCurrency, setCurrentCurrency] = useState("USD");
  const dispatch = useAppDispatch();
  const currencies = "USD,RUB,JPY,EUR,CNY,KRW,KZT";
  const filteredCurrencies = currencies
    .split(",")
    .filter((i) => i != currentCurrency)
    .join(",");
  const queryParams = () => ({
    currencies: filteredCurrencies,
    source: currentCurrency,
  });
  useEffect(() => {
    dispatch(fetchCurrencyList(queryParams()));
  }, [currentCurrency]);
  const { quotes, isLoading, error } = useAppSelector(
    (state) => state.currencyList
  );
  const currencyListCheck = () => {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return <h1>Error</h1>;
    } else {
      return (
        <>
          <Select
            defaultValue={currentCurrency}
            onChange={(e) => {
              setCurrentCurrency(e);
            }}
          >
            <Select.Option value="USD">
              <img className="converter-image" alt={"USD"} src={flags["USD"]} />
              USD
            </Select.Option>
            <Select.Option value="RUB">
              <img className="converter-image" alt={"RUB"} src={flags["RUB"]} />
              RUB
            </Select.Option>
            <Select.Option value="JPY">
              <img className="converter-image" alt={"JPY"} src={flags["JPY"]} />
              JPY
            </Select.Option>
            <Select.Option value="EUR">
              <img className="converter-image" alt={"EUR"} src={flags["EUR"]} />
              EUR
            </Select.Option>
            <Select.Option value="CNY">
              <img className="converter-image" alt={"CNY"} src={flags["CNY"]} />
              CNY
            </Select.Option>
            <Select.Option value="KRW">
              <img className="converter-image" alt={"KRW"} src={flags["KRW"]} />
              KRW
            </Select.Option>
            <Select.Option value="KZT">
              <img className="converter-image" alt={"KZT"} src={flags["KZT"]} />
              KZT
            </Select.Option>
          </Select>
          <div className="currency-list">
            {Object.keys(quotes).map((currency) => {
              return (
                <CurrencyListItem
                  quote={currency}
                  value={quotes[currency]}
                  key={currency}
                />
              );
            })}
          </div>
        </>
      );
    }
  };
  return <div className="container ">{currencyListCheck()}</div>;
};

export default CurrencyListPage;
