import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.errors";
import { greetingRouter } from "./routers/greetings.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/greeting", greetingRouter);
app.use("/users", userRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).json(err.message);
  },
);
process.on("uncaughtException", (error) => {
  console.error("uncaughtException:", error);
});

app.listen(config.PORT, async () => {
  await mongoose.connect(config.MONGO_URL);
  console.log(`Example app listening on port ${config.PORT}`);
});
