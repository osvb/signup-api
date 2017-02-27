import { describe } from 'ava-spec';
import request from 'supertest-as-promised';
import { getAllElements, loadFixtures } from '../helpers';
import app from '../../src/app';

const fixtures = [
    'tournaments'
];

const URI = '/tournaments';

let dbObjects;

describe.serial('Tournament API', it => {
    it.beforeEach(() =>
        loadFixtures(fixtures)
            .then(() => getAllElements('Tournament'))
            .then(response => {
                dbObjects = response;
            })
    );

    it('should retrieve a list of all tournaments', async t => {
        const response = await request(app)
            .get(URI)
            .expect(200)
            .then(res => res.body);
        t.is(response.length, dbObjects.length);
    });

    it('should retrieve a list of one tournaments', async t => {
        const response = await request(app)
            .get(`${URI}/search?name=Test1 Tournament`)
            .expect(200)
            .then(res => res.body);
        t.is(response.length, 1);
				t.is(response[0].name, "Test1 Tournament");
    });

    it('should return a single tournament', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id}`)
            .expect(200);
        t.is(response.body.name, fixture.name);
    });

    it('should return ResourceNotFound when retrieving nonexisting tournament', async t => {
        const fixture = dbObjects[0];
        const response = await request(app)
            .get(`${URI}/${fixture.id + 10000}`)
            .expect(404);
        t.is(response.body.name, 'ResourceNotFoundError');
        t.is(response.body.message, 'Could not find resource of type tournament');
    });

    it('should add a new tournament', async t => {
        const tournament = {
					"name": "Test5 Tournament",
					"startdate": "2017-11-09T23:00:00.000Z",
					"openreg": "2016-05-03T13:02:01.000Z",
					"place": 98989898,
					"teamlimit": 99,
					"gender": "damer",
					"price": 500,
					"info": "Added from tournament.test.js"
				}
        const response = await request(app)
            .post(URI)
            .auth('admin', 'admin')
            .send(tournament)
            .expect(201);

        t.is(response.body.name, tournament.name);
    });

    it('should be able to update an tournament', async () => {
        const tournament = dbObjects[0];
        await request(app)
            .put(`${URI}/${tournament.id}`)
            .auth('admin', 'admin')
            .send({ name: 'changed' })
            .expect(204);
    });

    it('should be able to delete an tournament', async () => {
        const tournament = dbObjects[0];
        await request(app)
            .delete(`${URI}/${tournament.id}`)
            .auth('admin', 'admin')
            .expect(204);
    });
});
