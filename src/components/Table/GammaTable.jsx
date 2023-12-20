import React, { useState, useEffect } from "react";
import "./index.css";
import { OuterMapper, mean, median, mode, gamma } from "../../utils/helperFunctions";

//Common in both tables in useEffect, each mapper takes dataSource as 1st arg, 2nd is which function to run and 3rd against which property to calculate.
export default function GammaTable({ groupedByClass }) {
  // state
  const [Mean, setMean] = useState({});
  const [Median, setMedian] = useState({});
  const [Mode, setMode] = useState({});

  //vars
  //Creating a duplicate object with gamma property calculated & added to each element.
  let newObjectWithGammaProperty = OuterMapper(groupedByClass, gamma);
  let property = "Gamma";

  // Effects
  useEffect(() => {
    setMean(OuterMapper(newObjectWithGammaProperty, mean, property));
    setMedian(OuterMapper(newObjectWithGammaProperty, median, property));
    setMode(OuterMapper(newObjectWithGammaProperty, mode, property));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="gamma_table">
      <p className="gamma_text">Gamma Table</p>
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
            <td>Gamma Mean</td>
            {Object.values(Mean).map((i) => {
              return <td key={i}>{i}</td>;
            })}
          </tr>
          <tr>
            <td>Gamma Median </td>
            {Object.values(Median).map((i) => {
              return <td key={i}>{i}</td>;
            })}
          </tr>

          <tr>
            <td>Gamma Mode</td>
            {Object.values(Mode).map((i) => {
              return <td key={i}>{i}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
