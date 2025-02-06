export const fetchTransactions = async () => {
    // Ваш запрос к API
    const response = await fetch('/api/transactions');
    const data = await response.json();
    return data;
  };
  