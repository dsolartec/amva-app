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
`/get/bike_loans/today`: Get the bike loans of today.
`/get/bike_loans/yerterday`: Get the bike loans of yesterday.
`/get/bike_loans/last_Week`: Get the bike loans of the last week.

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
b.sendMsg("/get/bike_loans/today", 120000);
b.sendMsg("/get/bike_loans/yesterday", 120000);
b.sendMsg("/get/bike_loans/last_week", 120000);
```

> NOTE: The argument is the frequency of the returned data: If the bike loans size is higher than 500 entries it will be split by 500 entries and they will be send with an interval (frequency), in this case of `120.000ms` (2 minutes).

---
`/get/sightings/today`: Get the sightings of today.
`/get/sightings/yesterday`: Get the sightings of yesterday.
`/get/sightings/last_week`: Get the sightings of the last week.

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

## Rest API Endpoints
`/bike_loans/today`: Get the bike loans of today.
`/bike_loans/yesterday`: Get the bike loans of yesterday.
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
`/sightings/today`: Get the sightings of today.
`/sightings/yesterday`: Get the sightings of yesterday.
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
