import "./FormSelect2.scss";
import React from "react";

const FormSelect2 = ({ id, label, labels, values, register }) => {
  return (
    <div className="form-select-2">      
      <span className="details">{label}</span>
      <select {...register(id, { required: true })}>
        {values.map((value, index) => {
          return (
            <option key={index} value={value}>
              {labels[index]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect2;
