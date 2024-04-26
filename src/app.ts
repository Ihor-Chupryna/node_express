import express from "express";

import { greetingRouter } from "./routers/greetings.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/greeting", greetingRouter);

const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
