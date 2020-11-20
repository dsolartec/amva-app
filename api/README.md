# A.M.V.A. App API

## OSC Endpoints
`/error`: If the API returns an error it will catch here.

Data returned example:
```js
[
    // Address
    "/error",
    // Message
    "This is an error"
]
```

---
`/bike_loans/yerterday`: Get the bike loans of yesterday.
`/bike_loans/today`: Get the bike loans of today.
`/bike_loans/last_Week`: Get the bike loans of the last week.

Data returned example (`/bike_loans` address):
```js
[
    // Address
    "/bike_loans",

    // First bike
    6.253003, // Loan latitude
    -75.582687, // Loan length
    6.231326, // Return latitude
    -75.591538, // Return length

    // Second bike
    6.253003, // Loan latitude
    -75.582687, // Loan length
    6.255589, // Return latitude
    -75.579259 // Return length
]
```

Request arguments (SuperCollider Example):
```sclang
b.sendMsg("/get/bike_loans/yesterday", 120000);
b.sendMsg("/get/bike_loans/today", 120000);
b.sendMsg("/get/bike_loans/last_week", 120000);
```

> NOTE: The argument is the frequency of the returned data: If the bike loans size is higher than 500 entries it will be split by 500 entries and they will be send with an interval (frequency), in this case of `120.000ms` (2 minutes).

---
`/sightings/yesterday`: Get the sightings of yesterday.
`/sightings/today`: Get the sightings of today.
`/sightings/last_week`: Get the sightings of the last week.

Data returned example (`/sightings` address):
```js
[
    // Address
    "/sightings",

    // First sighting
    6.093497, // Latitude
    -75.6438141, // Length
]
```

---
`/uv_radiation/yesterday`: Get the ultraviolet radiation stations of yesterday.
`/uv_radiation/today`: Get the ultraviolet radiation stations of today.

Data returned example (`/uv_radiation` address):
```js
[
    // Address
    "/uv_radiation",

    // First uv radiation
    0.0493,
    6.26004,
    -75.58949
]
```

## Rest API Endpoints
`/bike_loans/yesterday`: Get the bike loans of yesterday.
`/bike_loans/today`: Get the bike loans of today.
`/bike_loans/last_week`: Get the bike loans of the last week.

Data returned example:
```json
[
    {
        "loan_data": {
            "place": "Suramericana",
            "date": "19/11/2020 4:57:52 a.m.",
            "latitude": 6.253003,
            "length": -75.582687
        },
        "return_data": {
            "place": "Rosales",
            "date": "19/11/2020 5:33:26 a.m.",
            "latitude": 6.231326,
            "length": -75.591538
        }
    }
]
```

---
`/sightings/yesterday`: Get the sightings of yesterday.
`/sightings/today`: Get the sightings of today.
`/sightings/last_week`: Get the sightings of the last week.

Data returned example:
```json
[
    {
        "author": "Raul Soto",
        "image": "https://area247.metropol.gov.co/api/multimedia/1024991",
        "date": "2020-11-14T18:22:57",
        "latitude": 6.093497,
        "length": -75.6438141
    }
]
```

---
`/uv_radiation/yesterday`: Get the ultraviolet radiation stations of yesterday.
`/uv_radiation/today`: Get the ultraviolet radiation stations of today.

Data returned example:
```json
[
    {
        "name": "Piranometro UV SIATA",
        "category": "Baja",
        "code": "Piranometro UV SIATA",
        "ultraviolet_radiation": 0.0493,
        "date": "2020-11-19 00:00:53",
        "latitude": 6.26004,
        "length": -75.58949
    }
]
```
