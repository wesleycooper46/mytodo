// API = "AIzaSyBkil0WF4yKOyf31aIVo3XPZ9xVyWZZXfA"

import { GoogleGenAI } from "@google/genai";

export default async function main(prompt = "What is full form of jsx?") {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBkil0WF4yKOyf31aIVo3XPZ9xVyWZZXfA",
  });

  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    generationConfig: {
      maxOutputTokens: 64,
      temperature: 0.7
    },
    config: { responseModalities: ["TEXT"] },
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const text = res.text;
  console.log(text);
  return text;
}
