import express from 'express';

import { TimeController } from '../controllers/time.controller';

export const timeRouter = express.Router();
const timeController = new TimeController();

timeRouter.get('/', timeController.get());
