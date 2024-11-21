import React, { useState } from "react";
import "./CopyTextComponent.css"; // If you want to include custom styling
import { FaCopy } from "react-icons/fa";
const CopyTextComponent = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="text-container">
      <button onClick={handleCopyClick} className="copy-btn" aria-label="Copy">
        <FaCopy />
      </button>
      {copied && <span className="copy-feedback">Copied!</span>}
    </div>
  );
};

export default CopyTextComponent;
