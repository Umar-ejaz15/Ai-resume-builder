import { UserButton } from "@clerk/clerk-react";
import React from "react";

const index = () => {
  return (
    <div className="h-screen ">
      <section className="h-screen w-full  flex items-center justify-center snap-start relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-6xl mx-auto text-center text-white relative z-10">
          <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 animate-fade-in">
            Create Your Professional Resume with AI
          </h1>
          <p className="text-2xl mb-8 text-blue-600">
            Build stunning resumes in minutes using advanced artificial
            intelligence
          </p>
          <button className=" text-blue-600 px-10 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-xl">
            Get Started
          </button>
        </div>
      </section>

      <section className="h-screen w-full bg-white flex items-center justify-center snap-start">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-16">
            AI-Powered Content Generation
          </h2>
          <div className="grid grid-cols-3 gap-12">
            <div className="p-8 bg-blue-50 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-blue-100">
              <div className="text-blue-600 mb-6">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Smart Suggestions
              </h3>
              <p className="text-gray-600 text-lg">
                Get intelligent content suggestions based on your job title and
                experience
              </p>
            </div>
            <div className="p-8 bg-purple-50 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-purple-100">
              <div className="text-purple-600 mb-6">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Skills Analysis
              </h3>
              <p className="text-gray-600 text-lg">
                Automatically identify and highlight your most relevant skills
              </p>
            </div>
            <div className="p-8 bg-indigo-50 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-indigo-100">
              <div className="text-indigo-600 mb-6">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Language Enhancement
              </h3>
              <p className="text-gray-600 text-lg">
                Professional wording improvements for maximum impact
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center snap-start">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-white px-6">
          <h2 className="text-5xl font-bold mb-16">
            Real-Time Preview & Export
          </h2>
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-12 w-full shadow-2xl border border-white/20">
            <div className="aspect-video bg-gradient-to-br from-white/20 to-white/10 rounded-xl mb-8 shadow-inner"></div>
            <p className="text-xl">
              See your changes instantly and export to multiple formats
              including PDF, Word, and more
            </p>
          </div>
        </div>
      </section>

      <section className="h-screen w-full bg-gray-900 flex items-center justify-center snap-start relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto text-center text-white relative z-10">
          <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Start Building Your Future Today
          </h2>
          <p className="text-2xl mb-12 text-gray-300">
            Join thousands of professionals who trust our AI Resume Builder
          </p>
          <div className="space-x-8">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-xl">
              Create Resume Now
            </button>
            <button className="bg-white/10 backdrop-blur-lg px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 border border-white/20">
              View Examples
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
