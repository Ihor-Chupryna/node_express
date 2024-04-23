import { Request, Response } from "express";

class GreetingController {
  public greetings(req: Request, res: Response) {
    res.json({
      greeting: "Hello World",
    });
  }
}

export const greetingController = new GreetingController();
