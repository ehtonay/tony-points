import * as React from "react";
import { useEffect, useState } from "react";

// TODO: move to types
type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
  taxesPaid?: number;
}
type TaxResponse = {
  tax_brackets: TaxBracket[]
};

export const App = () => {
  const [taxYear, setTaxYear] = useState('');
  const [salary, setSalary] = useState('');
  const [taxBrackets, setTaxBrackets] = useState([]);

  // TODO: move to const file
  const BASE_URL = 'http://localhost:5000/tax-calculator/brackets';

  const handleSubmit = async () => {
    const income = parseInt(salary);

    await fetch(`${BASE_URL}/${taxYear}`)
      .then(res => res.json())
      .then((res: TaxResponse) => {
        // TODO: validate response and handle errors if they occur

        // TODO: cleanup logic, move to util function 
        res.tax_brackets?.forEach((taxBracket) => {
          if (income > taxBracket.min) {
            if (!taxBracket.max) {
              taxBracket.taxesPaid = (income - taxBracket.min) * taxBracket.rate;
            } else {
              if (income > taxBracket.max) {
                taxBracket.taxesPaid = (taxBracket.max - taxBracket.min) * taxBracket.rate;
              } else {
                taxBracket.taxesPaid = (income - taxBracket.min) * taxBracket.rate;
              }
            }
          }
        })
        const sortedBrackets: TaxBracket[] = res.tax_brackets.sort((a, b) => {
          return a.min < b.min ? -1 : 1;
        });
        console.log('sortedBrackets', sortedBrackets)
        setTaxBrackets(sortedBrackets);
    });
  }

  let totalTaxesPaid = 0;
  const taxBracketsView = taxBrackets.map(bracket => {
    if (bracket.taxesPaid) totalTaxesPaid += bracket.taxesPaid;
    return (
      <div key={bracket.min}>
        <div>${bracket.min} - ${bracket.max}</div>
        <div>Taxes paid: {bracket.taxesPaid}</div>
      </div>
    )
  });

  /** TODO:
   *    - display total taxes, and amount paid for each bracket
   *    - loading state, form focus, pretty UI/responsiveness
   *    - unit tests
   *    - keyboard accessibility
   */

  return taxBrackets.length > 0 ? (
    <>
      Your salary: ${salary} <br/>
      {taxBracketsView}
      Total taxes paid: ${totalTaxesPaid}
    </>
  ) : (
    <>
      <h1>Marginal Tax Bracket Calculator</h1>
        <input type="text" onChange={e => setTaxYear(e.target.value)} placeholder="Please enter a tax year" />
        <input type="text" onChange={e => setSalary(e.target.value)} placeholder="Please enter your annual salary" />
        <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
