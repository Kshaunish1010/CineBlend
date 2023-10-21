import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { useDispatch } from "react-redux";
import { googleSignIn } from "../store/authSlice";
import { toggle } from "../store/toggleSlice";
import Google from "../img/google.png";
const LoginPage = () => {
  const dispatch = useDispatch();

  const allDispatch = (users) => {
    dispatch({
      type: "setLoggedInLoggedOut",
      payload: true,
    });
    dispatch({
      type: "setEmail",
      payload: users.email,
    });
    dispatch({
      type: "setPhoneNumber",
      payload: users.mobile,
    });
    dispatch({
      type: "setFirstName",
      payload: users.firstName,
    });
    dispatch({
      type: "setLastName",
      payload: users.lastName,
    });
    dispatch({
      type: "setUsername",
      payload: users.username,
    });
    dispatch({
      type: "setPassword",
      payload: users.password,
    });
    dispatch({
      type: "setBirthday",
      payload: users.birthday,
    });
    dispatch({
      type: "setGender",
      payload: users.gender,
    });
    dispatch({
      type: "setMember",
      payload: users.member,
    });
    dispatch(toggle(false));
    navigate("/home");
  };

  function makeGlobal() {
    if (loginMethod === "emailPassword") {
      const emailUser = userData.find(
        (u) => u.email === email && u.password === password
      );
      allDispatch(emailUser);
    } else {
      const mobileUser = userData.find((u) => u.mobile === mobile);
      allDispatch(mobileUser);
    }
  }
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    onAuthStateChanged(auth, (currentUser) => {
      navigate("/home");
      dispatch(googleSignIn(currentUser.displayName));
      dispatch(toggle(true));
    });
  };
  const [loginMethod, setLoginMethod] = useState("emailPassword");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [userData, setUsersData] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const getUsers = async () => {
    await fetch("http://localhost:5000/api/getAllUsers", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error retrieving data");
        }
      })
      .then((data) => {
        setUsersData(data);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleLogin = () => {
    let flag = true;
    if (loginMethod === "emailPassword") {
      userData.map((users) => {
        if (users.email === email && users.password === password) {
          flag = false;
          const newUserString = JSON.stringify(users);
          // Update the "user" key in local storage with the new data
          localStorage.setItem("user", newUserString);
        }
      });
      if (flag) {
        alert("Not Logged In");
      } else {
        makeGlobal();
      }
    } else {
    }
  };
  const toggleNewUser = () => {
    navigate("/register");
  };

  const isUserPresent = (userData) => {
    const user = userData.find((u) => u.mobile === mobile);
    if (typeof user === "undefined") {
      return false;
    }
    return true;
  };
  const sendOTP = async () => {
    if (isUserPresent(userData)) {
      const number = "+91".concat(mobile);
      await fetch("http://localhost:5000/api/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      })
        .then((response) => response.json())
        .then((data) => {
          setOtpSent(true);
        })
        .catch((error) => {
          alert("Failed to send OTP");
        });
    } else {
      alert("User Not Registered");
    }
  };

  const verifyOTP = async () => {
    const number = "+91".concat(mobile);
    await fetch("http://localhost:5000/api/verifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number: number, otp: otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          makeGlobal();
        } else {
          alert(`Invalid OTP`);
          setOtp("");
          navigate("/");
        }
      })
      .catch((error) => {
        alert("OTP verification failed" + error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className="w-full md:w-1/2 flex-shrink-0 bg-cover bg-center animate-fade-in"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60")',
          minHeight: "300px",
        }}
      ></div>

      <div
        className="w-full md:w-1/2 md:h-full flex flex-col justify-center items-center min-h-screen"
        style={{
          backgroundImage:
            'url("https://www.filmibeat.com/img/2021/12/netflix11-1639468647.jpg")',
          minHeight: "100vh",
        }}
      >
        <div className="w-4/5 p-8 rounded-lg animate-fade-in">
          <p className="text-white mb-2 text-4xl font-bold text-center">
            <span className="font-semibold text-neutral-50 animate-pulse text-5xl">
              Unlimited
            </span>{" "}
            movies, TV shows, and more.
          </p>
          <br />
          <h1 className="text-5xl font-extrabold mb-6 text-white text-center">
            Sign In
          </h1>
          <div className="m-4">
            <div className="flex justify-between mb-4 h-full">
              {loginMethod !== "emailPassword" ? (
                <button
                  className={`px-4 py-2 text-xl font-extrabold transition-colors duration-300 ${
                    loginMethod === "emailPassword"
                      ? "text-white"
                      : "text-orange-50 hover:text-red-600"
                  }`}
                  onClick={() => setLoginMethod("emailPassword")}
                >
                  Login with Password
                </button>
              ) : (
                <button
                  className={`px-4 py-2 text-xl font-extrabold transition-colors duration-300 ${
                    loginMethod === "mobileOTP"
                      ? "text-white"
                      : "text-white hover:text-red-600"
                  }`}
                  onClick={() => setLoginMethod("mobileOTP")}
                >
                  Login with Mobile OTP
                </button>
              )}
            </div>
            {loginMethod === "emailPassword" && (
              <>
                <input
                  type="email"
                  className="w-full px-4 py-4 mb-6 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full px-4 py-4 mb-6 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="w-full py-3 bg-red-600 text-xl font-extrabold text-white rounded hover:bg-red-700"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
                <button
                  className="w-full my-2 py-3 bg-white text-xl font-extrabold text-black rounded hover:bg-blue-300 flex items-center justify-center"
                  onClick={handleGoogleLogin}
                >
                  <img
                    className="w-8 h-8 mr-2"
                    src={Google}
                    alt="Google logo"
                  />
                  Sign In
                </button>
              </>
            )}
            {loginMethod === "mobileOTP" && (
              <>
                {otpSent ? (
                  <>
                    <input
                      type="number"
                      className="w-full px-4 py-4 mb-6 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                      placeholder="Enter OTP Sent"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                      className="w-full py-3 bg-red-600 text-white text-xl font-extrabold rounded hover:bg-red-700"
                      onClick={() => {
                        verifyOTP();
                      }}
                    >
                      Veify OTP
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="tel"
                      className="w-full px-4 py-4 mb-6 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    <button
                      className="w-full py-3 bg-red-600 text-white text-xl font-extrabold rounded hover:bg-red-700"
                      onClick={() => {
                        sendOTP();
                      }}
                    >
                      Send OTP
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          <p className="mt-4 text-xl font-extrabold text-white">
            "New to Netflix?
            <span
              className="text-xl font-extrabold text-white cursor-pointer"
              onClick={toggleNewUser}
            >
              Sign up now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
