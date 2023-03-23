import express from 'express'
import { addQuestionHandler, getAllQuestionsHandler } from '../controllers/question.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser'

const router = express.Router();

// Make it only accessible for users...
// router.use(deserializeUser, requireUser);

router.get("/", getAllQuestionsHandler);

router.post("/addQuestion", addQuestionHandler);

export default router;