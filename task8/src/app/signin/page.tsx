"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputForm from "../components/InputForm"; 

const SigninForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left half - can be empty or used for branding */}
      <div className="w-1/2 hidden md:block bg-white"></div>
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white "
        >
          <h2 className="text-3xl font-bold text-center mb-6">Welcome back,</h2>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-white text-sm">
              Login to your account
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email & Password */}
          <InputForm
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <InputForm
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          {error && <p className="text-red-600 mt-2 mb-4">{error}</p>}

          <button
            type="submit"
            className="bg-[#2d298e] text-white p-3 rounded-full w-full hover:bg-blue-700 transition mb-4"
          >
            Login
          </button>

          {/* Redirect to signup */}
          <p className="text-gray-500 text-justify text-sm">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#2d298e] font-semibold">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
