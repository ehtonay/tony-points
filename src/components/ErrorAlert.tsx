import * as React from "react";

type ErrorAlertProps = {
  errorMessage: string;
};

export const ErrorAlert = ({ errorMessage }: ErrorAlertProps) => {
  return (
      <div id="errorMessage">
        {errorMessage}
      </div>
  );
}