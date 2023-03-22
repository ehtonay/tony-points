import * as React from "react";
import { useEffect, useState } from "react";

// TODO: move to types
type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
}
type TaxResponse = {
  tax_brackets: TaxBracket[]
};

export const App = () => {
  const [taxYear, setTaxYear] = useState('');
  const [salary, setSalary] = useState('');

  // TODO: move to const file
  const BASE_URL = 'http://localhost:5000/tax-calculator/brackets';

  const handleSubmit = async () => {
    // TODO: make sure inputs are valid numbers
    let totalTaxes = 0.00;
    const income = parseInt(salary);

    await fetch(`${BASE_URL}/${taxYear}`)
      .then(res => res.json())
      .then((res: TaxResponse) => {
        // TODO: validate response and handle errors if they occur

        // TODO: cleanup logic, move to util function 
        res.tax_brackets?.forEach((taxBracket) => {
          if (income > taxBracket.min) {
            if (!taxBracket.max) {
              totalTaxes += (income - taxBracket.min) * taxBracket.rate;
            } else {
              if (income > taxBracket.max) {
                totalTaxes += (taxBracket.max - taxBracket.min) * taxBracket.rate;
              } else {
                totalTaxes += (income - taxBracket.min) * taxBracket.rate;
              }
            }
          }
        })
        console.log('Total taxes', totalTaxes);
        // TODO:  display total taxes, and amount paid for each bracket
        // Spread this value onto existing response object values
    });
  }

  /** TODO:
   *    - loading state, form focus, pretty UI/responsiveness
   *    - unit tests
   */

  return (
    <>
      <h1>Marginal Tax Bracket Calculator</h1>
        <input type="text" onChange={e => setTaxYear(e.target.value)} placeholder="Please enter a tax year" />
        <input type="text" onChange={e => setSalary(e.target.value)} placeholder="Please enter your annual salary" />
        <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
