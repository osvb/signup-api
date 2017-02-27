/treningsgruppe/:id/treninger endpoint
--------------------

en trening er en enkelt trening i en liste av treninger som er koblet mot en treningsgruppe  

* `GET /treningsgruppe/:id/treninger`
 Returns a list of treninger to signup on, connected to the a spesific treningsgruppe

 TODO: add some kind of filter and sorting to get only upcomming treninger order by `starttime` 

* `GET /treningsgruppe/:id/treninger/:id`
Returns one trening object with info about free space, nr of seates and a list of players that has signup

* `POST /treningsgruppe/:id/treninger/players/`
Expect a body with an [Player object](./player.md), and the `Content-Type` header field set to `application:json`

* `DELETE /treningsgruppe/:id/treninger/players/`
Cancel the reservation to a trening



## Trening object
```json
{
    "id": 1245,
    "starttime": "2017-02-27T18:58:18+00:00",
    "name": "Mandagstrening, uke 23, Nivå 2-3",
    "more": [
        "Lengde" : "1,5 time",
        "Trener": "Jon Jørstad"
    ]
}
```

more is just an array with key values, that should be presented as a list with info

The date is using the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
