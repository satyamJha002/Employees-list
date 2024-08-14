import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { username, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      console.log(res);
      setLoading(false);
      setTimeout(() => {
        <Spinner />;
      }, 3000);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-black to-slate-700 flex items-center justify-center min-h-screen shadow-md">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 my-2"
            >
              Log In
            </button>
            <p className="text-center text-gray-600 mt-4">
              New User ?{" "}
              <Link
                to="/register"
                className="hover:text-blue-700 font-semibold"
              >
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
