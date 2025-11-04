import { ref, set, get, remove, push } from "firebase/database";
import { db } from "./firebase";

export const addTransaction = (transaction) => {
  const transactionRef = ref(db, 'transactions');
  const newTransactionRef = push(transactionRef);
  return set(newTransactionRef, { ...transaction, id: newTransactionRef.key });
};

export const getTransactions = () => {
  const transactionsRef = ref(db, 'transactions');
  return get(transactionsRef);
};

export const deleteTransaction = (id) => {
  const transactionRef = ref(db, 'transactions/' + id);
  return remove(transactionRef);
};

export const getHeads = (type) => {
  const headsRef = ref(db, `heads/${type}`);
  return get(headsRef);
};

export const addHead = (type, head) => {
  const headRef = ref(db, `heads/${type}`);
  const newHeadRef = push(headRef);
  return set(newHeadRef, { ...head, id: newHeadRef.key });
};

export const deleteHead = (type, id) => {
  const headRef = ref(db, `heads/${type}/${id}`);
  const transactionsRef = ref(db, 'transactions');
  const subHeadsRef = ref(db, `subHeads/${id}`);

  return get(transactionsRef).then((snapshot) => {
    if (snapshot.exists()) {
      const allTransactions = snapshot.val();
      const transactionDeletions = Object.keys(allTransactions)
        .filter((key) => allTransactions[key].head === id)
        .map((key) => remove(ref(db, `transactions/${key}`)));
      return Promise.all(transactionDeletions);
    }
  }).then(() => {
    return remove(subHeadsRef);
  }).then(() => {
    return remove(headRef);
  });
};

export const getSubHeads = (headId) => {
  const subHeadsRef = ref(db, `subHeads/${headId}`);
  return get(subHeadsRef);
};

export const addSubHead = (headId, subHead) => {
  const subHeadRef = ref(db, `subHeads/${headId}`);
  const newSubHeadRef = push(subHeadRef);
  return set(newSubHeadRef, { ...subHead, id: newSubHeadRef.key });
};

export const deleteSubHead = (headId, id) => {
  const subHeadRef = ref(db, `subHeads/${headId}/${id}`);
  return remove(subHeadRef);
};

export const getAllData = () => {
  const dbRef = ref(db);
  return get(dbRef);
};

export const setAllData = (data) => {
  const dbRef = ref(db);
  return set(dbRef, data);
};

export const updateHead = (type, id, name) => {
  const headRef = ref(db, `heads/${type}/${id}/name`);
  return set(headRef, name);
};

export const updateSubHead = (headId, id, name) => {
  const subHeadRef = ref(db, `subHeads/${headId}/${id}/name`);
  return set(subHeadRef, name);
};
