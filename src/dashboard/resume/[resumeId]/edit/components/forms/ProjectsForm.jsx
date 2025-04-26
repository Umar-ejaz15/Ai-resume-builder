import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeContext } from "@/context/ResumeContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import GlobelApi from "../../../../../../../service/GlobelApi";
import { useParams } from "react-router-dom";
import { ChatWithAI } from "../../../../../../../service/GoogleAPI";

const ProjectsForm = ({ onNextChange }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingIndex, setIsLoadingIndex] = useState(null); // Track which project is being loaded
  const params = useParams();
  const [projects, setProjects] = useState(
    resumeInfo?.projects || [
      {
        name: "",
        description: "",
        link: "",
      },
    ]
  );

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      projects,
    }));
  }, [projects, setResumeInfo]);

  const handleChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects((prev) => [...prev, { name: "", description: "", link: "" }]);
  };

  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const generateDescription = async (index) => {
    setIsLoadingIndex(index); // Set loading state for the project being updated
    onNextChange(false);

    try {

      const projectName = projects[index].name;
      const prompt = `Generate a description for the project titled "${projectName}" make it short and just give me straiforward reply yea make it short like just a paragraph would be enough right .`;

      const dataForAI = {
        type: "application/json",
        prompt: prompt,
      };

      const result = await ChatWithAI(dataForAI); // Assuming ChatWithAI is an AI service for generating descriptions
      const generatedText = result.candidates[0].content.parts[0].text;

      const updatedProjects = [...projects];
      updatedProjects[index].description = generatedText;

      setProjects(updatedProjects); // Update the description for that specific project
      onNextChange(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate description");
    } finally {
      setIsLoadingIndex(null); // Reset loading state
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      data: {
        projects: projects,
      },
    };

    try {
      await GlobelApi.updateResume(params?.resumeId, data);
      toast.success("Projects saved successfully!");

      onNextChange(true);
    } catch (error) {
      toast.error("Failed to save projects.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl mt-10 shadow-2xl border-t-8 border-purple-600 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Projects</h1>
      <p className="text-gray-500 text-sm mb-8">
        Add your major projects with description and links.
      </p>

      <form onSubmit={onSave}>
        {projects.map((project, index) => (
          <div key={index} className="mb-8 border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Project {index + 1}</h2>

            <div className="mb-4">
              <Label>Project Name</Label>
              <Input
                value={project.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="Enter project name..."
              />
            </div>

            <div className="mb-4">
              <Label>Description</Label>
              <Input
                value={project.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Enter project description..."
              />
            </div>

            <div className="mb-4">
              <Label>Project Link</Label>
              <Input
                value={project.link}
                onChange={(e) => handleChange(index, "link", e.target.value)}
                placeholder="Enter project URL..."
              />
            </div>

            {/* Button to generate description */}
            <Button
              type="button"
              className="mt-2"
              variant="outline"
              onClick={() => generateDescription(index)}
              disabled={isLoadingIndex === index} // Disable if this project is being processed
            >
              {isLoadingIndex === index
                ? "Generating..."
                : "Generate Description"}
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={() => removeProject(index)}
              className="mt-4"
            >
              Remove Project
            </Button>
          </div>
        ))}

        <Button type="button" className="mt-4" onClick={addProject}>
          Add Project
        </Button>

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Projects"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectsForm;
