import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Conversion({ data, rate, pushUp }) {
  const classes = useStyles();
  const [value, updateValue] = useState(1);

  useEffect(() => {
    pushUp(value);
  }, [value]);

  function onChange(e) {
    let newValue = e.target.value;
    updateValue(newValue);
    if (value < 1) {
      updateValue(1);
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="input"
        label="Standard"
        type="number"
        onChange={onChange}
        value={value}
      />
      <div>{data.rates[rate] * value}</div>
    </form>
  );
}
