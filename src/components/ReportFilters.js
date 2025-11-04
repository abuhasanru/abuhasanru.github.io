import React, { useState, useEffect } from 'react';
import { getTransactions, getHeads } from '../firebaseUtils';

const ReportFilters = ({ setFilteredTransactions }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [head, setHead] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [heads, setHeads] = useState([]);

  useEffect(() => {
    fetchHeads();
  }, []);

  const fetchHeads = () => {
    Promise.all([getHeads('Income'), getHeads('Expenditure')])
      .then(([incomeHeads, expenseHeads]) => {
        const allHeads = [];
        if (incomeHeads.exists()) {
          allHeads.push(...Object.values(incomeHeads.val()));
        }
        if (expenseHeads.exists()) {
          allHeads.push(...Object.values(expenseHeads.val()));
        }
        setHeads(allHeads);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGenerateReport = () => {
    getTransactions()
      .then((snapshot) => {
        if (snapshot.exists()) {
          let transactions = Object.values(snapshot.val());

          if (startDate) {
            transactions = transactions.filter((t) => t.date >= startDate);
          }
          if (endDate) {
            transactions = transactions.filter((t) => t.date <= endDate);
          }
          if (head) {
            transactions = transactions.filter((t) => t.head === head);
          }
          if (searchTerm) {
            transactions = transactions.filter((t) =>
              t.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }

          if (sortBy === 'date') {
            transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
          } else {
            transactions.sort((a, b) => b.amount - a.amount);
          }

          setFilteredTransactions(transactions);
        } else {
          setFilteredTransactions([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Report Filters</h2>
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <label>End Date:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <label>Head:</label>
      <select value={head} onChange={(e) => setHead(e.target.value)}>
        <option value="">All</option>
        {heads.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>
      <button onClick={handleGenerateReport}>Generate Report</button>
    </div>
  );
};

export default ReportFilters;
