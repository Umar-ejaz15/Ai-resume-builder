'use client'
import { ResumeContext } from "@/context/ResumeContext";
import React, { useContext } from "react";
import PersonalDetails from "./PersonalDetails";
import Sumary from "./Sumary";
import WorkExprience from "./WorkExprience";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Certifications from "./Certifications";

const PreviewSection = () => {
  const { resumeInfo } = useContext(ResumeContext);

  const borderColor = resumeInfo?.colorTheme?.primary || "#D70040";

  return (
    <div
      id="preview"
      className="shadow-lg h-full p-6 md:p-10 border-t-[20px] border-gray-300"
      style={{ borderColor }}
    >
      {/* Personal Details */}
      <PersonalDetails resumeInfo={resumeInfo} />

      {/* Summary */}
      <Sumary resumeInfo={resumeInfo} />

      <Skills resumeInfo={resumeInfo} />
      {/* Work Experience */}
      <WorkExprience resumeInfo={resumeInfo} />

      {/* Skills */}
      <Projects resumeInfo={resumeInfo} />

      {/* Education */}
      <Education resumeInfo={resumeInfo} />

      {/* Projects */}

      {/* Certifications */}
      <Certifications resumeInfo={resumeInfo} />
    </div>
  );
};

export default PreviewSection;
