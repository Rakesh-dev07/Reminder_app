import { parseReminder } from "./aiParserService.js";

import validateAIResponse from "../validators/aiValidator.js";

import normalizeAIResponse from "../normalizers/aiNormalizer.js";

import mapAIToReminder from "../mappers/aiReminderMapper.js";

/**
 * ============================================================
 * AI Reminder Service
 * ============================================================
 *
 * Orchestrates the entire AI reminder pipeline.
 *
 * Flow:
 *
 * User Input
 *      ↓
 * Gemini
 *      ↓
 * Validation
 *      ↓
 * Normalization
 *      ↓
 * Mapping
 *      ↓
 * Final Result
 */

export async function processReminderText(userInput) {
  // Step 1
  const parsed = await parseReminder(userInput);

  if (!parsed.success) {
    return parsed;
  }

  // Step 2
  const validation = validateAIResponse(parsed.data);

  if (!validation.valid) {
    return {
      success: false,
      error: "AI response validation failed.",
      details: validation.errors,
    };
  }

  // Step 3
  const normalized =
    normalizeAIResponse(parsed.data);

  // Step 4
  const mapped =
    mapAIToReminder(normalized);

  return {
    success: true,

    reminder: mapped.reminder,

    ai: mapped.ai,
  };
}

export default processReminderText;