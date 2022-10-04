import axios from "axios";
// import Cookies from "js-cookie";
import showAlert from "./showAlert";
import endpoints from "../api/endpoints";

// axios.defaults.baseURL = "https://api.example.com"; // api base url
// axios.defaults.baseURL = "20.244.22.67:12345/"; // api base url
axios.defaults.baseURL = "http://20.244.22.67:12345"; // api base url

axios.interceptors.request.use(
  (config) => {
    // const newConfig = config;
    // newConfig.headers["Access-Token"] = Cookies.get("AccessToken") || "";
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          showAlert("Internal Server Error!", "error");
          break;
        case 402:
          showAlert(error.response.data, "error");
          break;
        case 401:
          showAlert("Unauthorized!", "warning");
          // Cookies.set("AccessToken", "--", { expires: -1 });
          window.location.reload();
          break;
        case 404:
          showAlert("Something went wrong!", "error");
          break;
        case 403:
          showAlert("Access Forbidden!", "warning");
          break;
        case 400:
          if (!error.response.data) showAlert("Something went wrong!", "error");
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);

const axiosClient = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  all: axios.all,
  spread: axios.spread,
  interceptors: axios.interceptors,
  CancelToken: axios.CancelToken,
};

export default axiosClient;
