import { ToastContainer } from "react-toastify";
import RouteList from "./pages/Routes";
import "./App.css";
import "./global.styles.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <RouteList />
      <ToastContainer />
    </div>
  );
}

export default App;
