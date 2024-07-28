import "./FormRadio2.scss";
import React from "react";

const FormRadio2 = ({ id, type, labels, values, label, register, errors }) => {
  return (
    <div className="form-radio-2">
      {values &&
        values.map((value, index) => {
          return (
            <input
              key={index}
              type={type}
              name={label}
              value={value}
              id={`input-${index + 1}`}
              {...register(id, { required: `${label} is required.` })}
            />
          );
        })}
      <span className="gender-title">{label}</span>
      <div className="category mb-1">
        {labels &&
          labels.map((value, index) => {
            return (
              <label htmlFor={`input-${index + 1}`} key={index}>
                <span className={`dot span-${index + 1}`}></span>
                <span className="gender">{value}</span>
              </label>
            );
          })}
      </div>
      {errors[id] && (
        <span className="small text-danger">{errors[id].message}</span>
      )}
    </div>
  );
};

export default FormRadio2;
