import React, { useEffect, useState } from 'react';
import FinancialSummary from './FinancialSummary';
import AddTransactionForm from './AddTransactionForm';
import AllTransactionsTable from './AllTransactionsTable';
import { getTransactions, getHeads, getSubHeads } from '../firebaseUtils';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [heads, setHeads] = useState({});
  const [subHeads, setSubHeads] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Promise.all([
      getTransactions(),
      getHeads('Income'),
      getHeads('Expenditure'),
    ]).then(([transactionsSnapshot, incomeHeadsSnapshot, expenseHeadsSnapshot]) => {
      if (transactionsSnapshot.exists()) {
        setTransactions(Object.values(transactionsSnapshot.val()));
      } else {
        setTransactions([]);
      }

      const allHeads = {};
      if (incomeHeadsSnapshot.exists()) {
        Object.assign(allHeads, incomeHeadsSnapshot.val());
      }
      if (expenseHeadsSnapshot.exists()) {
        Object.assign(allHeads, expenseHeadsSnapshot.val());
      }
      setHeads(allHeads);

      const subHeadPromises = Object.keys(allHeads).map((headId) => getSubHeads(headId));
      Promise.all(subHeadPromises).then((subHeadSnapshots) => {
        const allSubHeads = {};
        subHeadSnapshots.forEach((snapshot) => {
          if (snapshot.exists()) {
            Object.assign(allSubHeads, snapshot.val());
          }
        });
        setSubHeads(allSubHeads);
      });
    });
  };

  return (
    <div className="dashboard">
      <FinancialSummary transactions={transactions} />
      <AddTransactionForm onAddTransaction={fetchData} />
      <AllTransactionsTable
        transactions={transactions}
        heads={heads}
        subHeads={subHeads}
        onDeleteTransaction={fetchData}
      />
    </div>
  );
};

export default Dashboard;
