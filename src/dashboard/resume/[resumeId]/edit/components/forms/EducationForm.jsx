import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeContext } from "@/context/ResumeContext";
import React, { useContext, useEffect } from "react";
import GlobelApi from "../../../../../../../service/GlobelApi"; // optional if you use it later
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const EducationForm = ({ onNextChange }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const paramas = useParams();
  // Initialize education list from resumeInfo if available
  const [educationList, setEducationList] = React.useState(
    resumeInfo?.education || [
      {
        institution: "",
        degree: "",
        duration: "",
        location: "",
      },
    ]
  );

  // Whenever educationList changes, sync it with ResumeContext
  useEffect(() => {
    onNextChange(false);
    setResumeInfo((prev) => ({
      ...prev,
      education: educationList,
    }));
  }, [educationList, setResumeInfo]);

  const onChange = (index, event) => {
    onNextChange(false);
    const { name, value } = event.target;
    const updatedEducation = [...educationList];
    updatedEducation[index][name] = value;
    setEducationList(updatedEducation);
  };

  const addNewEducation = () => {
    setEducationList([
      ...educationList,
      { institution: "", degree: "", duration: "", location: "" },
    ]);
  };

  const removeEducation = (index) => {
    const updatedEducation = educationList.filter((_, i) => i !== index);
    setEducationList(updatedEducation);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      data: {
        education: educationList,
      },
    };
    try {
      await GlobelApi.updateResume(paramas?.resumeId, data);
      toast.success("Education data saved!");

      onNextChange(true); // move to next section if needed
    } catch (error) {
      toast.error("Failed to save data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-8 bg-white rounded-2xl mt-10 shadow-2xl border-t-8 border-purple-600 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Education
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Add your Education Information here.
        </p>

        <form onSubmit={onSave}>
          {educationList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              <div>
                <Label>Institution</Label>
                <Input
                  name="institution"
                  value={item.institution}
                  onChange={(e) => onChange(index, e)}
                  type="text"
                />
              </div>
              <div>
                <Label>Degree</Label>
                <Input
                  name="degree"
                  value={item.degree}
                  onChange={(e) => onChange(index, e)}
                  type="text"
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  name="duration"
                  value={item.duration}
                  onChange={(e) => onChange(index, e)}
                  type="text"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  name="location"
                  value={item.location}
                  onChange={(e) => onChange(index, e)}
                  type="text"
                />
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-end">
                <Button
                  type="button"
                  onClick={() => removeEducation(index)}
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-5">
            <Button type="button" onClick={addNewEducation}>
              Add New
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;
