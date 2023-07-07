import { Router as router } from 'express';

// Routes
import NoteRoutes from './NoteRoutes.js';
import AuthRoutes from './AuthRoutes.js';

// Middleware
import Auth from '../middlewares/Auth.js';
import SocketRoutes from './SocketRoutes.js';
import DemandeRoutes from './DemandeRoutes.js';

export default router()
    .get('/', (req, res) => {
        res.json({
            message: 'Welcome to the API'
        });
    })
    .use('/notes',Auth, NoteRoutes)
    .use('/auth', AuthRoutes)
    .use('/rooms',SocketRoutes)
    .use('/demandes',Auth, DemandeRoutes)

