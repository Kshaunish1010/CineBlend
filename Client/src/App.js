import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MovieSearch from "./pages/MovieSearch";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MyAccount from "./pages/MyAccount";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import LoginWithOTP from "./pages/LoginWithOTP";
function App() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const toggle = useSelector((state) => state.toggle.googleLogin);

  const { isLoggedin } = useSelector((state) => state.customReducer);
  useEffect(() => {
    if (user === null || isLoggedin) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, []);
  return (
    <div className="w-full h-full">
      <main>
        {user || isLoggedin ? (
          <div className="w-full z-50">
            <Navbar />{" "}
          </div>
        ) : (
          <></>
        )}
      </main>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginwithotp" element={<LoginWithOTP />}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/home/moviesSearch" element={<MovieSearch />} />
        <Route path="/home/browse" element={<Browse />} />
        <Route path="/home/myAccount" element={<MyAccount />} />
      </Routes>
    </div>
  );
}

export default App;
