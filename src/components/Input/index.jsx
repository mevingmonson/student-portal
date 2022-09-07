import React from "react";
import "./style.scss";
import PropTypes from "prop-types";

function Input({
  placeholder,
  onChange,
  value,
  type,
  required,
  minLength,
  maxLength,
  disabled = false,
}) {
  const onChangeHandle = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-wrapper">
      <label htmlFor={placeholder}>{placeholder}</label>
      <input
        id={placeholder}
        required={required}
        type={type}
        onChange={onChangeHandle}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;

Input.defaultProps = {
  placeholder: "Enter",
  onChange: () => {},
  value: "",
  type: "text",
  required: false,
  minLength: 0,
  maxLength: 30,
};

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};
