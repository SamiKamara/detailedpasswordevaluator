"use client";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");

  const getPasswordLengthFeedback = (password: string): string => {
    const length = password.length;
    if (length < 5) {
      return `Too short (${length} characters)`;
    } else if (length <= 10) {
      return `Medium length (${length} characters)`;
    } else {
      return `Good length (${length} characters)`;
    }
  };

  const getPasswordNumberFeedback = (password: string): string => {
    const numberCount = (password.match(/\d/g) || []).length;
    if (numberCount === 0) {
      return "No numbers: Poor";
    } else if (numberCount < 3) {
      return "Contains numbers: Medium";
    } else {
      return "Multiple numbers: Excellent";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-6">
        <p className="text-lg text-gray-700 text-center max-w-md">
          This is a password strength evaluation system. Enter your candidate password below to get an assessment.
        </p>
        <input
          type="text"
          placeholder="Password candidate..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="h-12 mt-4 flex flex-col items-center space-y-2">
        {password && (
          <>
            <p className="text-sm text-gray-600 text-center">
              <br />
              Feedback: 
              <br />
              <br /> 
              {getPasswordLengthFeedback(password)}
            </p>
            <p className="text-sm text-gray-600 text-center">
              {getPasswordNumberFeedback(password)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
