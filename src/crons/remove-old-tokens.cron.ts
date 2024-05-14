import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/advancedFormat";

import { tokenRepository } from "../repositories/token.repository";

dayjs.extend(utc);

const handler = async () => {
  try {
    console.log("[START CRON] Remove old tokens");
    await tokenRepository.deleteByParams({
      createdAt: { $lt: dayjs().subtract(5, "days") },
    });
  } catch (err) {
    console.error("remove old tokens:", err);
  } finally {
    console.log("[END CRON] Remove old tokens");
  }
};

export const removeOldTokens = new CronJob("* * * * * *", handler);
