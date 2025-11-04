import React from 'react';

const HeadsOverviewReport = ({ transactions }) => {
  const headsOverview = transactions.reduce((acc, t) => {
    const key = `${t.head}-${t.subHead}`;
    if (!acc[key]) {
      acc[key] = { head: t.head, subHead: t.subHead, total: 0 };
    }
    acc[key].total += t.amount;
    return acc;
  }, {});

  return (
    <div>
      <h2>Heads Overview Report</h2>
      <table>
        <thead>
          <tr>
            <th>Head</th>
            <th>Sub-Head</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(headsOverview).map((item, index) => (
            <tr key={index}>
              <td>{item.head}</td>
              <td>{item.subHead}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeadsOverviewReport;
