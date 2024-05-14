import { CronJob } from "cron";

import { TimeHelper } from "../helpers/time.helpers";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
  try {
    console.log("[START CRON] Remove old tokens");
    await tokenRepository.deleteByParams({
      createdAt: { $lt: TimeHelper.subtractByParams(4, "days") },
    });
  } catch (err) {
    console.error("remove old tokens:", err);
  } finally {
    console.log("[END CRON] Remove old tokens");
  }
};

export const removeOldTokens = new CronJob("* * * * * *", handler);
