import React, { useState } from "react";
import "../styles/calculator-styles.scss";

export default function Calculator() {
  const [expression, setExpression] = useState("0");

  const buttons = [
    ["AC", "+/-", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const handleClick = (btn) => {
    if (btn === "AC") {
      setExpression("0");
    } else if (btn === "=") {
      try {
        let exp = expression
          .replace(/÷/g, "/")
          .replace(/×/g, "*")
          .replace(/−/g, "-");

        const result = eval(exp);
        setExpression(String(result));
      } catch {
        setExpression("Error");
      }
    } else if (btn === "+/-") {
      // Toggle sign of last number
      let match = expression.match(/(-?\d+\.?\d*)$/);
      if (match) {
        const num = match[0];
        const toggled = num.startsWith("-") ? num.slice(1) : "-" + num;
        setExpression(expression.slice(0, -num.length) + toggled);
      }
    } else if (btn === "%") {
      try {
        let match = expression.match(/(\d+\.?\d*)$/);
        if (match) {
          const num = parseFloat(match[0]);
          const percent = num / 100;
          setExpression(expression.slice(0, -match[0].length) + percent);
        }
      } catch {
        setExpression("Error");
      }
    } else {
      // Numbers / Operators
      if (expression === "0" && !isNaN(btn)) {
        setExpression(btn);
      } else {
        setExpression(expression + btn);
      }
    }
  };

  return (
    <div className="calculator">
      <div className="display">{expression}</div>
      <div className="buttons">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((btn, i) => (
              <button
                key={i}
                onClick={() => handleClick(btn)}
                className={`btn ${
                  ["÷", "×", "−", "+", "="].includes(btn) ? "orange" : ""
                } ${btn === "0" ? "zero" : ""} ${
                  ["AC", "+/-", "%"].includes(btn) ? "top-operator" : ""
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
