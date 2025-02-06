import { useState, useEffect } from "react";
import TransactionModal from "../TransactionModal/TransactionModal";
import TableHeader from "./TableHeader";
import Dropdown from "../Dropdown";
import transactionsData from "../../api/banksApi.json";
import "./TransactionList.scss";
import Popup from "../Popup";

const TransactionList = () => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [activeArticles, setActiveArticles] = useState({});
  const [selectedYear, setSelectedYear] = useState("2025");
  const [success, setSuccess] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setBanks(transactionsData);
  }, []);

  const handleButtonClick = (bank) => {
    setSelectedBank(bank);
  };

  const handleArticleChange = (bankId, value) => {
    setActiveArticles((prev) => ({
      ...prev,
      [bankId]: value,
    }));
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setCurrentPage(1);
  };

  const lastDigit = selectedYear[selectedYear.length - 1];
  const filteredBanks = banks.filter(
    (bank) => String(bank.date).slice(-1) === lastDigit
  );

  const formatDate = (date) => {
    const dateString = String(date);
    const day = dateString.slice(0, 2);
    const month = dateString.slice(2, 4);
    const year = dateString.slice(4);
    return `${day}.${month}.${year}`;
  };

  const handleSuccess = (bank) => {
    setBanks((prev) => prev.map((item) => (item.id === bank.id ? bank : item)));
    setSuccess("Транзакция успешно выполнена");
  };

  const totalPages = Math.ceil(filteredBanks.length / itemsPerPage);
  const currentBanks = filteredBanks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {selectedBank && (
        <TransactionModal
          bank={selectedBank}
          onSuccess={handleSuccess}
          onClose={() => setSelectedBank(null)}
        />
      )}
      {success && (
        <Popup message={success} success onClose={() => setSuccess(null)} />
      )}
      <div className="bank-container">
        <TableHeader
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Приход</th>
              <th>Расход</th>
              <th>Банк</th>
              <th>Контрагент</th>
              <th>Статья</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {currentBanks.map((bank) => (
              <tr key={bank.id}>
                <td>
                  <p>{formatDate(bank.date)}</p>
                </td>
                <td>
                  <p>{bank.income ? `${bank.income} ₽` : "-"}</p>
                </td>
                <td>
                  <p>{bank.expense ? `${bank.expense} ₽` : "-"}</p>
                </td>
                <td>
                  <p>{bank.bank}</p>
                </td>
                <td>
                  <p>{bank.contragent}</p>
                </td>
                <td>
                  <div className="category-select-container">
                    <Dropdown
                      bank={bank}
                      activeArticles={activeArticles}
                      handleSelectChange={handleArticleChange}
                      onExportClick={(e) => {
                        e.stopPropagation();
                        handleButtonClick(bank);
                      }}
                    />
                  </div>
                </td>
                <td>{bank.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            1
          </button>
        
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            2
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionList;
