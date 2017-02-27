import TournamentController from '../controllers/tournament.controller';
import bindControllerToCRUDRoutes from './helpers';

const controller = new TournamentController();
export default bindControllerToCRUDRoutes(controller);
