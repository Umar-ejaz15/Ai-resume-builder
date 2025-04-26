import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import { Laptop, FileText, Target, Heart } from "lucide-react"; // Importing Lucide Icons

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="max-w-7xl mx-auto text-center text-white relative z-10 px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-white animate-fade-in">
            Create Your Professional Resume{" "}
            <span className="text-white">with AI</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-blue-100">
            Build stunning resumes in minutes using advanced artificial
            intelligence
          </p>
          <Link to={"/auth/signup"}>
            <button className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-xl">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen w-full bg-white flex items-center justify-center py-12 sm:py-24">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-16">
            AI-Powered Content Generation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="p-8 bg-blue-50 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg border border-blue-100">
              <div className="text-blue-600 mb-6">
                <Laptop className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Smart Suggestions
              </h3>
              <p className="text-gray-600 text-lg">
                Get intelligent content suggestions based on your job title and
                experience.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-purple-50 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg border border-purple-100">
              <div className="text-purple-600 mb-6">
                <FileText className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Skills Analysis
              </h3>
              <p className="text-gray-600 text-lg">
                Automatically identify and highlight your most relevant skills.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 bg-indigo-50 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg border border-indigo-100">
              <div className="text-indigo-600 mb-6">
                <Target className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Language Enhancement
              </h3>
              <p className="text-gray-600 text-lg">
                Professional wording improvements for maximum impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="min-h-screen w-full bg-gray-900 flex items-center justify-center relative overflow-hidden py-12 sm:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto text-center text-white relative z-10 px-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Start Building Your Future Today
          </h2>
          <p className="text-xl sm:text-2xl mb-12 text-gray-300">
            Join thousands of professionals who trust our AI Resume Builder.
          </p>
          <div className="space-x-8">
            <Link to={"/auth/signup"}>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-xl">
                Create Resume Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
