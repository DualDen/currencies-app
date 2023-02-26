import React, { FC } from "react";
import "./CurrencyConverterPage.css";
import CurrencyConverter from "../../components/CurrencyConverter/CurrencyConverter";

const CurrencyConverterPage: FC = () => {
  return (
    <div className="container">
      <CurrencyConverter />
    </div>
  );
};

export default CurrencyConverterPage;
