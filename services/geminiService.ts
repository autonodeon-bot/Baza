
import { GoogleGenAI, Type } from "@google/genai";
import { Specialist } from "../types";

export async function filterSpecialistsWithAI(query: string, specialists: Specialist[]): Promise<string[]> {
  // Инициализируем прямо перед использованием, чтобы убедиться, что окружение готово
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
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

  const text = response.text;
  if (!text) return [];

  try {
    return JSON.parse(text.trim());
  } catch (e) {
    console.error("AI parsing error", e);
    return [];
  }
}
