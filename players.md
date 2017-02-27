/players endpoint
--------------------

Get all information about one or more players

* `GET /players`
 Returns a list of player object

* `GET /players/:id`
Returns one player object with the error.

* `POST /players/`
Expect a body with an player object, and the `Content-Type` header field set to `application:json`

* `PUT /players/:id`
Expect a body with some of the fields from the player object, and the `Content-Type` header field set to `application:json`

* `DELETE /players/:id`
delete the resource

* `GET /players/search/?field=value`
Search for players.

To see all fields that you can add, see [the database model for players](src/models/player.model.js)
