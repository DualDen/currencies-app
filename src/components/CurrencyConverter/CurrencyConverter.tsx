import React, {ChangeEvent, FC, useEffect, useState} from "react";
import "./CurrencyConverter.css";
import { Input, Select } from "antd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchCurrencyConverter } from "../../store/reducers/action-creators/CurrencyConverterAC";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loader from "../Loader/Loader";
import arrows from "../../assets/two-arrows.svg";
import { flags } from "../../utils/flags";

const CurrencyConverter: FC = () => {
  const { quote, isLoading, error } = useAppSelector(
    (state) => state.currencyConverter
  );
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("RUB");
  const [firstCurrencyValue, setFirstCurrencyValue] = useState(1);
  const dispatch = useAppDispatch();
  const queryParams = () => ({
    from: firstCurrency,
    to: secondCurrency,
    amount: 1,
  });
  useEffect(() => {
    dispatch(fetchCurrencyConverter(queryParams()));
  }, [firstCurrency, secondCurrency]);
  const check = () => {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return <h1>Error</h1>;
    } else {
      return (
        <>
          <div className="converter-item">
            <Input
              type={"number"}
              onChange={(e:ChangeEvent<HTMLInputElement>) => {
                setFirstCurrencyValue(Number(e.target.value));
              }}
              value={firstCurrencyValue}
              size="large"
            />
            <Select
              size="large"
              defaultValue={firstCurrency}
              onChange={(e:string) => {
                setFirstCurrency(e);
              }}
            >
              <Select.Option value="USD">
                <img
                  className="converter-image"
                  alt={"USD"}
                  src={flags["USD"]}
                />
                USD
              </Select.Option>
              <Select.Option value="RUB">
                <img
                  className="converter-image"
                  alt={"RUB"}
                  src={flags["RUB"]}
                />
                RUB
              </Select.Option>
              <Select.Option value="JPY">
                <img
                  className="converter-image"
                  alt={"JPY"}
                  src={flags["JPY"]}
                />
                JPY
              </Select.Option>
              <Select.Option value="KZT">
                <img
                  className="converter-image"
                  alt={"KZT"}
                  src={flags["KZT"]}
                />
                KZT
              </Select.Option>
              <Select.Option value="KRW">
                <img
                  className="converter-image"
                  alt={"KRW"}
                  src={flags["KRW"]}
                />
                KRW
              </Select.Option>
              <Select.Option value="EUR">
                <img
                  className="converter-image"
                  alt={"EUR"}
                  src={flags["EUR"]}
                />
                EUR
              </Select.Option>
              <Select.Option value="CNY">
                <img
                  className="converter-image"
                  alt={"CNY"}
                  src={flags["CNY"]}
                />
                CNY
              </Select.Option>
            </Select>
          </div>
          <button
            className="switch-button"
            onClick={() => {
              setFirstCurrency(secondCurrency);
              setSecondCurrency(firstCurrency);
            }}
          >
            <img src={arrows} alt="Switch" />
          </button>
          <div className="converter-item">
            <Input value={quote * firstCurrencyValue} size="large" />
            <Select
              size="large"
              defaultValue={secondCurrency}
              onChange={(e:string) => {
                setSecondCurrency(e);
              }}
            >
              <Select.Option value="RUB">
                <img
                  className="converter-image"
                  alt={"RUB"}
                  src={flags["RUB"]}
                />
                RUB
              </Select.Option>
              <Select.Option value="USD">
                <img
                  className="converter-image"
                  alt={"USD"}
                  src={flags["USD"]}
                />
                USD
              </Select.Option>
              <Select.Option value="JPY">
                <img
                  className="converter-image"
                  alt={"JPY"}
                  src={flags["JPY"]}
                />
                JPY
              </Select.Option>
              <Select.Option value="KZT">
                <img
                  className="converter-image"
                  alt={"KZT"}
                  src={flags["KZT"]}
                />
                KZT
              </Select.Option>
              <Select.Option value="KRW">
                <img
                  className="converter-image"
                  alt={"KRW"}
                  src={flags["KRW"]}
                />
                KRW
              </Select.Option>
              <Select.Option value="EUR">
                <img
                  className="converter-image"
                  alt={"EUR"}
                  src={flags["EUR"]}
                />
                EUR
              </Select.Option>
              <Select.Option value="CNY">
                <img
                  className="converter-image"
                  alt={"CNY"}
                  src={flags["CNY"]}
                />
                CNY
              </Select.Option>
            </Select>
          </div>
        </>
      );
    }
  };
  return <div className="converter">{check()}</div>;
};

export default CurrencyConverter;
