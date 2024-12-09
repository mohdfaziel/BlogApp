import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as reduxLogin } from "../../store/features/authSlice.js";
import { Input, Button, Logo } from "../index.js";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import { ldr } from "../../assets/images.js";
import Loader from "./Loader.jsx";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use react-hook-form for validation and handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  // Login function: Handle submission and errors
  const login = async (data) => {
    setError(""); // Clear previous error states
    try {
      // Handle successful login
      setLoader(true);
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(reduxLogin(userData));
          toast.success("Login Successful!");
          reset(); // Reset form inputs
          navigate("/"); // Navigate to home
        }
      }
    } catch (err) {
      // Handle any errors during login
      toast.error("Invalid email or password");
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex items-center h-screen justify-center w-full">
      <div className="min-h-[29rem] w-[30%] flex flex-col justify-center bg-gray-100 rounded-xl px-5 py-3 border border-black/10">
        {loader ? (
          <Loader/>
        ) : (
          <>
            <div className="mb-2 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
              </span>
            </div>

            {/* Title */}
            <h2 className="text-center text-2xl font-bold leading-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Don&apos;t have an account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>

            {/* Display general error */}
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

            {/* Form */}
            <form onSubmit={handleSubmit(login)} className="mt-8">
              <div className="space-y-5">
                {/* Email Input */}
                <div>
                  <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      validate: {
                        matchPattern: (value) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            value
                          ) || "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button children="Sign in" type="submit" className="w-full" />
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
