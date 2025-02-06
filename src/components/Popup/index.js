import React, { useEffect, useState } from "react";
import "./Popup.scss";

const Popup = ({ success, message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose && onClose(), 3000);
      return () => clearTimeout(timer);
    }

  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`popup show ${success ? "success" : "error"}`}>
      <p>{message}</p>
    </div>
  );
};

export default Popup;
