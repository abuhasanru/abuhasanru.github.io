import React, { useState, useEffect } from 'react';
import { getHeads, getSubHeads, addSubHead, deleteSubHead, updateSubHead } from '../firebaseUtils';

const SubHeadsManager = ({ type }) => {
  const [heads, setHeads] = useState([]);
  const [selectedHead, setSelectedHead] = useState('');
  const [subHeads, setSubHeads] = useState([]);
  const [newSubHead, setNewSubHead] = useState('');
  const [editingSubHead, setEditingSubHead] = useState(null);
  const [editingSubHeadName, setEditingSubHeadName] = useState('');

  useEffect(() => {
    fetchHeads();
  }, [type]);

  useEffect(() => {
    if (selectedHead) {
      fetchSubHeads();
    } else {
      setSubHeads([]);
    }
  }, [selectedHead]);

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
    getSubHeads(selectedHead)
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

  const handleAddSubHead = () => {
    const subHead = {
      name: newSubHead,
    };
    addSubHead(selectedHead, subHead)
      .then(() => {
        alert('Sub-Head added successfully!');
        setNewSubHead('');
        fetchSubHeads();
      })
      .catch((error) => {
        alert('Error adding sub-head: ' + error.message);
      });
  };

  const handleDeleteSubHead = (id) => {
    if (window.confirm('Are you sure you want to delete this sub-head?')) {
      deleteSubHead(selectedHead, id)
        .then(() => {
          alert('Sub-Head deleted successfully!');
          fetchSubHeads();
        })
        .catch((error) => {
          alert('Error deleting sub-head: ' + error.message);
        });
    }
  };

  const handleEditSubHead = (subHead) => {
    setEditingSubHead(subHead.id);
    setEditingSubHeadName(subHead.name);
  };

  const handleUpdateSubHead = () => {
    updateSubHead(selectedHead, editingSubHead, editingSubHeadName)
      .then(() => {
        alert('Sub-Head updated successfully!');
        setEditingSubHead(null);
        setEditingSubHeadName('');
        fetchSubHeads();
      })
      .catch((error) => {
        alert('Error updating sub-head: ' + error.message);
      });
  };

  return (
    <div>
      <h3>Manage {type} Sub-Heads</h3>
      <select value={selectedHead} onChange={(e) => setSelectedHead(e.target.value)}>
        <option value="">Select Head</option>
        {heads.map((head) => (
          <option key={head.id} value={head.id}>
            {head.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={newSubHead}
        onChange={(e) => setNewSubHead(e.target.value)}
        placeholder={`New ${type} Sub-Head`}
      />
      <button onClick={handleAddSubHead}>Add Sub-Head</button>
      <ul>
        {subHeads.map((subHead) => (
          <li key={subHead.id}>
            {editingSubHead === subHead.id ? (
              <>
                <input
                  type="text"
                  value={editingSubHeadName}
                  onChange={(e) => setEditingSubHeadName(e.target.value)}
                />
                <button onClick={handleUpdateSubHead}>Update</button>
                <button onClick={() => setEditingSubHead(null)}>Cancel</button>
              </>
            ) : (
              <>
                {subHead.name}
                <button onClick={() => handleEditSubHead(subHead)}>Edit</button>
                <button onClick={() => handleDeleteSubHead(subHead.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubHeadsManager;
