import express from 'express';
import emailRouter from './emailRouter.js';

const apiRouter = express.Router();

apiRouter.use('/emails', emailRouter);
// other future routers go here

export default apiRouter;