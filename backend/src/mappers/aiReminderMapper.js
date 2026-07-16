/**
 * ============================================================
 * AI Reminder Mapper
 * ============================================================
 *
 * Converts normalized AI output into the
 * Reminder payload expected by the existing
 * Reminder Controller.
 *
 * This allows the AI module to stay completely
 * independent from the Reminder module.
 */

export function mapAIToReminder(aiData) {
  return {
    reminder: {
      title: aiData.title,

      description: aiData.notes,

      category: aiData.category,

      date: aiData.date,

      time: aiData.time,

      repeat: aiData.recurrence.type,

      repeatInterval:
        aiData.recurrence.interval,

      repeatDays:
        aiData.recurrence.weekdays,

      endDate: null,

      occurrences: null,
    },

    ai: {
      confidence: aiData.confidence,

      missingFields:
        aiData.missingFields,

      warnings:
        aiData.warnings,
    },
  };
}

export default mapAIToReminder;