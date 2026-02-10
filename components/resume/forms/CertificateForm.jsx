'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeContext } from "@/context/ResumeContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import resumeApi from "@/services/resumeApi";
import { useParams } from "next/navigation";

const CertificateForm = ({ onNextChange }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const [certifications, setCertifications] = useState(
    resumeInfo?.certifications || [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ]
  );

  useEffect(() => {
    onNextChange(false);
    setResumeInfo((prev) => ({
      ...prev,
      certifications,
    }));
  }, [certifications, setResumeInfo]);

  const handleChange = (index, field, value) => {
    onNextChange(false);

    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const addCertification = () => {
    setCertifications((prev) => [...prev, { title: "", issuer: "", year: "" }]);
  };

  const removeCertification = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      data: {
        certifications: certifications,
      },
    };

    try {
      await resumeApi.updateResume(params?.resumeId, data);
      toast.success("Certifications saved successfully!");

      onNextChange(true);
    } catch (error) {
      toast.error("Failed to save certifications.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl mt-10 shadow-2xl border-t-8 border-purple-600 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
        Certifications
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Add your professional certifications.
      </p>

      <form onSubmit={onSave}>
        {certifications.map((cert, index) => (
          <div key={index} className="mb-8 border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">
              Certification {index + 1}
            </h2>

            <div className="mb-4">
              <Label>Certificate Title</Label>
              <Input
                required
                value={cert.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                placeholder="Enter certification title..."
              />
            </div>

            <div className="mb-4">
              <Label>Issuer</Label>
              <Input
                required
                value={cert.issuer}
                onChange={(e) => handleChange(index, "issuer", e.target.value)}
                placeholder="Enter issuer name..."
              />
            </div>

            <div className="mb-4">
              <Label>Year</Label>
              <Input
                required
                value={cert.year}
                onChange={(e) => handleChange(index, "year", e.target.value)}
                placeholder="Enter year..."
              />
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => removeCertification(index)}
            >
              Remove Certification
            </Button>
          </div>
        ))}

        <Button type="button" className="mt-4" onClick={addCertification}>
          Add Certification
        </Button>

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Certifications"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;
