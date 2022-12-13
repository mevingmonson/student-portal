import { ToastContainer } from "react-toastify";
import RouteList from "./routes/Routes";
import "./App.css";
import "./global.styles.scss";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./provider/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouteList />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
