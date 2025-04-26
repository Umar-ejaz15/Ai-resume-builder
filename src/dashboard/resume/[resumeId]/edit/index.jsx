import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "./components/FormSection";
import PreviewSection from "./components/PreviewSection";
import { ResumeContext } from "@/context/ResumeContext";
import Dummy from "@/data/Dummy";
import GlobelApi from "../../../../../service/GlobelApi";

const EditResume = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    getResumeData();
  }, []);
  const getResumeData = () => {
    GlobelApi.readResumeData(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
      console.log(setResumeInfo(resp.data.data));
    });
  };

  return (
    <ResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="overflow-y-auto h-screen sticky top-0">
          <FormSection />
        </div>
        <PreviewSection />
      </div>
    </ResumeContext.Provider>
  );
};

export default EditResume;
