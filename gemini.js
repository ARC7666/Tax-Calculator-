const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

// Generate standard response
async function run(prompt) {
    try {
        const result = await model.generateContent(prompt);
        return result;
    } catch (err) {
        console.log(err);
    }
}

// Generate Chat Response for the Tax Assistant
async function chat(message, history = []) {
    try {
        const chatSession = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 500,
            },
        });
        const systemPrompt = `You are TaxBuddy, a highly knowledgeable, friendly, and professional AI Tax Assistant specifically designed for Indian taxpayers.
Your goal is to help users understand Indian income tax laws, deductions (80C, 80D, HRA, etc.), the difference between the old and new tax regimes, and recent budget changes.
Keep your answers clear, concise, and accurate based on the latest Indian Tax laws (AY 2024-25 and AY 2025-26).
User message: ${message}`;
        
        const result = await chatSession.sendMessage(systemPrompt);
        return result.response.text();
    } catch (err) {
        console.log("Chat Error:", err);
        return "I'm sorry, I am having trouble connecting to my tax knowledge base right now. Please try again later.";
    }
}

module.exports = { run, chat };
