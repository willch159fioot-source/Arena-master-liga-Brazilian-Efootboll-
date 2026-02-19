
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTournamentInsight = async (tournamentName: string, playersCount: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma breve introdução épica (máximo 3 frases) em português para um campeonato de futebol amador chamado "${tournamentName}" que conta com ${playersCount} jogadores inscritos. Foque na competitividade e na paixão pelo futebol.`,
      config: {
        temperature: 0.7,
      }
    });
    // The response.text property returns the generated text.
    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini insight:", error);
    return "O campo está pronto, a bola vai rolar e a história será escrita pelos craques!";
  }
};