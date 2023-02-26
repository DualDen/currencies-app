import React, { FC } from "react";
import "./CurrencyListItem.css";
import { flags } from "../../utils/flags";

interface ICurrencyListItemProps {
  quote: string;
  value: number;
}

const CurrencyListItem: FC<ICurrencyListItemProps> = ({ quote, value }) => {
  const currency: string = quote.slice(3);
  return (
    <div className="currency-list-item">
      <img
        className="currency-item-image"
        alt={currency}
        src={flags[currency as keyof typeof flags]}
      />
      <div>{currency} </div>
      <div>: </div>
      <div>{value}</div>
    </div>
  );
};

export default CurrencyListItem;
