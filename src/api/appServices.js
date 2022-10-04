import axios from "../utils/axiosClient";
import endpoints from "./endpoints";

const { get, post, delete: deleteAxios, put } = axios;

const { studentsList, student, studentDelete, studentUpdate } = endpoints;

const getStudentsList = async () => {
  try {
    const response = await get(studentsList);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getStudent = async (id) => {
  try {
    const response = await get(`${student}/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const addStudent = async (payload) => {
  try {
    const response = await post(student, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

const deleteStudent = async (id) => {
  try {
    const response = await deleteAxios(`${studentDelete}/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const updateStudent = async (payload) => {
  try {
    const response = await put(studentUpdate, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

const appServices = {
  getStudentsList,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent,
};
export default appServices;
