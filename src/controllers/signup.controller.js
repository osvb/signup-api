import eDebug from 'enchanted-debug';

import db from '../models';
import CRUD from './CRUD';

const {error} = eDebug('players-api');

class SignupController extends CRUD {
	constructor() {
		super(db.Signup, 'signup');
	}

	retrieveSignupsFromTournament(req, res, next) {
		const tournamentid = req.params.id;
		db.sequelize.query(findSignupsFromTournament(tournamentid), {model: db.Signup})
			.then(signups => getAllPlayers(db, signups))
			.then(dbRes => transform(dbRes))
			.then(dbRes => sortByPoints(dbRes))
      .then(dbRes => res.json(dbRes))
			.catch(err => {
        error(err);
				res.status(500).end(JSON.stringify(err));
			});
	}
}

function getAllPlayers(db, signups) {
  return new Promise((resolve, reject) =>  {
    db.Player.findAll()
      .then(players => resolve({
        players: JSON.parse(JSON.stringify(players)),
        signups: JSON.parse(JSON.stringify(signups))
      }))
      .catch(err => reject(resolve))
  });
}


export default SignupController;

function transform(db) {
  return {
    teams: db.signups.map(signup => ({
      players: [
        mapPlayerName(signup.spiller1id, db.players),
        mapPlayerName(signup.spiller2id, db.players)
      ],
      sum: getSumofCurrentYear(signup, db.players)
    }))
  }
}


function sortByPoints(res) {
	const teams = res.teams.sort((a, b) => b.sum - a.sum)
	return Object.assign({}, { teams }, res);
}

function getSumofCurrentYear(signup, players) {
  const player1 = getPlayer(signup.spiller1id, players)
  const player2 = getPlayer(signup.spiller2id, players)
  const year = new Date().toString().split(" ")[3]
  const field = 'rankingPoints_' + year;
  if(!player1[field]) {
    error('cant get ranking from player, does this years rankingfield exist in the database?', player1);
  }
  if(!player2[field]) {
    error('cant get ranking from player, does this years rankingfield exist in the database?', player2);
  }
  return ((player1[field] || 0) + (player2[field] || 0))
}

function getPlayer(spillerId, players) {
  const player = players.filter(player => player.id === spillerId)
  if(Array.isArray(player) && player.length > 0) {
    return player[0];
  }
  error('player should be and array with length more then 0', player);
  return {};
}

function mapPlayerName(spillerId, players) {
  const player = getPlayer(spillerId, players)
  return player.name || "";
}

function findSignupsFromTournament(tournamentId) {
	return `SELECT * FROM signups where tournamentid = ${tournamentId}`;
}
