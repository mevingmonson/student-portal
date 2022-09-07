import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import FileInput from './../../../components/FileInput/index';
import Input from "./../../../components/Input/index";
import SelectBox from "./../../../components/SelectBox/index";
import { cloneDeep, findIndex } from "lodash";

function StudentManagementPopup({
  setLoader,
  popUpData,
  tableData,
  setTableData,
  closePopup,
}) {
  const [formDetails, setFormDetails] = useState({
    email: "",
    id: "",
    course: "",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (popUpData.isEditMode) {
      const formDetailsCopy = cloneDeep(formDetails);
      formDetailsCopy.email = popUpData.data.email;
      formDetailsCopy.id = popUpData.data.id;
      formDetailsCopy.course = popUpData.data.course;
      setFormDetails(formDetailsCopy);
    }
  }, []);

  const onChangeHandler = (key) => (value) => {
    const formDetailsCopy = cloneDeep(formDetails);
    formDetailsCopy[key] = value;
    setFormDetails(formDetailsCopy);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (popUpData.isEditMode) {
      const index = findIndex(tableData, ["id", formDetails.id]);
      const tableDataCopy = cloneDeep(tableData);
      tableDataCopy[index] = formDetails;
      setTableData(tableDataCopy);
      closePopup();
    } else {
      const tableDataCopy = cloneDeep(tableData);
      tableDataCopy.push(formDetails);
      setTableData(tableDataCopy);
      closePopup();
    }
  };

  return (
    <div className="popup">
      <div className="popup-overlay" />
      <div className="popup-wrapper">
        <div className="popup-header">
          <h1>{popUpData.isEditMode ? "Edit Student" : "New Student"}</h1>
          <p>
            {popUpData.isEditMode
              ? "Use this page to update student information."
              : "Use this page to register a new student."}
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="popup-body">
            <div className="popup-row">
              <Input
                required="required"
                placeholder="ID"
                onChange={onChangeHandler("id")}
                value={formDetails.id}
                disabled={popUpData.isEditMode}
              />
              <Input
                maxLength={60}
                required="required"
                type="email"
                placeholder="Email address"
                onChange={onChangeHandler("email")}
                value={formDetails.email}
              />
              <Input
                required="required"
                placeholder="Course"
                onChange={onChangeHandler("course")}
                value={formDetails.course}
              />
            </div>
            <div className="user-popup-footer">
              <button type="button" className="cancel-btn" onClick={closePopup}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {(popUpData.isEditMode && "Save Changes") ||
                  "Enrol New Student"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentManagementPopup;

StudentManagementPopup.propTypes = {
  setLoader: PropTypes.func.isRequired,
  popUpData: PropTypes.instanceOf(Object).isRequired,
  closePopup: PropTypes.func.isRequired,
};
