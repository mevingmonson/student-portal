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
      _id: 1,
      firstname: "",
      lastname: "",
    },
  ]);

  const [filterData, setFilterData] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getStudentList();
  }, []);

  const getStudentList = async () => {
    try {
      setLoader(true);
      const response = await appServices.getStudentsList();
      setLoader(false);
      setTableData(response || []);
      console.log("response===", response);
    } catch (error) {
      setLoader(false);
      console.log(error);
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

    const filterDataCopy = tableData.filter((el) => {
      if (el.firstname.includes(value) || el.lastname.includes(value))
        return el;
    });
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
    deleteStudent(item._id);
  };

  const deleteStudent = async (id) => {
    try {
      setLoader(true);
      const response = await appServices.deleteStudent(id);
      getStudentList();
      showAlert("Deleted successfully!", "success");
    } catch (error) {
      setLoader(false);
    }
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
            getStudentList={getStudentList}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
