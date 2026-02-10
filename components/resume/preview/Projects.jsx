'use client'
import React from "react";

const Projects = ({ resumeInfo }) => {
  return (
    <div className="my-8">
      {/* Section Title */}
      <h2 className="text-center font-semibold text-xl text-gray-800 mb-4">
        Projects
      </h2>

      {/* Divider */}
      <hr className="border-gray-300 mb-4" />

      {/* Project Entries */}
      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className="mb-6">
          <h3 className="font-semibold text-lg text-gray-800">{project.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            {project.link}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Projects;
