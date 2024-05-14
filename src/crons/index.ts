// import { testCron } from "./test.crons";

import { removeOldTokens } from "./remove-old-tokens.cron";

export const runCronJobs = async () => {
  // testCron.start();
  removeOldTokens.start();
};
