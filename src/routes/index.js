import express from 'express';
import raven from 'raven';
import player from './player.routes';
import tournament from './tournament.routes';
import signup from './signup.routes';
import { pageNotFoundMiddleware, sentryClient, errorMiddleware } from '../components/errors';

const router = express.Router();

router.use('/players', player);
router.use('/tournaments', tournament);
router.use('/signups', signup);
router.use('/', (req, res) => {
	res.send('<ul>' +
		'	<li>' +
		'		<a href="/players">players</a>' +
		'	</li>' +
		'	<li>' +
		'		<a href="/tournaments">tournaments</a>' +
		'	</li>' +
		'	<li>' +
		'		<a href="/signups">signups</a>' +
		'	</li>' +
		'</ul>'
	);
});

router.use(pageNotFoundMiddleware);
router.use(raven.middleware.express.errorHandler(sentryClient));
router.use(errorMiddleware);

export default router;
