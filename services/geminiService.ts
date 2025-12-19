import { GoogleGenAI } from "@google/genai";
import { Transaction } from '../types';

let ai: GoogleGenAI | null = null;

const getAI = () => {
    if (!ai && process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};

export const getFinancialAdvice = async (
    question: string,
    transactions: Transaction[]
): Promise<string> => {
    const client = getAI();
    if (!client) return "AI service is unavailable. Please check your API key.";

    const transactionSummary = transactions.slice(0, 20).map(t => 
        `- ${t.date}: ${t.payee} (${t.category}) - ${t.type === 'expense' ? '-' : '+'}$${Math.abs(t.amount).toFixed(2)}`
    ).join('\n');

    const prompt = `
    You are a helpful and privacy-focused financial assistant for the app "OwnFinance Tracker".
    User has asked: "${question}"

    Here is a snippet of the user's recent transactions (stored locally, not on a server):
    ${transactionSummary}

    Analyze the transactions to answer the user's question concisely. 
    If you don't have enough data, politely say so.
    Keep the tone professional yet friendly.
    `;

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "I couldn't generate a response at this time.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Sorry, I encountered an error while analyzing your finances.";
    }
};

export const parseReceipt = async (fileData: string): Promise<Partial<Transaction>[]> => {
    const client = getAI();
    if (!client) throw new Error("AI service unavailable");

    // In a real app, this would process the base64 or text content of the file
    // For this demo, we simulate parsing a CSV/Text string
    const prompt = `
    Extract financial transactions from the following unstructured text.
    Return ONLY a JSON array of objects with keys: date (YYYY-MM-DD), payee, category, amount (number, negative for expense), status (Completed).
    
    Text Data:
    ${fileData.substring(0, 2000)}
    `;

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        const text = response.text;
        if (!text) return [];
        return JSON.parse(text);
    } catch (error) {
        console.error("Parsing Error:", error);
        return [];
    }
};
