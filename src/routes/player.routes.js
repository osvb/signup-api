import PlayerController from '../controllers/player.controller';
import bindControllerToCRUDRoutes from './helpers';

const controller = new PlayerController();
export default bindControllerToCRUDRoutes(controller);
