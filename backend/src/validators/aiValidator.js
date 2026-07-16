import {
  AI_REMINDER_SCHEMA,
  ALLOWED_CATEGORIES,
  ALLOWED_RECURRENCE_TYPES,
} from "../ai/schema.js";

/**
 * ============================================================
 * AI Reminder Validator
 * ============================================================
 *
 * Validates the AI JSON response.
 *
 * It DOES NOT modify values.
 * It only verifies the structure.
 */

export function validateAIResponse(data) {
  const errors = [];

  // Must be an object
  if (!data || typeof data !== "object") {
    return {
      valid: false,
      errors: ["AI response is not an object."],
    };
  }

  // Required fields
  const requiredFields = Object.keys(AI_REMINDER_SCHEMA);

  for (const field of requiredFields) {
    if (!(field in data)) {
      errors.push(`Missing field: ${field}`);
    }
  }

  // Category
  if (
    data.category &&
    !ALLOWED_CATEGORIES.includes(data.category)
  ) {
    errors.push(
      `Invalid category: ${data.category}`
    );
  }

  // Recurrence
  if (
    !data.recurrence ||
    typeof data.recurrence !== "object"
  ) {
    errors.push("Missing recurrence object.");
  } else {
    if (
      !ALLOWED_RECURRENCE_TYPES.includes(
        data.recurrence.type
      )
    ) {
      errors.push(
        `Invalid recurrence type: ${data.recurrence.type}`
      );
    }

    if (
      typeof data.recurrence.interval !== "number"
    ) {
      errors.push(
        "Recurrence interval must be a number."
      );
    }

    if (
      !Array.isArray(data.recurrence.weekdays)
    ) {
      errors.push(
        "Weekdays must be an array."
      );
    }
  }

  // Missing fields
  if (
    data.missingFields &&
    !Array.isArray(data.missingFields)
  ) {
    errors.push(
      "missingFields must be an array."
    );
  }

  // Warnings
  if (
    data.warnings &&
    !Array.isArray(data.warnings)
  ) {
    errors.push(
      "warnings must be an array."
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export default validateAIResponse;