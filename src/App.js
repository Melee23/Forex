import React, { useEffect, useState } from "react";
import FetchAPI from "./FetchAPI";
import BaseSelector from "./BaseSelector";
import Conversion from "./Conversion";
import RateSelector from "./RateSelector";
import RateHistory from "./RateHistory";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function App() {
  const classes = useStyles();

  const [obj, updateObj] = useState({
    rates: { USD: 1, EUR: 0.8486803021 },
    base: "USD",
  });
  const [rate, updateRate] = useState("EUR");
  const [multiplier, updateMultiplier] = useState(1);

  useEffect(() => {
    FetchAPI(obj.base).then((data) => {
      updateObj(data);
    });
  }, []);

  function selectBase(newBase) {
    updateObj((prev) => {
      prev.base = newBase;
      return prev;
    });
    FetchAPI(obj.base).then((data) => {
      updateObj(data);
    });
  }

  function selectRate(newRate) {
    updateRate(newRate);
  }

  function swapCurrencies() {
    let initialBase = obj.base;
    updateObj((prev) => {
      prev.base = rate;
      return prev;
    });
    FetchAPI(obj.base).then((data) => {
      updateObj(data);
    });
    updateRate(initialBase);
  }

  function pushUp(value) {
    updateMultiplier(value);
  }

  return (
    <div className="App">
      <div className="Menu">
        <RateHistory base={obj.base} rate={rate} value={multiplier} />
      </div>

      <div className="Menu">
        <div class="rates">
          <BaseSelector data={obj} selectBase={selectBase} />
          <RateSelector data={obj} rate={rate} selectRate={selectRate} />
        </div>
        <div class="convert">
          <Conversion data={obj} rate={rate} pushUp={pushUp} />
        </div>
        <div className={classes.root}>
          <Button variant="contained" onClick={swapCurrencies}>
            Swap Currencies
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
