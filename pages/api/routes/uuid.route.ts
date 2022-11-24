import express from 'express';

import { UuidController } from '../controllers/uuid.controller';

export const uuidRouter = express.Router();
const uuidController = new UuidController();

uuidRouter.get('/', uuidController.get());
