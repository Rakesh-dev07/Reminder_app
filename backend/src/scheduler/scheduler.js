import cron from "node-cron";
import { processDueReminders } from "./reminderService.js";

export function startScheduler() {
  cron.schedule("*/1 * * * *", async () => {
    try {
      console.log("Checking reminders...");

      const result =
        await processDueReminders();

      if (result.processed > 0) {
        console.log(
          `Processed ${result.processed} reminder(s)`
        );
      }
    } catch (err) {
      console.error(err);
    }
  });

  console.log("Scheduler Started");
}