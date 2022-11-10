# Ensure you have proper env variables set. (Refer to .env.sample)

# Auth Api Calls

## Auth Setup

We are using POSTGRESQL as our database. So, you need to have a postgresql server running on your machine. You can install it from [here](https://www.postgresql.org/download/).`

- Make sure that DATABASE_URL is in the root .env file
- Install all dependencies with `yarn install`
- Deploy schema to database

### Development
```bash
yarn prisma migrate dev --name init
```

or 

### Production
```bash
yarn prisma migrate deploy
```

## GET /auth/check
returns a block of data that is being stored in the session

### example response: 
```json
{
    "loggedIn": true,
    "user": {
        "id": "cl9qhrfi600000jxgebseu79e",
        "email": "email@email.com",
        "name": "Test"
    }
}
```

## POST /auth/login
given the username and password, it will return a block of data with the status code 400 if the login failed and 200 if the login was successful

### example request:
```json
{
    "email": "email@email.com",
    "password": "password"
}
```

### example response:
```json
{
    "message": "User logged in",
    "success": true
}
```

## POST /auth/logout
with no input, it will return a block of data with the status code 200 if the logout was successful

### example response:
```json
{ 
    "message": 'User logged out', 
    "success": true 
}
```

## POST /auth/signup
given the username, email, and password, it will return a block of data with the status code 400 if the signup failed and 200 if the signup was successful

### example request:
```json
{
    "email": "email@email.com",
    "password": "12345",
    "name": "Test"
}
```

### example response:
```json
{
    "message": "User created",
    "success": true
}
```