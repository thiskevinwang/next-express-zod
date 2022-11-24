import express from 'express';

import { apiRouter } from './routes/api.route';

const app = express();

app.use(apiRouter);

export default app;
