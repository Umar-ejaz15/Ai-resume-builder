'use client'
import React from "react";

const WorkExperience = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      {/* Work Experience Section */}
      <h3 className="font-semibold text-2xl text-gray-800 mb-4 text-center">
        Work Experience
      </h3>
      <hr className="border-gray-300 my-4" />
      
      {/* Experience List */}
      {resumeInfo?.experience?.map((exp, index) => (
        <div key={index} className="mb-6">
          {/* Role and Duration */}
          <div className="flex justify-between">
            <h4 className="font-semibold text-lg text-gray-800">
              {exp.role}
            </h4>
            <span className="text-sm text-gray-600">{exp.duration}</span>
          </div>
          
          {/* Company and Location */}
          <p className="text-sm text-gray-700">
            {exp.company} — {exp.location}
          </p>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mt-2">{exp.description}</p>

          {/* Divider */}
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;
