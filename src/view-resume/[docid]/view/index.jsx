import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResumeContext } from "@/context/ResumeContext";
import PreviewSection from "@/dashboard/resume/[resumeId]/edit/components/PreviewSection";
import { useParams } from "react-router-dom";
import GlobelApi from "../../../../service/GlobelApi";
import Header from "@/components/ui/custom/Header";

const ViewAndDownloadResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const [isSharing, setIsSharing] = useState(false);
  const params = useParams();
  const { resumeId } = params;

  const getResumeInfo = () => {
    GlobelApi.readResumeData(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const handleDownload = () => {
    window.print();
  };
  
  
  const handleShare = async () => {
    if (!navigator.share) {
      alert("Web Share API is not supported in your browser.");
      return;
    }

    if (isSharing) return;

    try {
      setIsSharing(true);
      await navigator.share({
        title: resumeInfo?.tittle,
        text: "Hello Everyone, Check Out My Resume!",
        url: `http://localhost:5173/dashboard/resume/${resumeId}/view`,
      });
      console.log("Shared successfully!");
    } catch (error) {
      console.error("Sharing failed", error);
    } finally {
      setIsSharing(false);
    }
  };

  useEffect(() => {
    getResumeInfo();
  }, []);

  return (
    <ResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="skip-area" className="">
        <Header />
        
        <div className="flex-grow mt-10 flex flex-col items-center justify-center px-4">
          <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-3xl w-full text-center animate-fadeIn">
            <h2 className="text-4xl font-bold text-purple-600 mb-6">
              🎉 Congrats! Your AI-Generated Resume is Ready!
            </h2>
            <p className="text-lg text-purple-400 mb-10">
              Share your professional journey with the world!
            </p>

            <div className="flex justify-center gap-6 mb-10">
              <Button
                onClick={handleDownload}
                variant={"outline"}
                className="border-purple-500 text-purple-600 hover:bg-purple-100 transition-all duration-300 font-semibold"
              >
                📥 Download
              </Button>
              <Button
                onClick={handleShare}
                disabled={isSharing}
                className="bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 font-semibold"
              >
                {isSharing ? "Sharing..." : "📤 Share"}
              </Button>
            </div>

            <p className="text-sm text-gray-400">
              Proudly generated with 💜 AI Magic
            </p>
          </div>

         
        </div>
      </div>
      <div id="print-area" className="">
            <PreviewSection />
          </div>
    </ResumeContext.Provider>
  );
};

export default ViewAndDownloadResume;
