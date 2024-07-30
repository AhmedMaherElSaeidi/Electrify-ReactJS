import "./FormTextArea2.scss";
import React from "react";

const FormTextArea2 = ({
  id,
  label,
  errors,
  register,
  validation,
  error_class = "invalid-input",
}) => {
  return (
    <div className="form-text-area-2">
      <span className="details">{label}</span>
      <textarea
        rows="15"
        placeholder={label}
        {...register(id, { required: true, ...validation })}
        className={errors[id] ? error_class : ""}
      ></textarea>
    </div>
  );
};

export default FormTextArea2;
