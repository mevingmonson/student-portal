import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import FileInput from './../../../components/FileInput/index';
import Input from './../../../components/Input/index';
import SelectBox from './../../../components/SelectBox/index';



function StudentManagementPopup({
  setLoader,
  popUpData,
  gerUserListDetails,
  closePopup,
}) {
  const [formDetails, setFormDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    userId: "",
    userType: "user", // default
    photo: "",
    // s3 bucket url
    image_name: "",
    // simply an image name
  });
  const [passwordError, updatePasswordError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const userListOptions = [
    { value: "user", label: "User" },

    {
      value: "business_admin",
      label: "Business Admin",
    },
  ];

 

  useEffect(() => {
    if (popUpData.isEditMode) {
      const formDetailsCopy = formDetails
      formDetailsCopy.email = popUpData.data.email;
      formDetailsCopy.firstName = popUpData.data.first_name;
      formDetailsCopy.lastName = popUpData.data.last_name;
      formDetailsCopy.companyName = popUpData.data.company_name;
      formDetailsCopy.userType = popUpData.data.type_of_user;
      formDetailsCopy.photo = popUpData.data.profile_pic;
      formDetailsCopy.image_name = popUpData.data.photo;
      setFormDetails(formDetailsCopy);
    }
  }, []);

  const onChangeHandler = (key) => (value1, value2) => {
    const formDetailsCopy = formDetails;
    formDetailsCopy[key] = value1;
    if (key === "photo") formDetailsCopy.image_name = value2;
    setFormDetails(formDetailsCopy);
    if (key === "password" || key === "confirmPassword") {
      updatePasswordError("");
    }
  };

  const submitData = () => {
    let payload = {
      email: formDetails.email,
      first_name: formDetails.firstName,
      last_name: formDetails.lastName,
      company_name: formDetails.companyName,
      photo: formDetails.image_name,
      user_type: formDetails.userType,
    };

   
  };

  const submitHandler = (event) => {
   
  };

  return (
    <div className="popup">
      <div className="popup-overlay" />
      <div className="popup-wrapper">
        <div className="popup-header">
          <h1>{popUpData.isEditMode ? "Edit User" : "New USER"}</h1>
          <p>
            {popUpData.isEditMode
              ? "Use this page to update your contact information and change your password."
              : "Use this page to add a new User"}
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="popup-body">
            <div className="popup-row">
              <Input
                maxLength={60}
                required="required"
                type="email"
                placeholder="Email address"
                onChange={onChangeHandler("email")}
                value={formDetails.email}
              />
              <div />
              {/* <FileInput
                onChange={onChangeHandler("photo")}
                imageUrl={formDetails.photo}
              /> */}
            </div>
            <div className="popup-row">
              <Input
                required="required"
                placeholder="First Name"
                onChange={onChangeHandler("firstName")}
                value={formDetails.firstName}
              />
              <Input
                required="required"
                placeholder="Last Name"
                onChange={onChangeHandler("lastName")}
                value={formDetails.lastName}
              />
              <Input
                required="required"
                placeholder="Company Name"
                onChange={onChangeHandler("companyName")}
                value={formDetails.companyName}
              />
            </div>
            <div className="popup-row">
              {popUpData.isEditMode && (
                <>
                  <Input
                    placeholder="New password"
                    type="password"
                    onChange={onChangeHandler("password")}
                    value={formDetails.password}
                  />

                  <Input
                    required={formDetails.password ? "required" : ""}
                    placeholder="Confirm"
                    type="password"
                    onChange={onChangeHandler("confirmPassword")}
                    value={formDetails.confirmPassword}
                  />
                </>
              )}
            </div>
          </div>
          <div className="invalidCredentials">{passwordError}</div>
          <div className="user-popup-footer">
            {/* <SelectBox
              listViewOption={userListOptions}
              onChange={onChangeHandler("userType")}
              value={formDetails.userType}
            /> */}
            <div>
              <button type="button" className="cancel-btn" onClick={closePopup}>
                Cancel
              </button>
              <button type="submit" className="save-btn" disabled={isLoading}>
                {isLoading ? (
                  <div style={{ textAlign: "center" }}>
                    {/* <Dots /> */}
                  </div>
                ) : (
                  (popUpData.isEditMode && "Save Changes") || "Add New Account"
                )}
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
  gerUserListDetails: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};
