import React, { FC } from "react";
import loader from "../../assets/loader.svg";
import "./Loader.css";
const Loader: FC = () => {
  return (
    <div className="loader-container">
      <img src={loader} alt="" />
    </div>
  );
};

export default Loader;
