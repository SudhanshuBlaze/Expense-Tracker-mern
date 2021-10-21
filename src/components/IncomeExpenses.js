import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const IncomeExpense = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((acc, item) => (acc += item), 0);
  return (
    <>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">₹{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">₹{Math.abs(expense).toFixed(2)}</p>
        </div>
      </div>
    </>
  );
};
