import { type Handler } from 'express';
import { v4 } from 'uuid';

export class UuidController {
  constructor() {}

  random() {
    return v4();
  }

  get: () => Handler = () => (req, res) => {
    res.json({ time: this.random() });
  };
}
