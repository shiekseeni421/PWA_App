import React from "react";
import "../styles/calculator.scss";
import { useState } from "react";

function CalculatorApp() {
  let [value1, setValue1] = useState("");
  let [finalValue, setFinalValue] = useState("");
  let [displayValue, setDisplayValue] = useState("");
  let [operationValue, setOperation1] = useState("");
  let [arrayOfValue, setArrayOfValue] = useState([]);
  let [arraySign, setArraySign] = useState([]);
  let [signCount, setSignCount] = useState(0);

  let btnArray = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "*"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];
  //   console.log(btnArray.flat());

  function handelOperation(e) {
    let inputValue = e.target.value;
    let operationArray = ["+", "-", "*", "/", "+-"];

    let PresentValueOperation = operationArray.includes(inputValue);

    if (PresentValueOperation) {
      if (finalValue !== "") {
        setSignCount((signCount += 1));
        if (inputValue === "+-") {
          let sign = prompt("Enter + or -");
          setOperation1(sign);
          setDisplayValue(displayValue + sign);

          arraySign.push(sign);
          setArraySign(arraySign);
        } else {
          setOperation1(inputValue);
          setDisplayValue(displayValue + inputValue);
          arraySign.push(inputValue);
          setArraySign(arraySign);
        }
      } else {
        alert("Enter First Input Value");
      }
    }

    if (!PresentValueOperation && inputValue !== "C") {
      if (operationValue === "") {
        setFinalValue(finalValue + inputValue);
        setDisplayValue(displayValue + inputValue);
      } else {
        setValue1(value1 + inputValue);
        setDisplayValue(displayValue + inputValue);
      }
    }

    if (signCount === 2) {
      arrayOfValue.push(value1);
      setValue1("");
      setArrayOfValue(arrayOfValue);
      setSignCount(1);
    }

    if (inputValue === "C") {
      setFinalValue("");
      setDisplayValue("");
      setOperation1("");
      setValue1("");
      arrayOfValue = [];
      setArrayOfValue(arrayOfValue);
      arraySign = [];
      setArraySign(arraySign);
      setSignCount(0);
    }
  }

  function EqualOP() {
    arrayOfValue.push(value1);
    setValue1("");
    setArrayOfValue(arrayOfValue);
    // alert(arrayOfValue);
    // alert(arraySign);
    let arrayOfValueEl = [...arrayOfValue];
    let arraySignEl = [...arraySign];
    let result = 0;

    for (let i of arraySignEl) {
      if (arrayOfValueEl.length > 0) {
        result = Number(finalValue);
        let value1 = Number(arrayOfValueEl[0]);
        if (i === "+") {
          result += value1;
          console.log(result);
          finalValue = result;
          setFinalValue(finalValue);
        } else if (i === "-") {
          result -= value1;
          console.log(result);
          finalValue = result;
          setFinalValue(finalValue);
        } else if (i === "*") {
          result *= value1;
          console.log(result);
          finalValue = result;
          setFinalValue(finalValue);
        } else if (i === "/") {
          result /= value1;
          console.log(result);
          finalValue = result;
          setFinalValue(finalValue);
        }
        arrayOfValueEl.shift();
      }
    }
    setDisplayValue(finalValue);
    arrayOfValue = [];
    setArrayOfValue(arrayOfValue);
    arraySign = [];
    setArraySign(arraySign);
    setSignCount(0);
  }

  function handelPercentage() {
    if (finalValue !== "") {
      let GetValue = Number(finalValue);
      let result = GetValue / 100;
      setDisplayValue(result);
      setFinalValue(result);
    } else {
      alert("please enter Value");
    }
  }

  return (
    <div className="wrapperContainer">
      <div className="displayButtonContainer">
        <div className="displayContainer"> {displayValue}</div>
        <div className="ButtonContainer">
          {/* Create Button Element */}
          {btnArray.flat().map((btnValue, i) => {
            return (
              <button
                key={`${btnValue} ${i}`}
                value={btnValue}
                className={
                  btnValue === "=" ? " buttonEl equalButt " : "buttonEl"
                }
                onClick={
                  btnValue === "="
                    ? EqualOP
                    : btnValue === "%"
                    ? handelPercentage
                    : handelOperation
                }
              >
                {btnValue}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalculatorApp;
