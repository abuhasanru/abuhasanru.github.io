import React from 'react';

const ReportSummary = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenditure = transactions
    .filter((t) => t.type === 'Expenditure')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div>
      <h2>Report Summary</h2>
      <div>
        <h3>Total Income</h3>
        <p>৳ {totalIncome}</p>
      </div>
      <div>
        <h3>Total Expenditure</h3>
        <p>৳ {totalExpenditure}</p>
      </div>
    </div>
  );
};

export default ReportSummary;
