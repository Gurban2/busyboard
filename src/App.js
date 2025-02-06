import React, { useState } from "react";
import "./App.css";
import TransactionList from "./components/TransactionList/TransactionList";
import Popup from "./components/Popup";
import Header from "./components/Header";

function App() {
  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setPopupOpen(!popupOpen);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <h1>Банки</h1>
        <TransactionList />
      </main>

      {popupOpen && <Popup onClose={handlePopupToggle} />}
    </div>
  );
}

export default App;
