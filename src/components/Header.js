import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__nav">
        <div className="header__logo">Busyboard</div>
        <nav>
          <ul>
            <li>Дашборд</li>
            <li>Аналитика</li>
            <li>Финансы</li>
            <li>Автоматизация</li>
          </ul>
        </nav>
      </div>
      <div className="header__user">
        <div className="header__user-avatar">Аватар</div>
        <div className="header__user-name">Имя Фамилия</div>
      </div>
    </header>
  );
};

export default Header;
