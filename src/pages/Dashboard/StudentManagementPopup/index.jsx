import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import FileInput from './../../../components/FileInput/index';
import Input from "./../../../components/Input/index";
import SelectBox from "./../../../components/SelectBox/index";
import { cloneDeep, findIndex } from "lodash";
import showAlert from "../../../utils/showAlert";
import appServices from "../../../api/appServices";

function StudentManagementPopup({
  setLoader,
  popUpData,
  tableData,
  setTableData,
  closePopup,
  getStudentList,
}) {
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    // id: "",
    lastname: "",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (popUpData.isEditMode) {
      let formDetailsCopy = cloneDeep(formDetails);
      formDetailsCopy = popUpData.data;
      setFormDetails(formDetailsCopy);
    }
  }, []);

  const onChangeHandler = (key) => (value) => {
    const formDetailsCopy = cloneDeep(formDetails);
    formDetailsCopy[key] = value;
    setFormDetails(formDetailsCopy);
  };

  const addStudent = async () => {
    try {
      setLoading(true);
      const response = await appServices.addStudent(formDetails);
      getStudentList();
      closePopup();
      showAlert("New student enrolled", "success");
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  const editStudent = async () => {
    try {
      setLoading(true);
      const response = await appServices.updateStudent(formDetails);
      getStudentList();
      closePopup();
      showAlert("Updated successfully!", "success");
    } catch (error) {
      setLoading(false);

      return error;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (popUpData.isEditMode) {
      editStudent();
    } else {
      addStudent();
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
              {/* <Input
                required="required"
                placeholder="ID"
                onChange={onChangeHandler("id")}
                value={formDetails.id}
                disabled={popUpData.isEditMode}
              /> */}
              <Input
                maxLength={60}
                required="required"
                type="string"
                placeholder="First Name"
                onChange={onChangeHandler("firstname")}
                value={formDetails.firstname}
              />
              <Input
                required="required"
                placeholder="Last Name"
                onChange={onChangeHandler("lastname")}
                value={formDetails.lastname}
              />
            </div>
            <div className="user-popup-footer">
              <button type="button" className="cancel-btn" onClick={closePopup}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {isLoading
                  ? "Saving..."
                  : (popUpData.isEditMode && "Save Changes") ||
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
