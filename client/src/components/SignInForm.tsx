import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate input fields dynamically
    if (name === "email" && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    } else if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    if (name === "password" && !validatePassword(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters.",
      }));
    } else if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null); // Clear previous API errors

    // Final validation before submission
    if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      return;
    }
    if (!validatePassword(formData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters.",
      }));
      return;
    }

    try {
      const response = await axios.post(`${config.baseURL}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });
      const { access_token } = response.data;
      Cookies.set("token", access_token);
      toast.success("Login successful!");
      navigate("/home");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || "An error occurred.";
        setApiError(errorMessage);
        toast.error(errorMessage);
      } else {
        setApiError("An unknown error occurred.");
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {apiError && (
            <div className="text-red-500 text-sm mt-2">{apiError}</div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
