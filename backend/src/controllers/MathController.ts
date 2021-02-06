import { Request, Response } from "express";

class MathController {
  async create(request: Request, response: Response) {
    const {
      n,
      coeficients,
      k,
      initialValue,
      maxIterations,
      tolerance,
    } = request.body;

    // f(x) = p(x) + k*cos(x)
    let res = [];
    let errors = [initialValue];
    let p;
    let dp;
    let x = initialValue;
    // from 1 to maxIterations
    for (let iteration = 1; iteration <= maxIterations; iteration++) {
      // p(x)
      p = coeficients[coeficients.length - 1];
      dp = 0;
      for (let i = 0; i < n; i++) {
        p = p + coeficients[i] * Math.pow(x, n - i);
        if (n - 1 - i >= 0) {
          dp = dp + (n - i) * coeficients[i] * Math.pow(x, n - i - 1);
        }
      }

      // f(x)
      const f = p + k * Math.cos(x);
      const df = dp + k * -Math.sin(x);

      x = x - f / df;

      let error = (res[res.length - 1] - x) / res[res.length - 1];
      errors.push(error);

      if (
        Math.abs(f) < tolerance ||
        Math.abs(f) === 0 ||
        x === res[res.length - 1]
      ) {
        console.log("entrou");

        // break;

        return response.json({ x, errors });
      }

      res.push(x);
    }

    return response.json({ error: "not found" });
  }
}

export default MathController;
