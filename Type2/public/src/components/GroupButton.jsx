// GroupButton.jsx
import React from "react";

const GroupButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="group-button">
      Create Group
    </button>
  );
};

export default GroupButton;
