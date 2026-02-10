'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FormSection from "@/components/resume/FormSection";
import PreviewSection from "@/components/resume/preview/PreviewSection";
import { ResumeContext } from "@/context/ResumeContext";
import resumeApi from "@/services/resumeApi";

export default function EditResumePage() {
  const params = useParams();
  const { resumeId } = params;
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    if (resumeId) {
      getResumeData();
    }
  }, [resumeId]);

  const getResumeData = async () => {
    try {
      const resp = await resumeApi.readResumeData(resumeId);
      console.log(resp.data);
      setResumeInfo(resp.data);
    } catch (error) {
      console.error("Error fetching resume data:", error);
    }
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
}
