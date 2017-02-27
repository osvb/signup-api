/tournaments endpoint
--------------------

Get all information about one or more tournaments

* `GET /tournaments`
 Returns a list of tournament object

* `GET /tournaments/:id`
Returns one tournament object with info

* `POST /tournaments/`
Expect a body with an tournament object, and the `Content-Type` header field set to `application:json`

* `PUT /tournaments/:id`
Expect a body with some of the fields from the tournament object, and the `Content-Type` header field set to `application:json`

* `DELETE /tournaments/:id`
delete the resource

* `GET /tournaments/search/?field=value`
Search for tournaments.

To see all fields that you can add, see [the database model for tournaments](src/models/tournament.model.js)
