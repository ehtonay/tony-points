import * as React from "react";

type TaxBracketTileProps = {
  min: string;
  max: string;
  taxesPaid: string;
};

export const TaxBracketTile = ({ min, max, taxesPaid }: TaxBracketTileProps) => {
  console.log('max', max)
  return (
    <div className="tile">
      <div><b>Bracket</b></div>
      <div>{min} - {max}</div>
      <br/>
      <div><b>Taxes paid:</b> {taxesPaid}</div>
    </div>
  );
}