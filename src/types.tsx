export type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
  taxesPaid?: number;
}

export type TaxResponse = {
  tax_brackets?: TaxBracket[]
  errors?: [Error]
};