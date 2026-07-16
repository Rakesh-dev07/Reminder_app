import { OPENROUTER_URL, AI_MODEL } from "../config/ai.js";
import { buildReminderPrompt } from "../ai/prompt.js";
import cleanJsonResponse from "../utils/cleanJsonResponse.js";
import safeJsonParse from "../utils/safeJsonParse.js";

export async function parseReminder(userInput) {
  try {
    if (!userInput?.trim()) {
      return {
        success: false,
        error: "Reminder text is required.",
      };
    }

    const prompt = buildReminderPrompt(userInput);

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

        "Content-Type": "application/json",

        "HTTP-Referer": "http://localhost:3000",

        "X-Title": "Reminder App",
      },

      body: JSON.stringify({
        model: AI_MODEL,

        temperature: 0,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      console.error(json);

      return {
        success: false,
        error: json.error?.message || "AI request failed.",
      };
    }
    const text =
    json.choices?.[0]?.message?.content || "";
    
    console.log("========== RAW AI RESPONSE ==========");
    console.log(text);
    console.log("====================================");
    const cleaned =
      cleanJsonResponse(text);

    const parsed =
      safeJsonParse(cleaned);

    if (!parsed.success) {
      return parsed;
    }

    return {
      success: true,
      data: parsed.data,
    };
  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error
    );

    return {
      success: false,
      error: "Unable to parse reminder.",
    };
  }
}