import cron from "node-cron";
import { runScrape } from "./scraper";

const SCHEDULE = "*/5 * * * *";

export function startScheduler(): void {
  const task = cron.schedule(SCHEDULE, () => {
    runScrape().catch((err) =>
      console.error("[scheduler] Scrape failed:", err),
    );
  });

  task.execute();
}
