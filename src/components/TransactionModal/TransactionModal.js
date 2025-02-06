import React, { useState } from "react";
import Popup from "../Popup";
import useTransactionApi from "../../api/api";
import "./TransactionModal.scss";

const parseAmount = (amount) =>
  parseFloat(amount.replace(/\s+/g, "").replace(",", "."));

const TransactionModal = ({ bank, onClose, onSuccess }) => {
  const [values, setValues] = useState({
    profitAmount: "",
    cashAmount: "",
    remainingAmount: "",
    operationType: "",
    transferType: "",
  });

  const { loading, error, responseMessage, submitTransaction } =
    useTransactionApi();

  const totalAmount = parseAmount(bank.income);

  const handleChange =
    (field, isProfit = true) =>
    (e) => {
      const value = parseAmount(e.target.value);
      setValues((prev) => {
        const updatedValues = { ...prev, [field]: value };
        if (isProfit) {
          updatedValues.cashAmount = totalAmount - value;
        } else {
          updatedValues.profitAmount = totalAmount - value;
        }
        return updatedValues;
      });
    };

  const handleSubmit = async () => {
    const {
      profitAmount,
      cashAmount,
      remainingAmount,
      operationType,
      transferType,
    } = values;

    if (profitAmount && cashAmount && operationType && transferType) {
      onSuccess({...bank, ...values, success: true});

      onClose();
    }
  };

  const handleCancel = () => {
    setValues({
      profitAmount: "",
      cashAmount: "",
      remainingAmount: "",
      operationType: "",
      transferType: "",
    });
    onClose();
  };

  const isSaveButtonDisabled =
    values.profitAmount === "" ||
    values.cashAmount === "" ||
    !values.remainingAmount ||
    !values.operationType ||
    !values.transferType;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Детали платежа</h2>
        <div className="totalWrapper">
          <div>
            <h4>Общая сумма платежа</h4>
            <input type="number" value={totalAmount} readOnly />
          </div>
          <div>
            <h4>Осталось разнести</h4>
            <input
              type="number"
              value={values.remainingAmount}
              onChange={(e) =>
                setValues({ ...values, remainingAmount: e.target.value })
              }
              style={{
                borderColor:
                  values.remainingAmount !== "0" &&
                  values.remainingAmount !== ""
                    ? "red"
                    : "",
              }}
            />
          </div>
        </div>

        <div className="transactionDetails">
          <div>
            <label>Сумма:</label>
            <input
              type="number"
              value={values.profitAmount}
              onChange={handleChange("profitAmount")}
              placeholder="Введите сумму оплаты"
            />
          </div>

          <div>
            <label>Тип операции</label>
            <select
              value={values.operationType}
              onChange={(e) =>
                setValues({ ...values, operationType: e.target.value })
              }
            >
              <option value="">Выберите</option>
              <option value="profit">Вывод чистой прибыли</option>
              <option value="account_transfer">Перевод на счет</option>
            </select>
          </div>

          <div>
            <label>Сумма</label>
            <input
              type="number"
              value={values.cashAmount}
              onChange={handleChange("cashAmount", false)}
              placeholder="Введите сумму оплаты"
            />
          </div>

          <div>
            <label>Тип операции для переноса</label>
            <select
              value={values.transferType}
              onChange={(e) =>
                setValues({ ...values, transferType: e.target.value })
              }
            >
              <option value="">Выберите</option>
              <option value="cash_transfer">Перенос в кассу</option>
            </select>
          </div>
        </div>

        <div className="buttons">
          <button
            onClick={handleSubmit}
            disabled={isSaveButtonDisabled || loading}
          >
            {loading ? "Загрузка..." : "Сохранить"}
          </button>
          <button onClick={handleCancel}>Отмена</button>
        </div>

        {responseMessage && (
          <Popup
            success={responseMessage.includes("успешно")}
            message={responseMessage}
          />
        )}

        {error && <Popup success={false} message={error} />}
      </div>
    </div>
  );
};

export default TransactionModal;
