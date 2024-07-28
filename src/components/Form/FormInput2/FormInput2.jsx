import "./FormInput2.scss";
import React from "react";

const FormInput2 = ({
  id,
  label,
  type,
  step,
  register,
  errors,
  validation = {},
  children,
  handleClickEvent = null,
  error_class = "invalid-input",
}) => {
  return (
    <div className="form-input-2">
      <span className="details">{label}</span>
      <input
        type={type}
        step={step}
        placeholder={label}
        {...register(id, { required: true, ...validation })}
        className={errors[id] ? error_class : ""}
      />
      {handleClickEvent && <span className="react-ico" onClick={handleClickEvent}>{children}</span>}
    </div>
  );
};

export default FormInput2;
