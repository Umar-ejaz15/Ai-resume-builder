import React from "react";

const Education = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      {/* Section Title */}
      <h2 className="text-center font-semibold text-xl text-gray-800 mb-4">
        Education
      </h2>

      {/* Divider */}
      <hr className="border-gray-300 mb-4" />

      {resumeInfo?.education?.map((edu, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold text-lg text-gray-800">{edu.institution}</h3>
          <p className="text-sm font-medium text-gray-700">{edu.degree}</p>
          <p className="text-xs text-gray-600">{edu.duration}</p>
          <p className="text-xs text-gray-600">{edu.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Education;
