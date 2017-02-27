import express from 'express';

import SignupController from '../controllers/signup.controller';
import bindControllerToCRUDRoutes, {authenticate} from './helpers';

const controller = new SignupController();

export default bindSignupsToRoutes(controller);

function bindSignupsToRoutes(controller) {
	const router = bindControllerToCRUDRoutes(controller)
  router.get('/tournaments/:id', controller.retrieveSignupsFromTournament);
	return router;
}
