export const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    return data;
  };
  