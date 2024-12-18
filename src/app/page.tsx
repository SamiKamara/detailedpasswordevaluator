"use client";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");

  const getPasswordLengthFeedback = (password: string): string => {
    const length = password.length;
    if (length < 5) {
      return `Length: ${length} characters (Poor)`;
    } else if (length <= 10) {
      return `Length: ${length} characters (Decent)`;
    } else {
      return `Length: ${length} characters (Strong)`;
    }
  };

  const getPasswordNumberFeedback = (password: string): string => {
    const numberCount = (password.match(/\d/g) || []).length;
    if (numberCount === 0) {
      return "Numbers: No numbers (Poor)";
    } else if (numberCount < 3) {
      return "Numbers: Contains numbers (Decent)";
    } else {
      return "Numbers: Multiple numbers (Strong)";
    }
  };

  const getPasswordUppercaseFeedback = (password: string): string => {
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    if (uppercaseCount === 0) {
      return "Letters: No uppercase (Poor)";
    } else if (uppercaseCount === 1) {
      return "Letters: One uppercase (Decent)";
    } else {
      return `Letters: Multiple uppercase (Strong)`;
    }
  };

  const calculateAverageScore = (password: string): { feedback: string; score: number } => {
    let totalScore = 0;

    const length = password.length;
    if (length < 5) {
      totalScore += 1;
    } else if (length <= 10) {
      totalScore += 2;
    } else {
      totalScore += 3;
    }

    const numberCount = (password.match(/\d/g) || []).length;
    if (numberCount === 0) {
      totalScore += 1;
    } else if (numberCount < 3) {
      totalScore += 2;
    } else {
      totalScore += 3;
    }

    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    if (uppercaseCount === 0) {
      totalScore += 1;
    } else if (uppercaseCount === 1) {
      totalScore += 2;
    } else {
      totalScore += 3;
    }

    const totalCriteria = 3;
    const averageScore = totalScore / totalCriteria;

    let feedback;
    if (averageScore < 1.5) {
      feedback = "Poor";
    } else if (averageScore < 2.5) {
      feedback = "Decent";
    } else {
      feedback = "Strong";
    }

    return { feedback: `Overall score: ${averageScore.toFixed(1)} (${feedback})`, score: averageScore };
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="/logo.svg"
        alt="Logo"
        className="w-64 h-64 mb-2 object-contain"
      />

      <div className="flex flex-col items-center space-y-6">
        <p className="text-lg text-gray-300 text-center mx-5 md:mx-0 max-w-md">
        Enter your candidate password below to get an assessment.
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
            <p className="text-sm text-gray-300 text-center">
              <br />
              Feedback:
            </p>
            <p className="text-sm text-gray-300 text-center">
              {(() => {
                const { feedback } = calculateAverageScore(password);
                return feedback;
              })()}
            </p>
            <p className="text-sm text-gray-300 text-center">
              {getPasswordLengthFeedback(password)}
            </p>
            <p className="text-sm text-gray-300 text-center">
              {getPasswordNumberFeedback(password)}
            </p>
            <p className="text-sm text-gray-300 text-center">
              {getPasswordUppercaseFeedback(password)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
