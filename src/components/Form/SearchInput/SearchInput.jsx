import "./SearchInput.scss";
import React from "react";

const SearchInput = ({ placeholder, onChange }) => {
  return (
    <input
      type="text"
      className="search-input"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default SearchInput;
