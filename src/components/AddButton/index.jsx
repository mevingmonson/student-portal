import React from "react";
import "./style.scss";
import PropTypes from "prop-types";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function AddButton({ onClickHandle }) {
  const onClickHandler = () => {
    onClickHandle();
  };

  return (
    <div className="btn-wrapper">
      <button type="button" onClick={onClickHandler}>
        {" "}
        <AddCircleOutlineOutlinedIcon /> Add New
      </button>
    </div>
  );
}

export default AddButton;

AddButton.propTypes = {
  onClickHandle: PropTypes.func.isRequired,
};
