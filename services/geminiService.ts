import { GoogleGenAI } from "@google/genai";
import { ResumeData } from "../types";

const apiKey = process.env.API_KEY || '';

export const generateResumeSummary = async (data: ResumeData): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    You are a professional resume writer. 
    Write a compelling, professional summary (max 80 words) for a resume based on the following details:
    
    Name: ${data.personal.fullName}
    Current Role: ${data.personal.role}
    Experience Highlights: ${data.experience.map(exp => `${exp.role} at ${exp.company}`).join(', ')}
    Key Skills: ${data.skills.map(s => s.name).join(', ')}
    
    The tone should be confident, professional, and tailored to the industry. Do not include markdown or headings, just the paragraph text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || '';
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
};