import React, { useState, useMemo } from 'react';
import { deleteTransaction } from '../firebaseUtils';

const AllTransactionsTable = ({ transactions, heads, subHeads, onDeleteTransaction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  const getHeadName = (id) => (heads[id] ? heads[id].name : '');
  const getSubHeadName = (id) => (subHeads[id] ? subHeads[id].name : '');

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
          getHeadName(t.head).toLowerCase().includes(searchTerm.toLowerCase()) ||
          getSubHeadName(t.subHead).toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const [key, order] = sortBy.split('-');
    filtered.sort((a, b) => {
      if (key === 'date') {
        const valA = new Date(a.date);
        const valB = new Date(b.date);
        return order === 'asc' ? valA - valB : valB - valA;
      } else {
        const valA = a.amount;
        const valB = b.amount;
        return order === 'asc' ? valA - valB : valB - valA;
      }
    });

    return filtered;
  }, [transactions, searchTerm, sortBy, heads, subHeads]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id)
        .then(() => {
          alert('Transaction deleted successfully!');
          onDeleteTransaction();
        })
        .catch((error) => {
          alert('Error deleting transaction: ' + error.message);
        });
    }
  };

  return (
    <div>
      <h2>All Transactions</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date-desc">Sort by Date (Newest First)</option>
        <option value="date-asc">Sort by Date (Oldest First)</option>
        <option value="amount-desc">Sort by Amount (High/Low)</option>
        <option value="amount-asc">Sort by Amount (Low/High)</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Head</th>
            <th>Sub-Head</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{getHeadName(transaction.head)}</td>
              <td>{getSubHeadName(transaction.subHead)}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>
                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTransactionsTable;
