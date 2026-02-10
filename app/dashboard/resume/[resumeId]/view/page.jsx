'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResumeContext } from "@/context/ResumeContext";
import PreviewSection from "@/components/resume/preview/PreviewSection";
import { useParams } from "next/navigation";
import resumeApi from "@/services/resumeApi";
import Header from "@/components/Header";
import { Download } from "lucide-react";

export default function ViewAndDownloadResumePage() {
  const [resumeInfo, setResumeInfo] = useState();
  const params = useParams();
  const { resumeId } = params;

  const getResumeInfo = async () => {
    try {
      const resp = await resumeApi.readResumeData(resumeId);
      console.log(resp.data);
      setResumeInfo(resp.data);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  useEffect(() => {
    if (resumeId) {
      getResumeInfo();
    }
  }, [resumeId]);

  return (
    <ResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="skip-area" className="">
        <Header className="" />

        <div className="flex-grow min-h-screen bg-gradient-to-tr from-white via-zinc-50 to-white p-6 md:p-10 flex flex-col items-center justify-center">
          <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-6 md:p-10 max-w-3xl w-full text-center animate-fadeIn border border-zinc-200">
            <h2 className="text-3xl md:text-4xl font-extrabold text-purple-600 mb-4 tracking-tight">
              🎉 Congrats! Your AI-Generated Resume is Ready!
            </h2>
            <p className="text-base md:text-lg text-purple-500 mb-10">
              Share your professional journey with confidence!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center gap-2 border-purple-500 text-purple-600 hover:bg-purple-100 transition-all duration-300 font-semibold py-3 px-6 text-sm sm:text-base rounded-full shadow-sm hover:shadow-md"
              >
                <Download size={18} /> Download
              </Button>
            </div>

            <p className="text-xs text-zinc-400 tracking-wide">
              Proudly generated with 💜 AI Magic
            </p>
          </div>
        </div>
      </div>

      <div id="print-area">
        <PreviewSection />
      </div>
    </ResumeContext.Provider>
  );
}
