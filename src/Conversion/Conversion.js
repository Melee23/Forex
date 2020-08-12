import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Conversion({ data, rate }) {
  const classes = useStyles();
  const [value, updateValue] = useState();

  function onChange(e) {
    let newValue = e.target.value;
    updateValue(newValue);
    console.log(data.rates);
  }

  function onSubmit() {}

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="input"
        label="Standard"
        onChange={onChange}
        value={value}
      />
      <div></div>
    </form>
  );
}
