import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/index";
import Dashboard from "./dashboard/index";
import { useUser } from "@clerk/clerk-react";
import Signup from "./auth/signup/Signup";
import EditResume from "./dashboard/resume/[resumeId]/edit";
import { Toaster } from "sonner";
import ViewAndDownloadResume from "./view-resume/[docid]/view";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // Or show a loading spinner

  return (
    <>
      <Toaster />
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={isSignedIn ? <Navigate to="/dashboard" /> : <Home />}
        />

        {/* Auth Routes (Only available when not signed in) */}
        {!isSignedIn && (
          <>
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Navigate to="/auth/signup" />} />
          </>
        )}

        {/* Dashboard Routes (Only available when signed in) */}
        {isSignedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/resume/:resumeId/edit" element={<EditResume />} />
            <Route path="/dashboard/resume/:resumeId/view" element={<ViewAndDownloadResume />} />
          </>
        )}

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
