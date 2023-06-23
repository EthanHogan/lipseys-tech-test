import express from 'express';
import emailController from '../controllers/emailController.js';

const emailRouter = express.Router();

emailRouter.get('/', emailController.getAllEmails);
emailRouter.get('/duplicates', emailController.getDuplicateEmails);
emailRouter.get('/exists', emailController.emailExists);

export default emailRouter;