import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../../Validate";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const { name, username, password } = formData;
  const navigate = useNavigate();

  const [error, setError] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate({ name, username, password });

    if (Object.keys(validationError).length > 0) {
      return setError(validationError);
    } else {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/auth/register",
          { name, username, password }
        );

        localStorage.setItem("token", res.data.token);
        console.log(res.data);
        navigate("/login");
      } catch (error) {
        setError("Invalid username or password");
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-tr from-black to-slate-700 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {error && (
                <p className="text-red-600 font-semibold">{error.name}</p>
              )}
            </div>

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
              {error && (
                <p className="text-red-600 font-semibold">{error.username}</p>
              )}
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
              {error && (
                <p className="text-red-600 font-semibold">{error.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 my-2"
            >
              Sign Up
            </button>
            <p className="text-center text-gray-600 mt-4">
              Already a User ?{" "}
              <Link to="/" className="hover:text-blue-700 font-semibold">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
