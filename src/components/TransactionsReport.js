import React from 'react';

const TransactionsReport = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions Report</h2>
      <button onClick={() => window.print()}>Print</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Head</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.head}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsReport;
