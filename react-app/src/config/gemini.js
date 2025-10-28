import { GoogleGenAI } from "@google/genai";

export default async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_KEY,
  });

  console.log("Gemini Key:", import.meta.env.VITE_GEMINI_KEY);

  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    generationConfig: {
      maxOutputTokens: 16,
      temperature: 0.7
    },
    config: { responseModalities: ["TEXT"] },
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const text = res.text;
  console.log(text);
  return text;
}
