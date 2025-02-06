import { useState } from "react";
import { ReactComponent as ExportIcon2 } from "../../assets/icons/export2.svg";
import { ReactComponent as ExportIcon } from "../../assets/icons/export.svg";

import { ReactComponent as DropdownIcon } from "../../assets/icons/dropdown.svg";

import "./Dropdown.scss";

const Dropdown = ({
  bank,
  activeArticles,
  handleSelectChange,
  onExportClick,
  success,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportedBanks, setExportedBanks] = useState({});

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {activeArticles[bank.id] || "Выберите статью"}{" "}
        {activeArticles[bank.id] === "Вывод ЧП" &&
          (bank.success ? (
            <ExportIcon
              onClick={onExportClick}
              style={{ margin: "0 10px 0 auto" }}
            />
          ) : (
            <ExportIcon2
              onClick={onExportClick}
              style={{ margin: "0 10px 0 auto" }}
            />
          ))}
        <DropdownIcon />
      </div>

      {isOpen && (
        <ul className="dropdown-list">
          {bank.articles.map((article) => (
            <li
              key={article}
              className="dropdown-item"
              onClick={() => {
                handleSelectChange(bank.id, article);
                setIsOpen(false);
              }}
            >
              {article}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
