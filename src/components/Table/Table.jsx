import React, { useState, useEffect } from "react";
import "./index.css";
import { OuterMapper, mean, median, mode } from "../../utils/helperFunctions";

//Common in both tables in useEffect, each mapper takes dataSource as 1st arg, 2nd is which function to run and 3rd against which property to calculate.
export default function Table({ groupedByClass }) {
  // vars
  let property = "Flavanoids";

  // state
  const [Mean, setMean] = useState({});
  const [Median, setMedian] = useState({});
  const [Mode, setMode] = useState({});

  // Effects
  useEffect(() => {
    setMean(OuterMapper(groupedByClass, mean, property));
    setMedian(OuterMapper(groupedByClass, median, property));
    setMode(OuterMapper(groupedByClass, mode, property));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {/* Dynamic table header if more classes are avilable in data, then more columns can be added through mapping*/}
            {Object.keys(Mean).map((i) => {
              return <td key={i} className="table_header">{`Class ${i}`}</td>;
            })}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Flavanoid Mean</td>
            {Object.values(Mean).map((i) => {
              return <td key={i}>{i}</td>;
            })}
          </tr>
          <tr>
            <td>Flavanoid Median</td>
            {Object.values(Median).map((i) => {
              return <td key={i}>{i}</td>;
            })}
          </tr>

          <tr>
            <td>Flavanoid Median</td>
            {Object.values(Mode).map((i) => {
              return <td key={i}>{i}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
