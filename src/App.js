import React, { useState, useEffect } from "react";
import "./styles.css";
import Row from "./Rows";
import Inputsample from "./InputSample";

export default function App() {
  let timeDict = {};
  const largestMaxValue = 1100;
  const defaultValue = localStorage.maximumValue || 1100;
  const [number, setNumber] = useState(500);
  const [maximumValue, setMaximumValue] = useState(defaultValue);
  const presetMaxValues = [largestMaxValue, 1050];

  const setMaxValue = (v) => {
    const maxValue = Math.min(v, largestMaxValue);
    localStorage.maximumValue = maxValue;
    setMaximumValue(maxValue);
  };

  const getElapsedTime = (date) => {
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    return milliseconds + 1000 * (seconds + 60 * minutes);
  };

  const updateRow = (id, date, value) =>
    (timeDict[id] = [date, value, maximumValue]);

  const calcInitialValue = (value, intervalInMilliseconds) =>
    value - (intervalInMilliseconds / 1000 / 60) * 2;

  const updateTable = (value) => {
    const date = new Date();
    const oneHour = 1000 * 60 * 60;
    updateRow("now", date, value);
    const elapsedTimeInMilliseconds = getElapsedTime(date);
    let initialHour = new Date(date - elapsedTimeInMilliseconds);
    let initialValue = calcInitialValue(value, elapsedTimeInMilliseconds);
    for (let i = 1; i <= 24; i++) {
      updateRow(
        "row" + i,
        new Date(initialHour - -oneHour * i),
        initialValue + 120 * i
      );
    }
  };

  const onChange = (e) => {
    const now = new Date();
    let name;
    let value;
    if (e.target.className === "time") {
      name = e.target.id;
      value = defaultValue;
    } else {
      name = e.target.name;
      value = e.target.value;
    }
    const timeDiff = name === "now" ? 0 : timeDict[name][0] - now;
    let initialValue = calcInitialValue(value, timeDiff);

    if (e.target.className === "value2") {
      initialValue -= maximumValue / 5;
    }
    setNumber(initialValue);
  };

  updateTable(number);
  //alert(window.innerWidth);
  //alert(document.documentElement.clientWidth);
  const keys = Object.keys(timeDict);

  /*useEffect(() => {
    console.log("user 값이 설정됨");
    const updateSchedule = setInterval(() => setNumber((x) => x + 1), 1000);
    //console.log(user);
    return () => {
      console.log("user 가 바뀌기 전..");
      clearInterval(updateSchedule);
      //console.log(user);
    };
  }, []);*/

  return (
    <div className="App">
      {/*
      <div>
        {window.innerWidth} ][] {window.innerHeight}
      </div>
      <div>
        {document.documentElement.clientWidth} ][]{" "}
        {document.documentElement.clientHeight}
    </div>*/}
      <Inputsample
        maximumValue={maximumValue}
        setMaximumValue={setMaxValue}
        presetMaxValues={presetMaxValues}
      />
      <div>
        <table border="1">
          <tbody>
            <tr>
              <th> 시간 </th>
              <th> 통솔력 </th>
              <th> 통솔력(회복) </th>
            </tr>
            {keys.map((k) => (
              <Row id={k} item={timeDict[k]} onChange={onChange} key={k} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
