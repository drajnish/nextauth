"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [uemail, setUemail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailsent, setIsEmailsent] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      console.log("Before forgotPassword request: ", uemail);
      const response = await axios.post("/api/users/forgotPassword", {
        uemail,
      });
      console.log("After forgotPassword request: ", response);
      console.log("Forgot password email sent: ", response.data);
      setIsEmailsent(true);
      setUemail("");
    } catch (error: any) {
      console.log("Forgot password email failed: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uemail.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [uemail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-2xl">
        {loading ? "Processing" : "Forgot Password"}
      </h1>
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="uemail"
        value={uemail}
        onChange={(e) => setUemail(e.target.value)}
        placeholder="Enter your email"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSubmit}
        disabled={buttonDisabled}
      >
        Submit
      </button>
      {isEmailsent && (
        <h2>An email has been sent to your email id to reset your password</h2>
      )}
    </div>
  );
}
