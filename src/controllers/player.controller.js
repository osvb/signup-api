import CRUD from './CRUD';
import db from '../models';

class PlayerController extends CRUD {
    constructor() {
        super(db.Player, 'player');
    }
}

export default PlayerController;
