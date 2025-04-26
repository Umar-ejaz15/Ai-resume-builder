import React from "react";

const Certifications = ({ resumeInfo }) => {
  const borderColor = resumeInfo?.colorTheme?.primary || "#D70040";
  const textColor = resumeInfo?.colorTheme?.primary || "#D70040";
  return (
    <div className="mt-10">
      <h1
        className="text-center font-bold text-sm mb-2"
        style={{ color: textColor }}
      >
        Certificates{" "}
      </h1>
      <hr style={{ borderColor: borderColor }} />
      {resumeInfo?.certifications?.map((certification, index) => (
        <div key={index} className="mt-4">
          <h3 className="font-semibold text-sm">{certification.title}</h3>
          <p className="text-xs text-gray-600">
            {certification.issuer} - {certification.year}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Certifications;
