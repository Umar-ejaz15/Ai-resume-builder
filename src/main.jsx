import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/ui/custom/Header";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const HeaderWrapper = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ||
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/resume/:resumeId/edit" ||
      location.pathname.match(/^\/dashboard\/resume\/.*\/edit$/)  ? (
        <Header />
      ) : null}
      <App />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <HeaderWrapper />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
