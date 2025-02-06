import React from "react";
import "./TableHeader.scss";

const TableHeader = ({ selectedYear, onYearChange }) => {
  return (
    <div className="bank-header">
      <div className="left-buttons">
        <select value={selectedYear} onChange={onYearChange}>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <div className="left-buttons-inner">
          <button>Все статьи</button>
          <button>Разнесены</button>
          <button>Не разнесены</button>
        </div>
      </div>

      <div className="right-buttons">
        <button className="btn-upload">Загрузить выписку</button>
        <button className="btn-rules">Правила</button>
      </div>
    </div>
  );
};

export default TableHeader;
