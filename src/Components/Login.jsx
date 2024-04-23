import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/features/authSlice";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Button from "./Header/Button";
import Input from "./Header/Input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const logIn = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      console.log("Login Session", session);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("userData from Login", userData);
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="mt-4 mb-4 flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold leading-tight">
          SignIn to your Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account &nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            SignUp
          </Link>
        </p>
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
        {/* form */}
        <form onSubmit={handleSubmit(logIn)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                    "Email address must be a valid email",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter Your Password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              SignIn
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
