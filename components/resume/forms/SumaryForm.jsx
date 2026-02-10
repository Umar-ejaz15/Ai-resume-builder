'use client'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeContext } from "@/context/ResumeContext";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import resumeApi from "@/services/resumeApi";
import { toast } from "sonner";
import { ChatWithAI } from "@/services/googleAI";

const SumaryForm = ({ onNextChange }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    onNextChange(false);
    if (resumeInfo?.summary) {
      setSummary(resumeInfo.summary);
    }
  }, [resumeInfo]);

  useEffect(() => {
    if (summary) {
      setResumeInfo((prev) => ({
        ...prev,
        summary: summary,
      }));
    }
  }, [summary, setResumeInfo]);

  const generateSummaryFromAI = async () => {
    try {
      setIsLoading(true);
      console.log(resumeInfo?.name, resumeInfo?.title);

      const prompt = `Generate a brief professional summary (2-3 sentences) for ${resumeInfo?.name} who works as a ${resumeInfo?.title}. Focus on their role and core expertise. dont use  my name start with I'm`;
      const dataForAI = {
        type: "appllication/json",
        prompt: prompt,
      };
      const result = await ChatWithAI(dataForAI);
      console.log(result);

      // Check if AI generation was successful
      if (!result || !result.candidates || !result.candidates[0]) {
        toast.error("AI service unavailable. Please write your summary manually or try again later.");
        return;
      }

      setSummary(result.candidates[0].content.parts[0].text);
      toast.success("Summary generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate summary. Please try again or write manually.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };

    try {
      const res = await resumeApi.updateResume(params?.resumeId, data);
      onNextChange(true);
      toast.success("Details Updated Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update summary");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg mt-10 shadow-lg border-t-[5.5px] border-purple-500">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Summary</h1>
      <p className="text-gray-600 text-sm mb-6">Write Your Summary</p>

      <form onSubmit={onSave} className="mt-5">
        <div className="flex justify-between items-center">
          <Button
            type="button"
            className="hover:bg-purple-600 transition-colors duration-300 cursor-pointer"
          >
            Add Summary
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border border-purple-500 text-primary hover:bg-purple-100 transition-colors duration-300 cursor-pointer"
            onClick={generateSummaryFromAI}
            disabled={isLoading}
          >
            Generate From AI
          </Button>
        </div>
        <Textarea
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="mt-4"
        />
        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SumaryForm;
