import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as reduxLogin } from "../../store/features/authSlice.js";
import { Input, Button, Logo } from "../index.js";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //here register handles some values and handlesubmit calls the function which will be called when form is submitted
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  //here data of form is automatically taken with the help of handlesubmit and passed in the below function
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(reduxLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              //this register must have first argument as id, and this id should be unique for every input field
              {...register("email", {
                //this means this field is necessary
                required: true,
                //here we are comparing the value present in this input field with the regexr pattern obtained from regexr.com, to check whether this is a valid email or not
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || //if matching fails then this message will be shown
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button children="Sign in" type="submit" className="w-full"/>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;