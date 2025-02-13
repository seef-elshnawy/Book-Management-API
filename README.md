## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Header for all endpoints:

headers{
'Content-Type': 'application/x-www-form-urlencoded'
}

## Endpoints

POST localhost:8000/api/signup --> Body {
'firstName': '',
'lastName': '',
'email': '',
'password': '',
'username': ''
}

POST localhost:8000/api/validate-account --> Body {
'otpCode': '',
'email': ''
}

POST localhost:8000/api/signin --> Body {
'email': '',
'password': ''
}

PUT localhost:8000/api/refresh-token --> Body {
'sessionId': ''
}

POST localhost:8000/api/signout --> Body {
'sessionId': ''
}

## with this endpoints we need to use Authorization type Bearer Token

POST localhost:8000/api/books --> Body {
'title': '',
'author': '',
'publicationDate': '',
'NumberOfPages': ''
}

GET localhost:8000/api/books

PUT localhost:8000/api/books/:id --> (include fields that need to be updated) Body {
'author': '',
'publicationDate': '',
}

GET localhost:8000/api/books/:id

DELETE localhost:8000/api/books/:id

```

```

## Some configrations

in this application I used some important configrations like
1- brevo: for sending emails
2- docker: for create container for redis caching and create another container for postgres database

## It's very important to enable emails to receive otp

## without cahing the emails are will never send
