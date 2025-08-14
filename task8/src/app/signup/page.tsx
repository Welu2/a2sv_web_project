"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputForm from "../components/InputForm";
import { FcGoogle } from "react-icons/fc"; 

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear old error
    setError("");

    // Simple client-side checks
    if (!form.name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("https://akil-backend.onrender.com/signup", form);
      router.push(`/verify?email=${encodeURIComponent(form.email)}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Sign Up Today!</h2>

      {/* Google Sign Up Box */}
      <div className="flex items-center justify-center gap-3 border border-gray-300 rounded px-4 py-2 mb-6 cursor-pointer hover:shadow transition">
        <FcGoogle className="w-4 h-4" />
        <span className="text-blue-600 font-medium">Sign Up with Google</span>
      </div>

      {/* Divider */}
      <div className="flex items-center mb-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm">
          Or Sign Up with Email
        </span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <InputForm
        id="name"
        label="Full Name"
        type="text"
        value={form.name}
        onChange={handleChange}
      />

      <InputForm
        id="email"
        label="Email Address"
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

      <InputForm
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <button
        type="submit"
        className="bg-[#2d298e] text-white p-3 rounded-full w-full hover:bg-blue-600 transition"
      >
        Continue
      </button>
      {/* Already have an account */}
      <div className="text-justify mt-4">
        <p className="text-gray-500">
          Already have an account?{" "}
          <a href="/signin" className=" text-[#2d298e] font-semibold">
            Login
          </a>
        </p>
      </div>

      {/* Disclaimer */}
      <p className=" text-justify text-xs text-gray-500  mt-7 ">
        By clicking 'Continue', you acknowledge that you have read and accepted
        our <span className="underline cursor-pointer">Terms of Service</span>{" "}
        and <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </form>
  );
};

export default Signup;
