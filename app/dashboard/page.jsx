'use client'

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import AddResume from "@/components/dashboard/AddResume";
import ResumeCardItem from "@/components/dashboard/ResumeCardItem";
import resumeApi from "@/services/resumeApi";

export default function DashboardPage() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      getResumeList();
    }
  }, [user]);

  const getResumeList = async () => {
    try {
      const resp = await resumeApi.editNewResume(
        user?.primaryEmailAddress?.emailAddress
      );
      if (resp.data && resp.data.length > 0) {
        setResumeList(resp.data);
      } else {
        setResumeList([]);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setResumeList([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <h1 className="text-3xl sm:text-4xl text-center font-bold text-gray-900 mb-4">
          My Resumes
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Create, view, and manage your AI-powered resumes for the next big opportunity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex justify-center">
            <AddResume refreshList={getResumeList} />
          </div>

          {resumeList && resumeList.length > 0 ? (
            resumeList.map((item, index) => (
              <ResumeCardItem
                key={item.id || index}
                item={item}
                index={index}
                refreshList={getResumeList}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              <p>No resumes found. Start by creating one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
