# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "framzy",
  "password": "rahasia",
  "name": "Farden Ramzy"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "framzy",
    "name": "Farden Ramzy"
  }
}
```

Response Body Errors :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/login

Request Body :

```json
{
  "username": "framzy",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Errors :

```json
{
  "errors": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "New name", //Optional
  "password": "New password" //Optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "framzy",
    "password": "New password",
    "name": "New name"
  }
}
```

Response Body Errors :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "framzy",
    "password": "rahasia",
    "name": "Farden Ramzy"
  }
}
```

Response Body Errors :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Errors :

```json
{
  "errors": "Unauthorized"
}
```
