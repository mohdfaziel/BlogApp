import React, { useState } from "react";
import authService from "../../appwrite/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/features/authSlice.js";
import { Button, Input, Logo } from "../index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import { ldr, lgn } from "../../assets/images.js";
import Loader from "./Loader.jsx";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError(""); // Clear previous error states
    setLoader(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex h-screen px-4 items-center justify-center w-full">
      <div className="min-h-[33rem] w-full md:w-[30%] flex flex-col items-center justify-center bg-gray-100 rounded-xl px-5 py-3 border border-black/10">
        {loader ? (
          <Loader loader={lgn}/>
        ) : (
          <>
            <div className="mb-2 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">
              Sign up to create an account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>

            {/* Display general error */}
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)} className="w-full">
              <div className="space-y-5">
                {/* Full Name Input */}
                <div>
                  <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                      required: "Full Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

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
                          ) || "Email address must be a valid address",
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

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;
