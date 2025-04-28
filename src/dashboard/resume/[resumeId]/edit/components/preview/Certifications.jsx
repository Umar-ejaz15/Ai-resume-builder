import React from "react";

const Certifications = ({ resumeInfo }) => {
  return (
    <div className="my-8">
      {/* Section Title */}
      <h2 className="text-center font-semibold text-xl text-gray-800 mb-4">
        Certifications
      </h2>

      {/* Divider */}
      <hr className="border-gray-300 mb-4" />

      {resumeInfo?.certifications?.map((certification, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold text-lg text-gray-800">{certification.title}</h3>
          <p className="text-xs text-gray-600">
            {certification.issuer} — {certification.year}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Certifications;
