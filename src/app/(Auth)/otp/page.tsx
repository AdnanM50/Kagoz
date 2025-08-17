"use client";
import React, { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";

const VerifyOtp: React.FC = () => {
  const [success, setSuccess] = useState(false);

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen p-4">
      {!success ? (
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left side */}
          <div className="flex items-center justify-center p-8 bg-purple-50">
            <div className="text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-purple-100 mx-auto mb-6">
                <Mail className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
              <p className="text-gray-600 mb-4">
                We’ve sent a 6-digit verification code to your email address.
                Please enter it to continue.
              </p>
              <ul className="text-left space-y-2 text-gray-700">
                <li>✅ Secure password reset process</li>
                <li>✅ Link expires in 5 minutes</li>
                <li>✅ Quick and easy process</li>
              </ul>
            </div>
          </div>

          {/* Right side */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-4">Email Verification</h2>
            <p className="text-gray-600 mb-6">
              Enter the 6-digit OTP code sent to your email
            </p>

            <div className="flex gap-2 justify-between mb-6">
              {[1, 0, 5, 8, 6, 2].map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  defaultValue={digit}
                  maxLength={1}
                  className="w-12 h-12 text-center border rounded-lg text-xl font-semibold"
                />
              ))}
            </div>

            <button
              onClick={() => setSuccess(true)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              Verify OTP
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Resend code in <span className="text-purple-600">54s</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Success</h2>
          <p className="text-gray-600 mb-6">
            Your account has been successfully verified and created.
          </p>
          <a
            href="#"
            className="text-purple-600 font-semibold hover:underline"
          >
            Continue to business setup →
          </a>
        </div>
      )}
    </div>
  );
};

export default VerifyOtp;
