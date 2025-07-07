"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [resetPwd, setResetPwd] = useState({
    password: "",
    confirmPwd: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSubmit = async () => {
    try {
      const response = await axios.post("/api/users/resetPassword", {
        ...resetPwd,
        token,
      });
      console.log("Password reset successfully", response);
      router.push("/login");
    } catch (error: any) {
      console.log("Password reset failed: ", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (resetPwd.password.length > 0 && resetPwd.confirmPwd.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [resetPwd]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-2xl">Reset Password</h1>
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={resetPwd.password}
        onChange={(e) => setResetPwd({ ...resetPwd, password: e.target.value })}
        placeholder="Enter your password"
      />
      <label htmlFor="confirmPwd">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="confirmPwd"
        value={resetPwd.confirmPwd}
        onChange={(e) =>
          setResetPwd({ ...resetPwd, confirmPwd: e.target.value })
        }
        placeholder="Confirm your password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSubmit}
        disabled={buttonDisabled}
      >
        Submit
      </button>
    </div>
  );
}
