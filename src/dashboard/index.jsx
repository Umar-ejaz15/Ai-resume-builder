import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobelApi from "./../../service/GlobelApi";
import ResumeCardItem from "./components/ResumeCardItem";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      getResumeList();
    }
  }, [user]);

  const getResumeList = () => {
    GlobelApi.editNewResume(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        if (resp.data && resp.data.data && resp.data.data.length > 0) {
          setResumeList(resp.data.data);
        } else {
          setResumeList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error);
        setResumeList([]);
      });
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
            <AddResume />
          </div>

          {resumeList && resumeList.length > 0 ? (
            resumeList.map((item, index) => (
              <ResumeCardItem key={index} item={item} index={index} />
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
};

export default Dashboard;
