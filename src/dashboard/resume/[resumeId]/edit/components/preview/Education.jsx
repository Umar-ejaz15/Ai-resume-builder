import React from "react";

const Education = ({ resumeInfo }) => {
  const borderColor = resumeInfo?.colorTheme?.primary || "#D70040";
  const textColor = resumeInfo?.colorTheme?.primary || "#D70040";
  
  return (
    <div className="mt-6">
            <h1 className="text-center font-bold text-sm mb-2" style={{ color: textColor }}>
        Education{" "}
      </h1>
      <hr 
          style={{ borderColor: textColor }}
      />
      {resumeInfo?.education?.map((edu, index) => (
        <div key={index} className="mt-4">
          <h3 className="font-semibold text-base">{edu.institution}</h3>
          <p className="text-sm font-medium">{edu.degree}</p>
          <p className="text-xs text-gray-600">{edu.duration}</p>
          <p className="text-xs text-gray-600">{edu.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Education;