import { useState } from "react";
import aiService from "../services/aiService";
import { getToken } from "../utils/auth";

/**
 * ============================================================
 * AI Reminder Hook
 * ============================================================
 */

export default function useAIReminder() {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [reminder, setReminder] = useState(null);

  const [aiInfo, setAiInfo] = useState(null);

  async function generateReminder() {
    if (!prompt.trim()) {
      setError("Please enter a reminder.");
      return;
    }

    try {
      setLoading(true);

      setError("");

      setReminder(null);

      setAiInfo(null);

      const token = getToken();

      if (!token) {
        setError("Please login again.");
        return;
      }

      const result = await aiService.parseReminder(token, prompt);

      if (!result.success) {
        setError(result.error || "Unable to generate reminder.");
        return;
      }

      setReminder(result.reminder);

      setAiInfo(result.ai);
    } catch (err) {
      console.error(err);

      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function clearReminder() {
    setReminder(null);
    setAiInfo(null);
    setError("");
  }

  function reset() {
    setPrompt("");
    setReminder(null);
    setAiInfo(null);
    setError("");
  }

  return {
    prompt,
    setPrompt,

    loading,

    error,

    reminder,
    aiInfo,

    generateReminder,

    clearReminder,

    reset,
  };
}