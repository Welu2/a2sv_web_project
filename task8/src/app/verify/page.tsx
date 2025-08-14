"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
console.log(email);
  // Store OTP digits individually for styling + control
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Count down timer for resend
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle input change and focus next box
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // allow digits only

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);

    // Focus next input if filled
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => d === "")) {
      setError("Please enter all 4 digits");
      return;
    }

    setError("");
    try {
      await axios.post("https://akil-backend.onrender.com/verify-email", {
        email,
        OTP: otp.join(""),
      });
      router.push("/signin");
    } catch (err: any) {
      setError("Verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col items-center"
      >
        <h2 className="text-4xl font-bold mb-10">Verify Email</h2>
        <p className="text-gray-500 text-justify  text-sm mb-12 px-10">
          We've sent a verification code to the email address you provided. To
          complete the verification process, please enter the code here.
        </p>

        <div className="flex gap-4 mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              className={`w-16 h-16 text-3xl text-center rounded border ${
                digit
                  ? "border-blue-500 text-blue-700"
                  : "border-gray-300 text-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              style={{ userSelect: "none" }}
            />
          ))}
        </div>

        <p className="text-gray-500 mb-6">
          You can request to Resend code in{" "}
          <span className="font-mono">{`0:${timer
            .toString()
            .padStart(2, "0")}`}</span>
        </p>

        <button
          type="submit"
          disabled={otp.some((d) => d === "")}
          className={`w-[304px] py-3 rounded-full text-white font-semibold transition-colors ${
            otp.some((d) => d === "")
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          Continue
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default VerifyEmail;
