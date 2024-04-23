import { Router } from "express";

import { greetingController } from "../controllers/greetings.controller";

const router = Router();

router.get("/", greetingController.greetings);

export const greetingRouter = router;
