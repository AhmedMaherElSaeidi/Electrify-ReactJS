import "./FormInput3.scss";
import React from "react";

const FormInput3 = ({
  id,
  type,
  step,
  label,
  register,
  errors,
  validation,
  error_class = "invalid-input",
}) => {
  return (
    <input
      type={type}
      step={step}
      placeholder={label}
      {...register(id, { required: true, ...validation })}
      className={errors[id] ? `form-input-3 ${error_class}` : "form-input-3"}
    />
  );
};

export default FormInput3;
