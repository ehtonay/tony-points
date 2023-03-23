import * as React from "react";

type TaxBracketTileProps = {
  min: string;
  max: string;
  taxesPaid: string;
};

export const TaxBracketTile = ({ min, max, taxesPaid }: TaxBracketTileProps) => {
  return (
    <>
      <div>{min} - {max}</div>
      <div>Taxes paid: {taxesPaid}</div>
    </>
  );
}