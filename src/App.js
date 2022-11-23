import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import { client } from "./apolloClient/client";
import RouteList from "./pages/Routes";
import "./App.css";
import "./global.styles.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RouteList />
        <ToastContainer />
      </div>
    </ApolloProvider>
  );
}

export default App;
