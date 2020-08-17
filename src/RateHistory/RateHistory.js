import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { useEffect } from "react";
import { useState } from "react";

export default function RateHistory({ base, rate, value }) {
  let date = new Date();
  const [amount, updateAmount] = useState([]);
  let dog = [];

  useEffect(() => {
    if (dog.length > 0) {
      dog = [];
    }
    for (let i = 1; i < 11; i++) {
      let time = date.getFullYear() - 11 + i;
      fetch(
        `https://api.exchangeratesapi.io/${time}-${
          date.getMonth() + 1
        }-${date.getDate()}?base=${base}`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          // updateAmount((prev) => {
          //   prev.push({
          //     worth: data.rates[rate] * value,
          //     year: time,
          //   });
          //   return prev;
          // });
          console.log(rate);
          console.log(amount);
          dog.push({
            worth: data.rates[rate] * value,
            year: time,
          });
        });
    }

    if (amount.length === 0) {
      console.log(dog);
      updateAmount(dog);
    }
  }, [base, rate]);

  const points = [];

  amount.map((v) => points.push({ x: v.year, y: v.worth }));

  const renderLineChart = (
    <LineChart width={400} height={400} data={points}>
      <Line type="monotone" dataKey="y" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="x" />
      <YAxis />
    </LineChart>
  );

  return <div>{renderLineChart}</div>;
}
