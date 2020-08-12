import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import BaseSelector from "./BaseSelector";
import Conversion from "./Conversion";
import RateSelector from "./RateSelector";
import "./style.css";

function App() {
  const [obj, updateObj] = useState({
    rates: { USD: 1, EUR: 0.8486803021 },
    base: "USD",
  });
  const [rate, updateRate] = useState("EUR");

  useEffect(() => {
    FetchAPI().then((data) => {
      updateObj(data);
    });
  }, []);

  function selectBase(newBase) {
    updateObj((prev) => {
      prev.base = newBase;
      return prev;
    });
    console.log(obj);
  }

  function selectRate(newRate) {
    updateRate(newRate);
  }

  return (
    <div className="App">
      <div className="Menu">
        <BaseSelector data={obj} selectBase={selectBase} />
        <RateSelector data={obj} rate={rate} selectRate={selectRate} />
        <Conversion data={obj} rate={rate} />
      </div>
    </div>
  );
}

export default App;
