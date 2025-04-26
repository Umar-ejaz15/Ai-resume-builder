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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl text-center font-bold text-gray-900 mb-4">
          My Resume
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Make your AI Resume for your next job
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AddResume />
          {resumeList && resumeList.length > 0 ? (
            resumeList.map((item, index) => (
              <ResumeCardItem key={index} item={item} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No resumes found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
