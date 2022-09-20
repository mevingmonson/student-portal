import React from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import "./style.scss";
import PropTypes from "prop-types";

function SearchInput({ onChange, value, inputRef = null, placeholder }) {
  const onChangeHandle = (e) => {
    onChange(e.target.value);
  };

  const clearValue = () => {
    onChange("");
  };

  return (
    <div className="search-wrapper">
      <SearchOutlinedIcon />
      <input
        placeholder={placeholder}
        onChange={onChangeHandle}
        value={value}
        ref={inputRef}
      />
      {value && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          role="presentation"
          onKeyPress={clearValue}
          className="cancel-icon"
          onClick={clearValue}
        >
          <ClearOutlinedIcon />
        </label>
      )}
    </div>
  );
}

export default SearchInput;

SearchInput.defaultProps = {
  onChange: () => {},
  value: "",
  inputRef: "",
};

SearchInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  inputRef: PropTypes.instanceOf(Object),
  placeholder: PropTypes.string.isRequired,
};
