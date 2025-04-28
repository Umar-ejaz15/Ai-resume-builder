import React from "react";

const Skills = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      {/* Section Title */}
      <h2 className="text-center font-semibold text-xl text-gray-800 mb-4">
        Skills
      </h2>

      {/* Divider */}
      <hr className="border-gray-300 mb-4" />

      <div className="grid grid-cols-2 gap-4">
        {/* Languages */}
        {resumeInfo?.skills?.languages && (
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Languages</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {resumeInfo.skills.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Frameworks */}
        {resumeInfo?.skills?.frameworks && (
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Frameworks</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {resumeInfo.skills.frameworks.map((framework, index) => (
                <li key={index}>{framework}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Databases */}
        {resumeInfo?.skills?.databases && (
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Databases</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {resumeInfo.skills.databases.map((database, index) => (
                <li key={index}>{database}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tools */}
        {resumeInfo?.skills?.tools && (
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Tools</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
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
