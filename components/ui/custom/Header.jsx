import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center justify-center">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
        </Link>
      </div>
      {isSignedIn ? (
        <div className="flex items-center justify-center gap-5">
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div className="flex items-center">
          <Link to="/dashboard">
            <Button variant="default">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
