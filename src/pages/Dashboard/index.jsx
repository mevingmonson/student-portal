import React, { useEffect, useRef, useState } from "react";
import { cloneDeep } from "lodash";

import "./style.scss";
import AdminHeader from "../../components/AdminHeader";
import SearchInput from "./../../components/SearchInput/index";
import AddButton from "./../../components/AddButton/index";
import StudentManagementTable from "./StudentManagementTable/index";
import StudentManagementPopup from "./StudentManagementPopup/index";

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
  const [filter, setFilter] = useState({
    searchKey: "",
  });

  const addButtonHandle = () => {
    const popUpDataCopy = cloneDeep(popUpData);
    popUpDataCopy.isShowPopUp = true;
    popUpDataCopy.isEditMode = false;
    popUpDataCopy.data = {};
    setPopUpData(popUpDataCopy);
  };

  const onChangeHandler = (key) => (value) => {
    const filterCopy = cloneDeep(filter);
    if (key === "searchKey") {
      filterCopy.searchKey = value;
      filterCopy.currentPage = 1;
      setFilter(filterCopy);
    }
  };

  const closePopup = () => {
    const popUpDataCopy = cloneDeep(popUpData);
    popUpDataCopy.isShowPopUp = false;
    popUpDataCopy.isEditMode = false;
    popUpDataCopy.data = {};
    setPopUpData(popUpDataCopy);
  };

  return (
    <>
      <AdminHeader />
      <div className="container usermanagment">
        <div className="page-header">
          <div className="page-header___right">
            <SearchInput
              onChange={onChangeHandler("searchKey")}
              value={filter.searchKey}
              inputRef={findRef}
              placeholder="Search for accounts, emails ..."
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
          tableData={tableData}
          setTableData={setTableData}
          popUpData={popUpData}
          setPopUpData={setPopUpData}
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
