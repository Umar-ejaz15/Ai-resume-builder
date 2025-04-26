import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import CertificateForm from "./forms/CertificateForm";
import SumaryForm from "./forms/SumaryForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import ExperienceForm from "./forms/ExperienceForm";
import ViewAndDownloadResume from "@/view-resume/[docid]/view";
import { Navigate, useParams } from "react-router-dom";

const FormSection = () => {
  const params = useParams();
  const { resumeId } = params;
  const [formIndex, setFormIIndex] = useState(1);
  const [onNextChange, setOnNextChange] = useState(false);
  return (
    <div className="p-3 md:p-10">
      <div className="flex justify-between items-center">
        <Button variant="outline">Theme</Button>
        <div className="flex justify-center items-center gap-2">
          {formIndex > 1 && (
            <Button
              onClick={() => setFormIIndex(formIndex - 1)}
              variant="outline"
              size="icon"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <Button
            disabled={!onNextChange}
            onClick={() => setFormIIndex(formIndex + 1)}
          >
            Next <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      {formIndex == 1 ? (
        <PersonalDetailsForm onNextChange={(v) => setOnNextChange(v)} />
      ) : null}
      {formIndex == 2 ? (
        <SumaryForm onNextChange={(v) => setOnNextChange(v)} />
      ) : null}
      {formIndex == 3 ? (
        <ExperienceForm onNextChange={(v) => setOnNextChange(v)} />
      ) : null}
      {formIndex == 4 ? (
        <EducationForm onNextChange={(v) => setOnNextChange(v)} />
      ) : null}
      {formIndex == 5 ? (
        <SkillsForm onNextChange={(v) => setOnNextChange(v)} />
      ) : null}
      {formIndex == 6 ? (
        <ProjectsForm onNextChange={(v) => setOnNextChange(v)} />
      ) : null}
      {formIndex == 7 ? (
        <CertificateForm onNextChange={(v) => setOnNextChange(v)} />
      ) : null}
      {formIndex == 8 ? (
        <Navigate to={`/dashboard/resume/${resumeId}/view`} />
      ) : null}
    </div>
  );
};

export default FormSection;
