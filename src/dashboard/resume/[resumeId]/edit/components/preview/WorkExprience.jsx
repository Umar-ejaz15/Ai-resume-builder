import React from "react";

const WorkExprience = ({ resumeInfo }) => {
  const borderColor = resumeInfo?.colorTheme?.primary || "#D70040";
  const textColor = resumeInfo?.colorTheme?.primary || "#D70040";
  return (
    <div>
      {/* Experience Section */}
      <div className="mt-4">
        <h3
          style={{ color: textColor }}
          className="font-semibold text-center text-lg mb-2"
        >
          Work Experience
        </h3>

        <hr
          style={{ borderColor: borderColor }}
          className="border-[1.5px] my-2"
        />
        {resumeInfo?.experience?.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <h4 style={{ color: textColor }} className="font-bold text-base">
                {exp.role}
              </h4>
              <span className="text-xs">{exp.duration}</span>
            </div>
            <p className="text-sm font-medium">
              {exp.company} — {exp.location}
            </p>
            <p className="text-xs mt-1">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExprience;
