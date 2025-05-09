import { ResumeContext } from "@/context/ResumeContext";
import React, { useContext } from "react";
import PersonalDetails from "./preview/PersonalDetails";
import Sumary from "./preview/Sumary";
import WorkExprience from "./preview/WorkExprience";
import Education from "./preview/Education";
import Skills from "./preview/Skills";
import Projects from "./preview/Projects";
import Certifications from "./preview/Certifications";

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
