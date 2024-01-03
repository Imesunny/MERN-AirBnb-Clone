import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import { Layout } from "./Layout";
import RegisterPage from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true; //to enable cookies

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/account/:subpage?" element={<AccountPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
