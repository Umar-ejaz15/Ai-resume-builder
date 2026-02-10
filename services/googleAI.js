import { GoogleGenAI } from "@google/genai";

// Initialize client with API key from environment
const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const ChatWithAI = async ({prompt}) => {
  // Return null if no API key configured
  if (!ai) {
    console.warn("Google Gemini API key not configured");
    return null;
  }

  try {
    // Using gemini-3-flash-preview as shown in official documentation
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response;
  } catch (error) {
    // Handle quota exceeded and other errors gracefully
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      console.warn("Google Gemini API quota exceeded. AI generation disabled temporarily.");
      return null;
    }
    console.error("Google Gemini API error:", error.message);
    return null;
  }
};
