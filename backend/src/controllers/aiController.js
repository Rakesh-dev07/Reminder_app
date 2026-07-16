import processReminderText from "../services/aiReminderService.js";

/**
 * ============================================================
 * AI Controller
 * ============================================================
 *
 * Handles AI reminder parsing requests.
 *
 * Controller Responsibilities:
 * - Validate request body
 * - Call AI service
 * - Return HTTP response
 */

export async function parseReminderController(req, res) {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        error: "Reminder text is required.",
      });
    }

    const result = await processReminderText(text);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
}

export default parseReminderController;