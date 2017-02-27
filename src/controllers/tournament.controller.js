import CRUD from './CRUD';
import db from '../models';

class TournamentController extends CRUD {
    constructor() {
        super(db.Tournament, 'tournament');
    }
}

export default TournamentController;
