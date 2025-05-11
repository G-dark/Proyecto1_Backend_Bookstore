# Proyecto1_Backend_Bookstore
This is an api ceated to manage data related with a Bookstore. It was made for academical purposes.

### Prerequisites

You should have mongoDB installed previously if not you can install it in 
[installation Mongo](https://www.mongodb.com/docs/manual/administration/install-community/) 

## Installation

In order to install the project you must make:
```bash
git clone <url-of-this-repository>
```

After that you must make a .env file following the .env.example
```dotenv
APP_PORT=3000
MONGO_URI=YOUR_CONECTION
SALT_OR_ROUNDS=20
JWT_SECRET=YOUR_SECRET
PEPPER=YOUR_PEPPER
```

## Usage

if you want to start the project, you can run any of the following scripts

```bash
npm run build
npm run start
```
or if you are in dev mode 
```bash
npm run dev
```


## Technologies

* [Express](https://expressjs.com/es/) - Web Enviroment Used.
* [Typescript](https://www.typescriptlang.org) - Language.
* [MongoDB](https://www.mongodb.com) - DB engine.
* [JWT](https://jwt.io) - Authentication .


## Endpoints

# Users

Read - login - Post
baseURl/API/users

---valid input </br>
```json
{
"email":"antonio@hotmail.com",
"password":"anto123"
}
```
Create - Post
baseURl/API/users/create

---valid input </br>
```json
{ 
    "name": "Antonio",
    "email": "antonio@hotmail.com",
    "password": "anto123",
    "rol": "admin",
    "permissions":  ["update someoneelse",  "delete someoneelse"] ,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
    "phone": "+3145645664566",
    "address": "Cll 23 Kra 34 Barranquilla"
}
```

---valid input required fields </br>
```json
{ 
    "email": "antonio@hotmail.com",
    "password": "anto123"
}
```
Delete - Delete
baseURl/API/users/:email

Update - Patch 
baseURl/API/users/:email

---valid input </br>
```json
{
    "name": "Antonio",
    "email": "antonio@hotmail.com",
    "password": "anto321",
    "rol": "admin",
    "permissions":  ["update someoneelse",  "delete someoneelse", "create"] ,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
    "phone": "+3145645664566",
    "address": "Cll 23 Kra 34 Barranquilla"
}
```
---valid input </br>
```json
{
    "permissions":  ["update someoneelse",  "delete someoneelse", "create"] ,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
    "phone": "+3145645664566",
    "address": "Cll 23 Kra 34 Barranquilla"
}
```

# Books

Read - Get by id
baseURl/API/books/:id

Read - Get by amount
example:
baseURl/API/books/?autor=Gabriel Garcia Marquez&nombre=Cien años de soledad&disponibilidad=false&fechaPublicacion=1980-12-05&editorial=Planeta

Create - Post
baseURl/API/books

---valid input </br>
note: image isn't required
```json
{
  "publishDate": "1953-03-05",
  "title": "Fahrenheit 451",
  "author": "Ray Bradbury",
  "genre": "Novela",
  "editorial": "Planeta",
  "amount": 2000,
  "availableAmount": 50,
  "description":  "Fahrenheit 451 es una novela distópica del escritor estadounidense Ray Bradbury, publicada en 1953...",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsB_fnDOrkPWxstj7bpcajLhTAO2eYL7FzAQ&s" 
}

```
Delete - Delete
baseURl/API/books/:id

Update - Patch 
baseURl/API/books/:id

fields that are not going to be updated can be omitted, for example: 
---valid input </br>
```json
{ 
  "publishDate": "1952-03-05", 
  "description": "Fahrenheit 451 es una novela distópica del escritor estadounidense Ray Bradbury,..."
}
```
