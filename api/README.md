# A.M.V.A. App API

## Server endpoints

### /get/bike_loans
- Begin Day: `number`
- Begin Month: `number`
- Begin Year: `number`
- End Day: `number`
- End Month: `number`
- End Year: `number`

Example: `b.sendMsg("/get/bike_loans", 10, 11, 2020, 11, 11, 2020);`

## Client endpoints

### /bike_loans
Send 500 bike loans each second to the end of the request.

For example, if the size of the bike loans is 2000, the response will split them in groups of 500 bike loans and then will send it each second.

Each bike loan has the following data: `loan_latitude`, `loan_length`, `return_latitude` and `return_length`.
