import React from "react";
import { FaBackward, FaForward } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center mb-3">
      {currentPage > 1 && (
        <button
          className="btn btn-light m-2"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FaBackward />
        </button>
      )}
      <span className="text-dark d-flex align-items-center m-2">{`Page ${currentPage} of ${
        totalPages || 1
      }`}</span>
      {currentPage < totalPages && (
        <button
          className="btn btn-light m-2"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FaForward />
        </button>
      )}
    </div>
  );
};

export default Pagination;
