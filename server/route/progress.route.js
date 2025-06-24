
// ✅ 3. Routes: routes/progressRoutes.js
import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getUserProgress, markLectureComplete } from '../controller/progress.controller.js';

const router = express.Router();

router.post('/complete', isAuthenticated, markLectureComplete);
router.get('/:courseId', isAuthenticated, getUserProgress);

export default router;