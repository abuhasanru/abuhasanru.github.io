import React, { useState, useEffect } from 'react';
import { getHeads, addHead, deleteHead, updateHead } from '../firebaseUtils';

const HeadsManager = ({ type }) => {
  const [heads, setHeads] = useState([]);
  const [newHead, setNewHead] = useState('');
  const [editingHead, setEditingHead] = useState(null);
  const [editingHeadName, setEditingHeadName] = useState('');

  useEffect(() => {
    fetchHeads();
  }, [type]);

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

  const handleAddHead = () => {
    const head = {
      name: newHead,
    };
    addHead(type, head)
      .then(() => {
        alert('Head added successfully!');
        setNewHead('');
        fetchHeads();
      })
      .catch((error) => {
        alert('Error adding head: ' + error.message);
      });
  };

  const handleDeleteHead = (id) => {
    if (window.confirm('Are you sure you want to delete this head?')) {
      deleteHead(type, id)
        .then(() => {
          alert('Head deleted successfully!');
          fetchHeads();
        })
        .catch((error) => {
          alert('Error deleting head: ' + error.message);
        });
    }
  };

  const handleEditHead = (head) => {
    setEditingHead(head.id);
    setEditingHeadName(head.name);
  };

  const handleUpdateHead = () => {
    updateHead(type, editingHead, editingHeadName)
      .then(() => {
        alert('Head updated successfully!');
        setEditingHead(null);
        setEditingHeadName('');
        fetchHeads();
      })
      .catch((error) => {
        alert('Error updating head: ' + error.message);
      });
  };

  return (
    <div>
      <h3>Manage {type} Heads</h3>
      <input
        type="text"
        value={newHead}
        onChange={(e) => setNewHead(e.target.value)}
        placeholder={`New ${type} Head`}
      />
      <button onClick={handleAddHead}>Add Head</button>
      <ul>
        {heads.map((head) => (
          <li key={head.id}>
            {editingHead === head.id ? (
              <>
                <input
                  type="text"
                  value={editingHeadName}
                  onChange={(e) => setEditingHeadName(e.target.value)}
                />
                <button onClick={handleUpdateHead}>Update</button>
                <button onClick={() => setEditingHead(null)}>Cancel</button>
              </>
            ) : (
              <>
                {head.name}
                <button onClick={() => handleEditHead(head)}>Edit</button>
                <button onClick={() => handleDeleteHead(head.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadsManager;
