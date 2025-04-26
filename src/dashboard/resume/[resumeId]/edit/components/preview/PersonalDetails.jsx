import { ResumeContext } from "@/context/ResumeContext";
import React, { useContext } from "react";

const PersonalDetails = ({ resumeInfo }) => {
  console.log(resumeInfo);

  const borderColor = resumeInfo?.colorTheme?.primary || "#D70040";
  const textColor = resumeInfo?.colorTheme?.primary || "#D70040";
  const backgroundColor = resumeInfo?.colorTheme?.primary || "#D70040";
  return (
    <div>
      <h2
        style={{ color: textColor }}
        className="font-bold text-xl text-center"
      >
        {resumeInfo?.name || ""}
      </h2>
      <h3 className="font-medium text-sm text-center">
        {resumeInfo?.title || ""}
      </h3>
      <p className="text-center font-normal text-xs">{resumeInfo?.location}</p>
      <div className="flex justify-between">
        <p className="font-normal text-xs" style={{ color: textColor }}>
          {resumeInfo?.email || ""}
        </p>
        <p className="font-normal text-xs" style={{ color: textColor }}>
          {resumeInfo?.phone || ""}
        </p>
      </div>
      <hr
        style={{ borderColor: borderColor }}
        className="border-[1.5px] my-2"
      />
     
    </div>
  );
};

export default PersonalDetails;
