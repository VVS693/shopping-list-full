import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { UserAccount } from "./pages/UserAccount";
import { fetchUserMe } from "./store/reducers/actionUserCreators";

function App() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { isLoading } = useAppSelector((state) => state.itemsReducer);

  useEffect(() => {
    dispatch(fetchUserMe());
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <Routes>
      <Route path="/login" element={!isLoading && <Login />} />
      <Route path="/useraccount" element={<UserAccount />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
