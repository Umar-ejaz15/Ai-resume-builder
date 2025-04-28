import { ResumeContext } from "@/context/ResumeContext";
import React, { useContext } from "react";

const PersonalDetails = ({ resumeInfo }) => {
  console.log(resumeInfo);

  return (
    <div className="resume bg-white rounded-lg ">
      {/* Name */}
      <h2 className="font-semibold text-2xl md:text-3xl text-center">
        {resumeInfo?.name || "John Doe"}
      </h2>
      
      {/* Title */}
      <h3 className="font-medium text-sm text-center text-gray-700 md:text-lg mt-1">
        {resumeInfo?.title || "Software Engineer"}
      </h3>
      
      {/* Location */}
      <p className="text-center font-normal text-xs text-gray-500 mt-2">
        {resumeInfo?.location || "City, Country"}
      </p>
      
      {/* Contact Information (Email & Phone) */}
      <div className="flex justify-center space-x-6 mt-3">
        <p className="font-normal text-xs text-gray-600">
          {resumeInfo?.email || "email@example.com"}
        </p>
        <p className="font-normal text-xs text-gray-600">
          {resumeInfo?.phone || "+123 456 7890"}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-[1px] border-gray-200 my-4" />
    </div>
  );
};

export default PersonalDetails;
