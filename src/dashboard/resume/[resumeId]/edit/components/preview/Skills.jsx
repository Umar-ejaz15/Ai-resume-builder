import React from "react";

const Skills = ({ resumeInfo }) => {
  const borderColor = resumeInfo?.colorTheme?.primary || "#D70040";
  const textColor = resumeInfo?.colorTheme?.primary || "#D70040";
  return (
    <div className="mt-6">
      <h1
        className="text-center font-bold text-sm mb-2"
        style={{ color: textColor }}
      >
        Skills{" "}
      </h1>
      <hr style={{ borderColor: borderColor }} />
      <div className="grid grid-cols-2 gap-x-4">
        {resumeInfo?.skills?.languages && (
          <div className="mt-4">
            <h3
              className="font-semibold text-sm mb-1"
              style={{ color: textColor }}
            >
              Languages
            </h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {resumeInfo.skills.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
        )}
        {resumeInfo?.skills?.frameworks && (
          <div className="mt-4">
            <h3
              className="font-semibold text-sm mb-1"
              style={{ color: textColor }}
            >
              Frameworks
            </h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {resumeInfo.skills.frameworks.map((framework, index) => (
                <li key={index}>{framework}</li>
              ))}
            </ul>
          </div>
        )}
        {resumeInfo?.skills?.databases && (
          <div className="mt-4">
            <h3
              className="font-semibold text-sm mb-1"
              style={{ color: textColor }}
            >
              Databases
            </h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {resumeInfo.skills.databases.map((database, index) => (
                <li key={index}>{database}</li>
              ))}
            </ul>
          </div>
        )}
        {resumeInfo?.skills?.tools && (
          <div className="mt-4">
            <h3
              className="font-semibold text-sm mb-1"
              style={{ color: textColor }}
            >
              Tools
            </h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {resumeInfo.skills.tools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
