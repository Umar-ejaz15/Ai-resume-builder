import { FileText, MoreVertical, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import GlobelApi from "../../../service/GlobelApi";

const ResumeCardItem = ({ item, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDelete = () => {
    setIsDeleteLoading(true);
    GlobelApi.deleteResume(item.documentId).then(() => {
      setIsDeleteLoading(false);
      setIsDialogOpen(false);
    });

    setTimeout(() => {
      setIsDeleteLoading(false);
      setIsDialogOpen(false);
    }, 2000);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl group hover:scale-105 transition-transform duration-300 bg-purple-600 cursor-pointer max-w-sm w-full mx-auto">
      
      {/* Resume Paper */}
      <div className="flex flex-col items-center justify-start p-6 gap-4 h-64 sm:h-72 text-white">

        {/* Clip */}
        <div className="absolute top-4 left-4">
          📎
        </div>

        {/* Profile Picture Placeholder */}
        <div className="bg-white p-4 rounded-full">
          <User className="w-8 h-8 text-purple-600" />
        </div>

        {/* Resume Title */}
        <h2 className="font-bold text-xl text-center break-words w-full">
          Resume
        </h2>

        {/* Fake Text Lines */}
        <div className="w-full space-y-2">
          <div className="bg-white h-2 rounded-full w-3/4 mx-auto"></div>
          <div className="bg-white h-2 rounded-full w-2/3 mx-auto"></div>
          <div className="bg-white h-2 rounded-full w-1/2 mx-auto"></div>
        </div>
      </div>

      {/* Pen Icon */}
      <div className="absolute bottom-4 right-4 rotate-12">
        ✍️
      </div>

      {/* Bottom Bar with Actions */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between items-center px-4 py-3 bg-purple-800/90 backdrop-blur-sm">
        {/* Title */}
        <span className="text-white font-semibold text-base sm:text-lg truncate max-w-[65%]">
          {item.tittle || `Resume ${index + 1}`}
        </span>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="cursor-pointer text-white" size={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white shadow-lg rounded-xl p-2 space-y-2">

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link to={`/dashboard/resume/${item.documentId}/edit`}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Edit
                </Button>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to={`/dashboard/resume/${item.documentId}/view`}>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  View
                </Button>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to={`/dashboard/resume/${item.documentId}/view`}>
                <Button className="w-full bg-purple-400 hover:bg-purple-500 text-white">
                  Download
                </Button>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        your resume and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        {isDeleteLoading ? "Deleting..." : "Continue"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </>
              </AlertDialog>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ResumeCardItem;
