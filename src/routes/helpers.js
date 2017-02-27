import express from 'express';
import auth from 'basic-auth';
import config from '../config';

export function authenticate(req, res, next) {
    const credentials = auth(req);

    if (!credentials || credentials.name !== config.user || credentials.pass !== config.password) {
        res.status(401);
        res.setHeader('WWW-Authenticate', 'Basic realm="player api"');
        res.end('Access denied');
    } else {
        next();
    }
};

export default function  bindControllerToCRUDRoutes(controller) {
    const router = express.Router();
    router.get('/', controller.list);
    router.get('/search', controller.search);
    router.get('/:id', controller.retrieve);
    router.post('/', authenticate, controller.create);
    router.delete('/:id', authenticate, controller.destroy);
    router.put('/:id', authenticate, controller.update);
    return router;
};
