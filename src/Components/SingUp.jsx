import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appwrite/auth";
import Input from "./Header/Input";
import Button from "./Header/Button";
import { useForm } from "react-hook-form";
import { login } from "../store/features/authSlice";

const SingUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();

  const registerUser = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userInfo = await authService.getCurrentUser();
        if (userInfo) {
          console.log("user Info at register", userInfo);
          dispatch(login(userInfo));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Error at registration", error);
      setError(error.message);
    }
  };
  return (
    <div className="mt-5 mb-4 flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold leading-tight">SignUp</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account :
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            LogIn
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(registerUser)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter Your Name"
              {...register("name", { required: true })}
            />
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
              label="password"
              placeholder="Enter Your Password"
              type="password"
              {...register("password", { required: true })}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingUp;
