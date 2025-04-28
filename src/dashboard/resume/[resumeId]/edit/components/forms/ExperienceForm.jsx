import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResumeContext } from "@/context/ResumeContext";
import { useParams } from "react-router-dom";
import { ChatWithAI } from "../../../../../../../service/GoogleAPI";
import { toast } from "sonner";
import GlobelApi from "../../../../../../../service/GlobelApi";

const ExperienceForm = ({ onNextChange }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);

  const [isLoadingIndex, setIsLoadingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // added loading state
  const params = useParams();

  const [summary, setSummary] = useState("");

  const initialField = {
    company: "",
    role: "",
    duration: "",
    location: "",
    description: "",
  };

  const [experienceList, setExperienceList] = useState([initialField]);

  const handleChange = (index, event) => {
    onNextChange(false);
    const { name, value } = event.target;
    const updatedList = [...experienceList];
    updatedList[index][name] = value;
    setExperienceList(updatedList);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, initialField]);
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.slice(0, -1));
    }
  };

  const generateWorkExperience = async (index) => {
    try {
      setIsLoadingIndex(index);
      onNextChange(false);

      const experience = experienceList[index];
      const prompt = `Generate a work experience summary (2-3 sentences) for ${experience.company} where ${experience.role} worked from ${experience.duration} in ${experience.location}. Focus on their role and core expertise.`;

      const dataForAI = {
        type: "application/json",
        prompt: prompt,
      };

      const result = await ChatWithAI(dataForAI);
      const generatedText = result.candidates[0].content.parts[0].text;

      setExperienceList((prevList) => {
        const updatedList = [...prevList];
        updatedList[index].description = generatedText;
        return updatedList;
      });

      onNextChange(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate summary");
    } finally {
      setIsLoadingIndex(null);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      data: {
        experience: experienceList,
      },
    };

    try {
      await GlobelApi.updateResume(params?.resumeId, data);
      toast.success("Details Updated Successfully");
      onNextChange(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update summary");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onNextChange(false);
    setResumeInfo((prev) => ({
      ...prev,
      experience: experienceList,
    }));
  }, [experienceList, setResumeInfo]);

  return (
    <div className="p-8 bg-white rounded-2xl mt-10 shadow-2xl border-t-[3.5px] border-purple-600 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
        Work Experience
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Add your previous work experiences here.
      </p>

      {experienceList.map((item, index) => (
        <form
          key={index}
          onSubmit={onSave}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mb-8 bg-gray-50 rounded-xl border"
        >
          <div>
            <Label className="text-gray-700">Company</Label>
            <Input
              required
              name="company"
              type="text"
              value={item.company}
              onChange={(event) => handleChange(index, event)}
              placeholder="Enter company name"
            />
          </div>

          <div>
            <Label className="text-gray-700">Role</Label>
            <Input
              required
              name="role"
              type="text"
              value={item.role}
              onChange={(event) => handleChange(index, event)}
              placeholder="Enter your role"
            />
          </div>

          <div>
            <Label className="text-gray-700">Duration</Label>
            <Input
              required
              name="duration"
              type="text"
              value={item.duration}
              onChange={(event) => handleChange(index, event)}
              placeholder="e.g., Jan 2022 - Present"
            />
          </div>

          <div>
            <Label className="text-gray-700">Location</Label>
            <Input
              required
              name="location"
              type="text"
              value={item.location}
              onChange={(event) => handleChange(index, event)}
              placeholder="City, Country"
            />
          </div>

          <div className="md:col-span-2">
            <Label className="text-gray-700">Description</Label>
            <Textarea
              name="description"
              value={item.description}
              onChange={(event) => handleChange(index, event)}
              rows={4}
              placeholder="Describe your responsibilities and achievements"
            />

            <Button
              type="button"
              variant="outline"
              className="border border-purple-500 text-primary hover:bg-purple-100 transition-colors duration-300 cursor-pointer mt-4"
              onClick={() => generateWorkExperience(index)}
              disabled={isLoadingIndex === index}
            >
              {isLoadingIndex === index ? "Generating..." : "Generate Description"}
            </Button>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Experience"}
            </Button>
          </div>
        </form>
      ))}

      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <Button
          onClick={addNewExperience}
          className="bg-green-600 hover:bg-green-700"
        >
          + Add new experience
        </Button>

        <Button
          onClick={removeExperience}
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          variant="outline"
        >
          - Remove experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceForm;
