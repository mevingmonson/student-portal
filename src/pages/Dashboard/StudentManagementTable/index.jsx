import React from "react";
// import { cloneDeep, findIndex, startCase } from "lodash";
import PropTypes from "prop-types";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// import userServices from "../../../api/userServices";
import "./style.scss";
import { cloneDeep, findIndex } from "lodash";
// import TableSkeleton from "../../../components/Skeletons/TableSkeleton";
// import showAlert from "../../../utils/showAlert";
// import helper from "../../../utils/helper";
// import appServices from "../../../api/appServices";

function StudentManagementTable({
  loader,
  setLoader,
  tableData,
  editHandler,
  deleteHandler,
  popUpData,
  setPopUpData,
}) {
  // const { getRoleLabel } = helper;
  // const tableData = [{ firstname: "Mevin", lastname: "Monson" }];

  const tableSkeletonSection = () => (
    <>
      {new Array(7).fill("").map(
        (el, index) => "loading"
        // <TableSkeleton index={index} />
      )}
    </>
  );

  const tableActionColumn = (item) => {
    // means deactivated and new user
    return (
      <>
        <div className="table-action___single">
          <button type="button" onClick={editHandler(item)}>
            <EditOutlinedIcon />
            Edit
          </button>
        </div>
        <div className="table-action___single">
          <button type="button" onClick={deleteHandler(item)}>
            <DeleteOutlineOutlinedIcon />
            Delete
          </button>
        </div>
      </>
    );
  };

  const tableDataSection = () => (
    <>
      {tableData.map((item, index) => (
        <div className="table-row">
          <div className="table-col profile-col">
            <p>{index + 1}</p>
          </div>

          <div className="table-col profile-col">
            <div className="profile-pic">
              <img
                src={`${
                  item.image_url ? item.image_url : "/assets/avatar.png"
                }`}
                alt="profile-pic"
              />
            </div>
            <p>{item.firstname}</p>
          </div>
          <div className="table-col course-col">
            <p>{item.lastname}</p>
          </div>
          <div className="table-col action-col">{tableActionColumn(item)}</div>
        </div>
      ))}
      {/* if there are no records  */}
      {tableData.length === 0 && (
        <div className="table-row table-row-no-data">No Record Found!</div>
      )}
    </>
  );

  return (
    <div className="table">
      <div className="table-header">
        <p>No</p>
        <p>First Name</p>
        <p>Last Name</p>
        <p>Actions</p>
      </div>
      <div className="table-body">
        {loader ? <p className="loading">Loading...</p> : tableDataSection()}
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
