import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("Other");

  const handleNewUser = async () => {
    const selectedDate = new Date(birthday);

    const day = String(selectedDate.getDate()).padStart(2, "0");
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Note: Months are zero-based
    const year = selectedDate.getFullYear();

    const formattedDate = day + "/" + month + "/" + year;

    console.log(formattedDate);

    const dataSent = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      birthday: formattedDate,
      mobile: mobile,
      username: username,
      gender: gender,
    };
    if (password === confirmPassword) {
      try {
        const response = await fetch("http://localhost:5000/api/addNewUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSent),
        });

        if (response.ok) {
          navigate("/");
        } else {
          alert("Error adding User");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Passwords Are Not Matching!!");
    }
  };
  const toggleOldUser = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="w-full md:w-1/2 flex-shrink-0 bg-cover bg-center animate-fade-in"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60")',
          minHeight: "300px",
        }}
      ></div>

      <div
        className="w-full md:w-1/2 flex flex-col justify-center items-center h-full"
        style={{
          backgroundImage:
            'url("https://www.filmibeat.com/img/2021/12/netflix11-1639468647.jpg")',
          minHeight: "300px",
        }}
      >
        <div className="w-4/ p-8 rounded-lg animate-fade-in">
          <p className="text-white mb-2 text-4xl font-bold">
            <span className="font-semibold text-neutral-50 animate-pulse text-5xl">
              Unlimited
            </span>{" "}
            movies, TV shows, and more.
          </p>
          <br />
          <h1 className="text-5xl font-extrabold mb-6 text-white text-center">
            Sign Up
          </h1>
          <form className="max-w-lg mx-auto">
            <div className="m-4">
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Birthday
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Gender
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="other">Other</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full px-2 mb-4">
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-gray-100 text-xl font-extrabold rounded border focus:outline-none focus:border-red-600"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current text-white"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M19.293 5.293a1 1 0 00-1.414-1.414l-7 7a1 1 0 00-.002 1.417l7 7a1 1 0 001.415-1.415L12.414 12l6.879-6.879a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <button
              className="w-full py-3 bg-red-600 text-xl font-extrabold text-white rounded hover:bg-red-700"
              onClick={handleNewUser}
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-xl font-extrabold text-white">
            Already have an account?
            <span
              className="text-white cursor-pointer text-xl font-extrabold"
              onClick={toggleOldUser}
            >
              Sign in now.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
