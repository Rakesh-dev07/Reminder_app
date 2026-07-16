/**
 * --------------------------------------------------------
 * Safe JSON Parse
 * --------------------------------------------------------
 *
 * Attempts to parse JSON safely.
 *
 * Never throws.
 */

export function safeJsonParse(text) {
  try {
    return {
      success: true,
      data: JSON.parse(text),
    };
  } catch (error) {
    return {
      success: false,
      error: "Invalid JSON returned by AI.",
      details: error.message,
    };
  }
}

export default safeJsonParse;