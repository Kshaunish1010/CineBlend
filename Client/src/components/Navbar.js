import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { googleSignOut } from "../store/authSlice";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons from React Icons library

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogOut = () => {
    dispatch({
      type: "setEmail",
      payload: "",
    });
    dispatch({
      type: "setPhoneNumber",
      payload: "",
    });
    dispatch({
      type: "setFirstName",
      payload: "",
    });
    dispatch({
      type: "setLastName",
      payload: "",
    });
    dispatch({
      type: "setUsername",
      payload: "",
    });
    dispatch({
      type: "setPassword",
      payload: "",
    });
    dispatch({
      type: "setBirthday",
      payload: "",
    });
    dispatch({
      type: "setGender",
      payload: "",
    });
    dispatch({
      type: "setMember",
      payload: "",
    });
    dispatch({
      type: "setLoggedInLoggedOut",
      payload: false,
    });
    localStorage.removeItem("user");
  };
  const toggle = useSelector((state) => state.toggle.googleLogin);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleClick = () => {
    let x;
    if (typeof toggle === "string" || toggle instanceof String) {
      x = toggle === "false" ? false : true;
    } else {
      x = toggle;
    }
    if (!x) navigate("/home/myAccount");
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const { username } = useSelector((state) => state.customReducer);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 w-full bg-gray-900">
      <div className="flex justify-between items-center w-full">
        <button
          className="text-white text-4xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          CINEBLEND
        </button>

        {/* Desktop menu */}
        <div
          className={`hidden md:flex space-x-4 ${
            isMobileMenuOpen ? "hidden" : ""
          }`}
        >
          <button
            className="text-white"
            onClick={() => {
              navigate("/home/moviesSearch");
            }}
          >
            Search
          </button>
          <button
            className="text-white"
            onClick={() => {
              navigate("/home/browse");
            }}
          >
            Browse
          </button>
          <button className="text-white" onClick={handleClick}>
            {username || user}
          </button>
          <button
            className="text-white"
            onClick={() => {
              if (toggle == "false" || toggle === false) {
                LogOut();
                localStorage.removeItem("user");
              } else {
                dispatch(googleSignOut());
              }
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          {isMobileMenuOpen ? (
            <button className="text-white" onClick={closeMobileMenu}>
              <FaTimes />
            </button>
          ) : (
            <button className="text-white" onClick={toggleMobileMenu}>
              <FaBars />
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden text-center">
          {/* Render mobile menu items in a column */}
          <div className="flex flex-col space-y-4 mt-2">
            <button
              className="text-white"
              onClick={() => {
                navigate("/home/moviesSearch");
              }}
            >
              Search
            </button>
            <button
              className="text-white"
              onClick={() => {
                navigate("/home/browse");
              }}
            >
              Browse
            </button>
            <button className="text-white" onClick={handleClick}>
              {username || user}
            </button>
            <button
              className="text-white"
              onClick={() => {
                if (toggle == "false" || toggle === false) {
                  LogOut();
                  localStorage.removeItem("user");
                } else {
                  dispatch(googleSignOut());
                }
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
