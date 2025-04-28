import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeContext } from "@/context/ResumeContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobelApi from "../../../../../../../service/GlobelApi";
import { toast } from "sonner";

const PersonalDetailsForm = ({ onNextChange }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        name: resumeInfo?.name || "",
        title: resumeInfo?.title || "",
        email: resumeInfo?.email || "",
        phone: resumeInfo?.phone || "",
        location: resumeInfo?.location || "",
      });
    }
  }, [resumeInfo]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    onNextChange(false);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setResumeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = { data: formData };
      await GlobelApi.updateResume(params?.resumeId, data);
      onNextChange(true);
      toast.success("Details Updated Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl border-t-4 border-purple-600 max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Personal Details
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Let’s start by adding your basic information
      </p>

      <form onSubmit={onSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Professional Title", name: "title", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Location", name: "location", type: "text" },
          ].map((field, idx) => (
            <div key={idx} className={field.name === "location" ? "md:col-span-2" : ""}>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                {field.label}
              </label>
              <Input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={onInputChange}
                required
                className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 
                    7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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

export default PersonalDetailsForm;
