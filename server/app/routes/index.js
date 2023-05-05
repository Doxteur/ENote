import { Router as router } from 'express';

import NoteRoutes from './NoteRoutes.js';
import auth from '../middlewares/auth.js';

export default router()
    .use('/notes', NoteRoutes)
