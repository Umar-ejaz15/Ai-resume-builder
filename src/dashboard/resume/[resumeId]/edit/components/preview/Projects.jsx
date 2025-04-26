import React from "react";

const Projects = ({ resumeInfo }) => {
  const borderColor = resumeInfo?.colorTheme?.primary || "#D70040";
  const textColor = resumeInfo?.colorTheme?.primary || "#D70040";
  return (
    <div className="mt-6">
      <h1
        className="text-center font-bold text-sm mb-2"
        style={{ color: textColor}}
      >
        Projects{" "}
      </h1>
      <hr style={{ borderColor: borderColor}} />
      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className="mt-3">
          <h3 className="font-semibold text-base">{project.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block"
          >
            {project.link}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Projects;