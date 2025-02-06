import { useState } from "react";

const useTransactionApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const submitTransaction = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://busyboard-test.ru/api/v1/bank/operations/transfer-to-cashbox/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_bank_operation: 0,
            sum_for_transfer_to_cashbox: data.cashAmount.toString(),
            sum_for_net_profit_withdrawal: data.profitAmount.toString(),
          }),
        }
      );

      const responseData = await response.json();

      if (response.status === 200) {
        setResponseMessage(responseData.message);
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      setError("Ошибка запроса");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, responseMessage, submitTransaction };
};

export default useTransactionApi;
