import React, { useState, useEffect } from 'react';
import { addTransaction } from '../firebaseUtils';
import { getHeads, getSubHeads } from '../firebaseUtils';

const AddTransactionForm = ({ onAddTransaction }) => {
  const [type, setType] = useState('Income');
  const [head, setHead] = useState('');
  const [subHead, setSubHead] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [heads, setHeads] = useState([]);
  const [subHeads, setSubHeads] = useState([]);

  useEffect(() => {
    fetchHeads();
  }, [type]);

  useEffect(() => {
    if (head) {
      fetchSubHeads();
    } else {
      setSubHeads([]);
    }
  }, [head]);

  const fetchHeads = () => {
    getHeads(type)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setHeads(Object.values(snapshot.val()));
        } else {
          setHeads([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSubHeads = () => {
    getSubHeads(head)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSubHeads(Object.values(snapshot.val()));
        } else {
          setSubHeads([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      type,
      head,
      subHead,
      amount: parseFloat(amount),
      date,
      description,
    };
    addTransaction(newTransaction)
      .then(() => {
        alert('Transaction added successfully!');
        // Clear the form
        setType('Income');
        setHead('');
        setSubHead('');
        setAmount('');
        setDate('');
        setDescription('');
        onAddTransaction();
      })
      .catch((error) => {
        alert('Error adding transaction: ' + error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Transaction</h2>
      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Income">Income</option>
          <option value="Expenditure">Expenditure</option>
        </select>
      </div>
      <div>
        <label>Head:</label>
        <select value={head} onChange={(e) => setHead(e.target.value)}>
          <option value="">Select Head</option>
          {heads.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Sub-Head:</label>
        <select value={subHead} onChange={(e) => setSubHead(e.target.value)}>
          <option value="">Select Sub-Head</option>
          {subHeads.map((sh) => (
            <option key={sh.id} value={sh.id}>
              {sh.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
