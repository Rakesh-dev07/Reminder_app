/**
 * --------------------------------------------------------
 * Clean AI Response
 * --------------------------------------------------------
 *
 * Removes markdown code fences that some LLMs
 * occasionally wrap around JSON.
 *
 * Example:
 *
 * ```json
 * { ... }
 * ```
 *
 * becomes
 *
 * { ... }
 */

export function cleanJsonResponse(text = "") {
  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

export default cleanJsonResponse;