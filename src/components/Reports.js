import React, { useState } from 'react';
import ReportFilters from './ReportFilters';
import TransactionsReport from './TransactionsReport';
import HeadsOverviewReport from './HeadsOverviewReport';
import ReportSummary from './ReportSummary';

const Reports = () => {
  const [reportType, setReportType] = useState('transactions'); // 'transactions' or 'heads'
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  return (
    <div>
      <ReportFilters setFilteredTransactions={setFilteredTransactions} />
      <div>
        <button onClick={() => setReportType('transactions')}>View Transactions</button>
        <button onClick={() => setReportType('heads')}>View Heads Overview</button>
      </div>
      <ReportSummary transactions={filteredTransactions} />
      {reportType === 'transactions' ? (
        <TransactionsReport transactions={filteredTransactions} />
      ) : (
        <HeadsOverviewReport transactions={filteredTransactions} />
      )}
    </div>
  );
};

export default Reports;
