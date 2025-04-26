import { Loader2, PlusSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobelApi from "../../../service/GlobelApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const AddResume = () => {
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigate();
  const paramas = useParams();

  const onCreateResume = async () => {
    setLoading(true);

    try {
      const data = {
        data: {
          tittle: resumeTitle,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        },
      };

      const response = await GlobelApi.createNewResume(data);
      const newResumeId = response?.data?.data?.documentId;

      console.log(newResumeId);

      if (newResumeId) {
        navigation(`/dashboard/resume/${newResumeId}/edit`); // <- Navigate with Strapi's ID
      } else {
        toast.error("Failed to create resume. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(paramas);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpenDialog(true)}
        className="w-80 h-80 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-gray-400 hover:bg-gray-50 cursor-pointer transition-all duration-300 group"
      >
        <PlusSquare className="w-16 h-16 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
        <p className="mt-4 text-gray-500 group-hover:text-gray-700 font-medium">
          Create New Resume
        </p>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl p-6">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Create Your Resume
            </DialogTitle>
            <DialogDescription>
              <span className="text-gray-600 text-sm">
                Give your resume a meaningful title to easily identify it later
              </span>
              <Input
                onChange={(e) => setResumeTitle(e.target.value)}
                value={resumeTitle}
                className="mt-4 w-full transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter resume title..."
              />
            </DialogDescription>
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
            <div className="flex justify-between flex-col md:flex-row gap-3 pt-6">
              <Button
                variant="outline"
                className="w-full sm:w-auto hover:bg-gray-100 transition-colors"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={onCreateResume}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span>Create</span>
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddResume;
