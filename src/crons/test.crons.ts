import { CronJob } from "cron";

const handler = async () => {
  console.log("Test test");
};

export const testCron = new CronJob("0-10 * * * * *", handler);
