'use client'

import { Sparkles, Rocket, Star, Laptop, FileText, Target } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isSignedIn) {
    return null; // Show nothing while checking auth or redirecting
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />

        {/* Decorative Icons */}
        <Sparkles className="absolute top-12 left-12 text-purple-400 opacity-30 w-12 h-12 animate-pulse" />
        <Rocket className="absolute bottom-16 right-16 text-blue-400 opacity-30 w-14 h-14 animate-bounce-slow" />
        <Star className="absolute top-1/3 right-1/4 text-yellow-400 opacity-20 w-10 h-10 animate-spin-slow" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-800 animate-fade-in">
            Craft Your <span className="text-purple-600">Dream Resume</span>{" "}
            with <span className="text-blue-600">AI</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Instantly build stunning, job-winning resumes powered by
            cutting-edge artificial intelligence.
          </p>

          <div className="mt-8 flex justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Get Started
              </Button>
            </Link>
          </div>
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
            <Link href="/auth/signup">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-xl">
                Create Resume Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
