import axios from "axios";

import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { UserAccount } from "./pages/UserAccount";

export const client = axios.create({
  baseURL: "https://elated-warp-parrotfish.glitch.me/items",
  // baseURL: "https://sl.vvs693.ru:4000/items"
});

export const clientUser = axios.create({
  baseURL: "http://localhost:3001/avatars",
});

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/useraccount" element={<UserAccount />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
