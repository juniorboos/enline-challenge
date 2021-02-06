import React, { useState, useEffect } from "react";
import "./App.css";
import Input from "./components/Input";
import { getResult } from "./services/api";

function App() {
  const [f, setF] = useState("");

  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    n: 0,
    k: 0,
    coeficients: "",
    initialValue: 0,
    maxIterations: 0,
    tolerance: 0,
    f: "",
  });

  useEffect(() => {
    console.log("ativado");

    const { n, k, coeficients } = form;

    let equation = [];
    let coeficientsArray = coeficients.split(";");

    if (
      coeficientsArray[0] !== "" &&
      coeficientsArray[coeficientsArray.length - 1] !== "" &&
      coeficientsArray.length === Number(n) + 1
    ) {
      console.log(coeficientsArray);
      for (let i = Number(n); i > 1; i--) {
        console.log(Number(n));
        equation.push(
          Number(coeficientsArray[n - i]) + "x<sup>" + i + "</sup>"
        );
        if (Number(coeficientsArray[n - i + 1]) >= 0) {
          equation.push("+");
        }
      }

      equation.push(
        Number(coeficientsArray[coeficientsArray.length - 2]) + "x"
      );

      if (Number(coeficientsArray[coeficientsArray.length - 1]) >= 0) {
        equation.push("+");
      }
      equation.push(Number(coeficientsArray[coeficientsArray.length - 1]));
    }
    if (Number(k) >= 0) {
      equation.push("+");
    }
    equation.push(Number(k) + "*cos(x)");

    setF(equation.join(""));
  }, [form]);

  const onInput = (field: string, value: any) => {
    setForm((state) => ({
      ...state,
      [field]: value,
    }));
  };

  const calculate = (e: any) => {
    e.preventDefault();
    const { n, k, coeficients, initialValue, maxIterations, tolerance } = form;

    let coeficientsArray = coeficients.split(";");

    const payload = {
      n: Number(n),
      k: Number(k),
      coeficients: coeficientsArray.map((i) => Number(i)),
      initialValue: Number(initialValue),
      maxIterations: Number(maxIterations),
      tolerance: Number(tolerance),
    };

    console.log(payload);
    getResult(payload).then((response) => setResult(response.data));
  };

  return (
    <div className="App">
      <div className="form-container">
        <div className="function-card">f(x) = p(x) + k*cos(x)</div>
        <form onSubmit={(e) => calculate(e)}>
          <div className="small-wrapper">
            <Input
              label="grau n do polinomio p"
              size="small"
              type="number"
              onChange={(e) => onInput("n", e.target.value)}
            />
            <Input
              label="termo k"
              size="small"
              type="number"
              onChange={(e) => onInput("k", e.target.value)}
            />
          </div>
          <Input
            label="coeficientes de p (separados por ;)"
            size="normal"
            type="text"
            onChange={(e) => onInput("coeficients", e.target.value)}
          />
          <Input
            label="valor inicial do processo iterativo"
            size="normal"
            type="number"
            onChange={(e) => onInput("initialValue", e.target.value)}
          />
          <Input
            label="número máximo de iterações"
            size="normal"
            type="number"
            onChange={(e) => onInput("maxIterations", e.target.value)}
          />
          <Input
            label="tolerância numérica"
            size="normal"
            type="number"
            onChange={(e) => onInput("tolerance", e.target.value)}
          />
          <button type="submit">Calcular</button>
        </form>
      </div>
      <div className="result-container">
        <p dangerouslySetInnerHTML={{ __html: f }}></p>
        {result && <p>x: {result.x}</p>}
      </div>
    </div>
  );
}

export default App;
