import { FileText, MoreVertical } from "lucide-react";
import React, { useState, useEffect } from "react";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state
  const [isDeleteLoading, setIsDeleteLoading] = useState(false); // Optional: To show loading when deleting

  useEffect(() => {
    console.log(item.documentId);
  }, [item.documentId]);

  const handleDelete = () => {
    setIsDeleteLoading(true);
    GlobelApi.deleteResume(item.documentId).then(() => {
      setIsDeleteLoading(false);
      setIsDialogOpen(false);
    });
    // Simulate delete request or API call
    setTimeout(() => {
      setIsDeleteLoading(false);
      // Proceed with the actual deletion, for example:
      // GlobelApi.deleteResume(item.documentId);
      setIsDialogOpen(false); // Close dialog after action
    }, 2000); // Simulate delay
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl group hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-zinc-400 via-zinc-300 to-white cursor-pointer">
      {/* Icon in Center */}
      <div className="flex flex-col items-center justify-center h-48 text-zinc-800">
        <div className="bg-white/80 p-4 rounded-full mb-2">
          <FileText className="w-10 h-10 text-black" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between items-center px-4 py-3 bg-black/30 backdrop-blur-md">
        {/* Title */}
        <span className="text-white font-medium truncate">
          {item.tittle || `Resume ${index + 1}`}
        </span>

        {/* 3 Dots Button */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical
              className="cursor-pointer text-white"
              size={22}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />

            {/* Edit Button */}
            <DropdownMenuItem>
              <Link
                to={`/dashboard/resume/${item.documentId}/edit`}
                className="cursor-pointer"
              >
                <Button className="w-full" variant="outline">
                  Edit
                </Button>
              </Link>
            </DropdownMenuItem>

            {/* View Button */}
            <DropdownMenuItem>
              <Link
                to={`/dashboard/resume/${item.documentId}/view`}
                className="cursor-pointer"
              >
                <Button className="w-full" variant="outline">
                  View
                </Button>
              </Link>
            </DropdownMenuItem>

            {/* Download Button */}
            <DropdownMenuItem>
              <Link
                to={`/dashboard/resume/${item.documentId}/download`}
                className="cursor-pointer"
              >
                <Button className="w-full" variant="outline">
                  Download
                </Button>
              </Link>
            </DropdownMenuItem>

            {/* Delete Button */}
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger>
                <Button className="w-full bg-red-500 hover:bg-red-400 text-white">
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
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ResumeCardItem;
