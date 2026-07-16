import { api } from "./api";

export async function parseReminder(authToken, text) {
  return api.parseReminder(authToken, text);
}

export default {
  parseReminder,
};