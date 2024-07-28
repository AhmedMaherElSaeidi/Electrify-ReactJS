import "./FormInput1.scss";
import React from "react";

const FormInput1 = ({
  id,
  label,
  type,
  step,
  register,
  errors,
  validation = {},
  children,
  handleClickEvent,
  error_class = "invalid-input",
}) => {
  return (
    <div className="form-input-1">
      <input
        id={id}
        type={type}
        step={step}
        placeholder={label}
        className={errors[id] ? error_class : ""}
        {...register(id, { required: true, ...validation })}
      />
      {handleClickEvent && (
        <span className="react-ico" onClick={handleClickEvent}>
          {children}
        </span>
      )}
    </div>
  );
};

export default FormInput1;
