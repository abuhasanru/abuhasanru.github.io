import React from 'react';

const FinancialSummary = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenditure = transactions
    .filter((t) => t.type === 'Expenditure')
    .reduce((acc, t) => acc + t.amount, 0);

  const currentBalance = totalIncome - totalExpenditure;

  return (
    <div className="financial-summary">
      <div>
        <h3>Total Income</h3>
        <p>৳ {totalIncome}</p>
      </div>
      <div>
        <h3>Total Expenditure</h3>
        <p>৳ {totalExpenditure}</p>
      </div>
      <div>
        <h3>Current Balance</h3>
        <p>৳ {currentBalance}</p>
      </div>
    </div>
  );
};

export default FinancialSummary;
