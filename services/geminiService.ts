
import { GoogleGenAI, Type } from "@google/genai";
import { Specialist } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function filterSpecialistsWithAI(query: string, specialists: Specialist[]): Promise<string[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Пользователь ищет: "${query}". 
               Вот список ID и кратких описаний специалистов: 
               ${specialists.map(s => `ID: ${s.id}, Описание: ${s.description}, Категория: ${s.category}, Цена: ${s.pricePerHour}`).join('; ')}.
               Верни JSON массив только из ID тех специалистов, которые наиболее подходят под запрос.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    },
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("AI parsing error", e);
    return [];
  }
}
