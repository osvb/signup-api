import { test } from 'ava';
import request from 'supertest-as-promised';
import { getAllElements, loadFixtures } from '../helpers';
import app from '../../src/app';

const fixtures = [
    'tournaments',
    'signups',
    'players'
];

const URI = '/signups';

let tournamentObjects;
let signupObjects;
let playerObjects;

test.beforeEach(async t => {
  await loadFixtures(fixtures)
      .then(async () => signupObjects = await getAllElements('Signup'))
      .then(async () => playerObjects = await getAllElements('Player'))
      .then(async () => tournamentObjects = await getAllElements('Tournament'))
      .then(async () => console.log('Loaded fixtures(Player, Signup, Tournament)', playerObjects.length, signupObjects.length, tournamentObjects.length))
});


test('should return the signups of a given  tournament', async t => {
    const fixture = tournamentObjects[0];
    const body = await request(app)
        .get(`${URI}/tournaments/${fixture.id}`)
        .expect(200)
        .then(response => response.body)
    //all teams
    t.is(body.teams.length, 4);

    //player names
    t.is(body.teams[1].players[0], 'FirstName 1 Lastname 1');
    t.is(body.teams[1].players[1], 'FirstName 2 Lastname 2');
    //sum
    t.is(body.teams[0].sum, 1272)

    //sort order
    t.is(body.teams[1].sum,  432);
    t.is(body.teams[2].sum, 236)
    t.is(body.teams[3].sum, 146)
});

test('should retrieve a list of all signups', async t => {
    const response = await request(app)
      .get(URI)
      .expect(200)
      .then(res => res.body);
    t.is(response.length, 8);
});

test('should return a single signup', async t => {
    const fixture = signupObjects[0];
    const response = await request(app)
        .get(`${URI}/${fixture.id}`)
        .expect(200);
    t.is(response.body.spiller1id, fixture.spiller1id);
});

test('should return ResourceNotFound when retrieving nonexisting signup', async t => {
    const fixture = signupObjects[0];
    const response = await request(app)
        .get(`${URI}/${fixture.id + 10000}`)
        .expect(404);
    t.is(response.body.name, 'ResourceNotFoundError');
    t.is(response.body.message, 'Could not find resource of type signup');
});

test('should add a new signup', async t => {
    const signup = {
      tournamentid: 1,
      spiller1id: 1,
      spiller2id: 2,
      paid: 200
		};
    const response = await request(app)
        .post(URI)
        .auth('admin', 'admin')
        .send(signup)
        .expect(201);

    t.is(response.body.spiller1id, signup.spiller1id);
});

test('should be able to change an signup', async () => {
    const signup = signupObjects[0];
    await request(app)
        .put(`${URI}/${signup.id}`)
        .auth('admin', 'admin')
        .send({ name: 'changed' })
        .expect(204);
});

test('should be able to delete an signup', async () => {
    const signup = signupObjects[0];
    await request(app)
        .delete(`${URI}/${signup.id}`)
        .auth('admin', 'admin')
        .expect(204);
});
