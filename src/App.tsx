import * as React from "react";
import { useState } from "react";
import { TaxBracket, TaxResponse } from "./types";
import { BASE_URL } from "./constants";
import { TaxBracketTile } from "./components/TaxBracketTile";
import { ErrorAlert } from "./components/ErrorAlert";
import './App.css';

/**
 * Marginal Taxation Rate Calculator App
 * @author Tony Tomarchio
 */
export const App = () => {
  const [taxYear, setTaxYear] = useState('');
  const [salary, setSalary] = useState('');
  const [taxBrackets, setTaxBrackets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState('');

  // Would extract to custom hook for multiple currencies
  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate input - would usually use moment.js for date checks
    const income = parseInt(salary);
    if (taxYear.length !== 4 || isNaN(income)) {
      setHasErrors('Please use a valid year/income combination.')
      setIsLoading(false);
      return;
    }

    // Fetch tax brackets data for the year
    await fetch(`${BASE_URL}/${taxYear}`)
      .then(res => res.json())
      .then((res: TaxResponse) => {
        if (res.errors) {
          console.error(res.errors);
          setHasErrors(`Failed to fetch the tax bracket data for ${taxYear}`)
        } else {
        // Calculate taxes paid in each bracket and store value in the object
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
        // Sort brackets to display in ascending order for UI
        const sortedBrackets: TaxBracket[] = res.tax_brackets.sort((a, b) => {
          return a.min < b.min ? -1 : 1;
        });
        setTaxBrackets(sortedBrackets);
      }
    });
    setIsLoading(false);
  }

  const resetInput = () => {
    setSalary('');
    setTaxYear('');
    setTaxBrackets([]);
    setHasErrors('');
  }

  // Build out UI using sorted, massaged tax bracket data
  let totalTaxesPaid = 0;
  const taxBracketsView = taxBrackets.map(bracket => {
    // Made the choice to not display brackets with no taxes paid
    if (bracket.taxesPaid) {
      totalTaxesPaid += bracket.taxesPaid;
      const formattedTaxesPaid = currencyFormatter.format(bracket.taxesPaid);
      return (
        <TaxBracketTile
          min={currencyFormatter.format(bracket.min)}
          max={bracket.max && currencyFormatter.format(bracket.max)}
          taxesPaid={formattedTaxesPaid} key={bracket.min}
        />
      )
    }
    return null;
  });

  if (isLoading) return <div id="loading" />;

  // Render - usually would localize strings for translation (if needed)
  return taxBrackets.length > 0 ? (
    <>
      <h1>Results</h1>
      <div id='results'>
        <b>Your salary:</b> {currencyFormatter.format(parseInt(salary))}<br />
        <b>Tax Year:</b> {taxYear}<br />
        <b>Total taxes paid:</b> {currencyFormatter.format(totalTaxesPaid)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {taxBracketsView}
      </div>
      <button onClick={resetInput}>Reset</button>
    </>
  ) : (
    <>
      <h1>Marginal Tax Bracket Calculator</h1>
      {hasErrors && <ErrorAlert errorMessage={hasErrors} />}
      <form>
        <input autoFocus type="text" onChange={e => setTaxYear(e.target.value)} placeholder="Enter a tax year" />
        <input type="text" onChange={e => setSalary(e.target.value)} placeholder="Enter your annual salary" />
        <div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </>
  );
}
