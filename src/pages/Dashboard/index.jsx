import React, { useEffect, useRef, useState } from "react";
import { cloneDeep, findIndex } from "lodash";

import "./style.scss";
import AdminHeader from "../../components/AdminHeader";
import SearchInput from "./../../components/SearchInput/index";
import AddButton from "./../../components/AddButton/index";
import StudentManagementTable from "./StudentManagementTable/index";
import StudentManagementPopup from "./StudentManagementPopup/index";
import showAlert from "../../utils/showAlert";
import appServices from "../../api/appServices";

function Dashboard() {
  const findRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [popUpData, setPopUpData] = useState({
    isShowPopUp: false,
    isEditMode: false,
    data: {},
  });

  const [tableData, setTableData] = useState([
    {
      id: 10001,
      email: "mike@gmail.com",
      course: "Computer Science",
    },
    {
      id: 10002,
      email: "tracy@gmail.com",
      course: "Commerce",
    },
  ]);

  const [filterData, setFilterData] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getStudentList();
  }, []);

  const getStudentList = async () => {
    try {
      const response = await appServices.getStudentsList();
      console.log("response===", response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const addButtonHandle = () => {
    const popUpDataCopy = cloneDeep(popUpData);
    popUpDataCopy.isShowPopUp = true;
    popUpDataCopy.isEditMode = false;
    popUpDataCopy.data = {};
    setPopUpData(popUpDataCopy);
  };

  const onChangeHandler = (value) => {
    setSearchKey(value);

    const filterDataCopy = tableData.filter((el) => el.email.includes(value));
    setFilterData(filterDataCopy);
  };

  const closePopup = () => {
    const popUpDataCopy = cloneDeep(popUpData);
    popUpDataCopy.isShowPopUp = false;
    popUpDataCopy.isEditMode = false;
    popUpDataCopy.data = {};
    setPopUpData(popUpDataCopy);
  };

  const editHandler = (item) => () => {
    const popUpDataCopy = cloneDeep(popUpData);
    popUpDataCopy.isShowPopUp = true;
    popUpDataCopy.isEditMode = true;
    popUpDataCopy.data = { ...item };
    setPopUpData(popUpDataCopy);
  };

  const deleteHandler = (item) => () => {
    const index = findIndex(tableData, ["id", item.id]);
    const tableDataCopy = cloneDeep(tableData);
    tableDataCopy.splice(index, 1);
    setTableData(tableDataCopy);
    showAlert("Deleted successfully!", "success");
  };

  const deleteStudent = async (id) => {
    try {
      const response = await appServices.deleteStudent(id);
    } catch (error) {}
  };

  return (
    <>
      <AdminHeader />
      <div className="container usermanagment">
        <div className="page-header">
          <div className="page-header___right">
            <SearchInput
              onChange={onChangeHandler}
              value={searchKey}
              inputRef={findRef}
              placeholder="Search for emails"
            />
            <AddButton onClickHandle={addButtonHandle} />
          </div>
          {/* {loader ? (
            "loading"
          ) : (
            <Pagination
              filter={filter}
              setFilter={setFilter}
              navigation={navigation}
            />
          )} */}
        </div>
        <StudentManagementTable
          loader={loader}
          setLoader={setLoader}
          tableData={searchKey ? filterData : tableData}
          popUpData={popUpData}
          setPopUpData={setPopUpData}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
        {popUpData.isShowPopUp && (
          <StudentManagementPopup
            setLoader={setLoader}
            popUpData={popUpData}
            tableData={tableData}
            setTableData={setTableData}
            closePopup={closePopup}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
