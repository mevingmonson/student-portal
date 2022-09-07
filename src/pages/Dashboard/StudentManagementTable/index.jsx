import React from "react";
// import { cloneDeep, findIndex, startCase } from "lodash";
import PropTypes from "prop-types";

// import userServices from "../../../api/userServices";
import "./style.scss";
// import TableSkeleton from "../../../components/Skeletons/TableSkeleton";
// import showAlert from "../../../utils/showAlert";
// import helper from "../../../utils/helper";
// import appServices from "../../../api/appServices";

function StudentManagementTable({
  loader,
  setLoader,
  tableData,
  setTableData,
  popUpData,
  setPopUpData,
}) {

  tableData=[
    
  ]
  // const { getRoleLabel } = helper;

  // const editHandler = (item) => {
  //   const popUpDataCopy = cloneDeep(popUpData);
  //   popUpDataCopy.isShowPopUp = true;
  //   popUpDataCopy.isEditMode = true;
  //   popUpDataCopy.data = item;
  //   setPopUpData(popUpDataCopy);
  // };

 

 
  const tableSkeletonSection = () => (
    <>
      {new Array(7).fill("").map((el, index) => (
        "loading"
        // <TableSkeleton index={index} />
      ))}
    </>
  );

  const tableAccessColumn = (item) => {
    if (item.last_login === 0 && item.active === false)
      return <p className="red-col">Pending Verification</p>;
    return <p className="blue-col">{item.type_of_user}</p>;
  };

  const tableActionColumn = (item) => {
    if (item.last_login === 0 && item.active === false)
      return (
        <div className="table-action___single"> 
          <button type="button" onClick={()=>{alert("1")} }>
            <img src="/assets/reload.svg" alt="reload" />
            Resend Email
          </button>  
        </div>
      );
    // means deactivated and new user
    return (
      <>
        <div className="table-action___single">
          <button type="button" >
            <img src="/assets/edit.svg" alt="edit" />
            Edit
          </button>
        </div>
        <div className="table-action___single">
          <button type="button">
            <img src="/assets/reset-pwd.svg" alt="reset-password" />
            Reset Password
          </button>
        </div>
        <div className="table-action___single" style={{ display: "none" }}>
          <button type="button">
            <img src="/assets/download.svg" alt="download" />
            Logs
          </button>
        </div>
        <div className="table-action___single">
          <button type="button">
            <img src="/assets/padlock.svg" alt="status-change" />
            {item.active === true ? "Deactivate" : <>Activate&ensp;&ensp;</>}
          </button>
        </div>
      </>
    );
  };

  const tableDataSection = () => (
    <>
      {tableData.map((item) => (
        <div className="table-row">
          <div className="table-col profile-col">
            <div className="profile-pic">
              <img
                src={`${
                  item.profile_pic ? item.profile_pic : "/assets/avatar.png"
                }`}
                alt="avatar"
              />
            </div>
            <p>{"Mevin G Monson"}</p>
          </div>
          <div className="table-col email-col">
            <p>{item.email}</p>
          </div>
          <div className="table-col access-col">{"25"}</div>
          <div className="table-col action-col">Test</div>
        </div>
      ))}
      {/* if there are no records  */}
      {/* {tableData.length === 0 && (
        <div className="table-row table-row-no-data">No Record Found!</div>
      )} */}
    </>
  );

  return (
    <div className="table">
      <div className="table-header">
        <p>ID</p>
        <p>Email</p>
        <p>Course</p>
        <p>Actions</p>
      </div>
      <div className="table-body">
        {false ? tableSkeletonSection() : tableDataSection()}
      </div>
    </div>
  );
}

export default StudentManagementTable;

StudentManagementTable.defaultProps = {
  tableData: [],
};

StudentManagementTable.propTypes = {
  loader: PropTypes.bool.isRequired,
  setLoader: PropTypes.func.isRequired,
  tableData: PropTypes.instanceOf(Array),
  setTableData: PropTypes.func.isRequired,
  popUpData: PropTypes.instanceOf(Object).isRequired,
  setPopUpData: PropTypes.func.isRequired,
};
