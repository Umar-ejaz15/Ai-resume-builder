'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeContext } from "@/context/ResumeContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import resumeApi from "@/services/resumeApi"; // optional if you use later
import { useParams } from "next/navigation";

const SkillsForm = ({ onNextChange }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const [skills, setSkills] = useState(
    resumeInfo?.skills || {
      languages: [],
      frameworks: [],
      databases: [],
      tools: [],
    }
  );

  useEffect(() => {
    onNextChange(false);
    setResumeInfo((prev) => ({
      ...prev,
      skills,
    }));
  }, [skills, setResumeInfo]);

  const handleChange = (category, index, value) => {
    onNextChange(false);
    const updated = [...skills[category]];
    updated[index] = value;
    setSkills((prev) => ({
      ...prev,
      [category]: updated,
    }));
  };

  const addSkill = (category) => {
    setSkills((prev) => ({
      ...prev,
      [category]: [...prev[category], ""],
    }));
  };

  const removeSkill = (category, index) => {
    const updated = skills[category].filter((_, i) => i !== index);
    setSkills((prev) => ({
      ...prev,
      [category]: updated,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Resume ID:", params?.resumeId);

    const data = {
      data: {
        skills: {
          languages: skills.languages,
          frameworks: skills.frameworks,
          databases: skills.databases,
          tools: skills.tools,
        },
      },
    };

    try {
      await resumeApi.updateResume(params?.resumeId, data); // Uncomment when needed
      toast.success("Skills saved successfully!");
      onNextChange(true);
    } catch (error) {
      toast.error("Failed to save skills.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl mt-10 shadow-2xl border-t-8 border-purple-600 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Skills</h1>
      <p className="text-gray-500 text-sm mb-8">
        Add your technical skills categorized properly.
      </p>

      <form onSubmit={onSave}>
        {["languages", "frameworks", "databases", "tools"].map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold capitalize mb-4">
              {category}
            </h2>

            {skills[category]?.map((skill, index) => (
              <div key={index} className="flex items-center gap-3 mb-3">
                <Input
                  required
                  value={skill}
                  onChange={(e) =>
                    handleChange(category, index, e.target.value)
                  }
                  placeholder={`Enter a ${category.slice(0, -1)}...`}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeSkill(category, index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              className="mt-2"
              onClick={() => addSkill(category)}
            >
              Add {category.slice(0, -1)}
            </Button>
          </div>
        ))}

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Skills"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SkillsForm;
