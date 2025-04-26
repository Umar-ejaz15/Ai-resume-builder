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
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* Form Section */}
        <div className="h-full sm:fixed sm:top-0 sm:left-0 sm:w-full sm:z-10 md:sticky md:top-0 md:min-h-screen ">
          <FormSection />
        </div>

        {/* Preview Section */}
        <div className="md:pl-6 mt-4 md:mt-0 sm:mt-20 sm:h-full sm:pl-0">
          <PreviewSection />
        </div>
      </div>
    </ResumeContext.Provider>
  );
};

export default EditResume;
