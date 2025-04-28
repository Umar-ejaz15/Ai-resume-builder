import { Loader2, PlusSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobelApi from "../../../service/GlobelApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddResume = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateResume = async () => {
    if (!resumeTitle.trim()) {
      toast.error("Resume title cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        data: {
          tittle: resumeTitle.trim(),
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        },
      };

      const response = await GlobelApi.createNewResume(payload);
      const newResumeId = response?.data?.data?.documentId;

      if (newResumeId) {
        toast.success("Resume created successfully!");
        navigate(`/dashboard/resume/${newResumeId}/edit`);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Box */}
      <div
        onClick={() => setOpenDialog(true)}
        className="w-80 h-80 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-all duration-300 group"
      >
        <PlusSquare className="w-16 h-16 text-gray-400 group-hover:text-gray-600 transition-colors" />
        <p className="mt-4 text-gray-500 group-hover:text-gray-700 font-medium">
          Create New Resume
        </p>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md md:max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Create Your Resume
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm mt-2">
              Give your resume a title to identify it later.
            </DialogDescription>

            <Input
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              placeholder="Enter resume title..."
              className="mt-4"
            />

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-6">
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => setOpenDialog(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>

              <Button
                className="w-full md:w-auto"
                onClick={handleCreateResume}
                disabled={!resumeTitle.trim() || isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddResume;
