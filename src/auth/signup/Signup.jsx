import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <SignIn/>
    </div>
  );
};

export default Signup;