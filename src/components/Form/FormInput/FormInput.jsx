import "./FormInput.scss";
import React from "react";

const FormInput = ({ id, label, type, step, register, errors }) => {
  return (
    <div className="form-input-container mb-2">
      {errors[id] && (
        <p className="text-danger text-start small mb-0">
          *{errors[id].message}
        </p>
      )}
      <input
        {...register(id, { required: `${label} is required` })}
        type={type}
        id={id}
        step={step}
        placeholder={label}
        className="form-control"
      />
    </div>
  );
};

export default FormInput;
