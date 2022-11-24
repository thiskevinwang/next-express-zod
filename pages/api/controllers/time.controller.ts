import { type Handler } from 'express';

export class TimeController {
  constructor() {}

  private now() {
    return new Date().getTime();
  }

  get: () => Handler = () => (req, res) => {
    res.json({ time: this.now() });
  };
}
