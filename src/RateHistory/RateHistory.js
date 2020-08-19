import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { useEffect } from "react";
import { useState } from "react";

export default function RateHistory({ base, rate, value }) {
  let date = new Date();
  const [amount, updateAmount] = useState([]);

  useEffect(() => {
    let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let back = `${date.getFullYear() - 1}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    fetch(
      `https://api.exchangeratesapi.io/history?start_at=${back}&end_at=${time}&base=${base}&symbols=${rate}`
    )
      .then((data) => data.json())
      .then((data) => {
        let temp = [];
        let money = data.rates;

        Object.keys(data.rates)
          .sort((a, b) => new Date(a) - new Date(b))
          .map((val) => {
            temp.push({
              year: val,
              worth: data.rates[val][rate] * value,
            });
          });
        console.log(temp.sort((a, b) => a - b));
        updateAmount(temp.sort((a, b) => a - b));
      });

    // for (let i = 1; i < 11; i++) {
    //   let time = date.getFullYear() - 11 + i;
    //   fetch(
    //     `https://api.exchangeratesapi.io/${time}-${
    //       date.getMonth() + 1
    //     }-${date.getDate()}?base=${base}`
    //   )
    //     .then((data) => {
    //       return data.json();
    //     })
    //     .then((data) => {
    //       updateAmount((prev) => {
    //         prev.push({
    //           worth: data.rates[rate] * value,
    //           year: time,
    //         });
    //         return prev;
    //       });

    //     });
    // }
  }, [base, rate, value]);

  const points = [];

  amount.map((v) => points.push({ x: v.year.slice(0, 7), y: v.worth }));

  const renderLineChart = (
    <LineChart width={400} height={400} data={points}>
      <Line type="monotone" dataKey="y" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="x" angle={0} textAnchor="middle" />
      <YAxis />
    </LineChart>
  );

  return <div>{renderLineChart}</div>;
}
