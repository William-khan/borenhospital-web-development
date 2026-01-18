import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getHealthAdvice = async (userQuery: string): Promise<string> => {
  if (!apiKey) {
    return "AI Service is currently offline (API Key missing). Please contact support.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: "You are a professional, empathetic, and knowledgeable medical AI assistant for 'GoBroad Healthcare Group'. Your goal is to help patients navigate the hospital's services, explain general medical concepts, and provide triage advice. DISCLAIMER: Always state that you are an AI and your advice does not replace professional medical diagnosis. Keep answers concise, polite, and professional.",
      }
    });
    return response.text || "I apologize, I couldn't process that request at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server. Please try again later.";
  }
};