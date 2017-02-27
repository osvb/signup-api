/treningsgruppe/ treninger endpoint
--------------------

en treningsgruppe er en gruppe med players som har betalt for å ha førsterett til å trene på denne treningsgruppa.  

* `GET /treningsgruppe/`
 Returns a list of treningsgruppe to signup one

* `GET /treningsgruppe/:id`
Returns one treningsgruppe object with info about free space, nr of seates and a list of players that has signup

* `POST /treningsgruppe/:id/`
Expect a body with an [Player object](./player.md), and the `Content-Type` header field set to `application:json`


## Treningsgruppe object
```json
{
    "id": 1245,
    "price_sesong": "100",
    "price_each": "100",
    "name": "Mandaggruppe, Nivå 2-3",
    "tidspunkt": "17.30-19.00"
}
```

* price_sesong: pris for hele sesongen, du har da førsterett
* price_dropinn: pris for å melde seg opp en gang // TODO: bør den heller komme trening? data messig passer den her, men kanskje du da må gjøre et ekstra api kall
