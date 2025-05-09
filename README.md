# Proyecto1_Backend_Bookstore
This an api ceated to manage data related with a Bookstore. It was made for academical purposes.

### Prerequisites

You should have mongoDB installed previously if not you can install it in 
[installation Mongo](https://www.mongodb.com/docs/manual/administration/install-community/) 

## Installation

In order to install the project you must make:
```bash
git clone <url-of-this-repository>
```

After that you must make a .env file following the .env.example


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
* [MongoDB](https://www.typescriptlang.org) - DB engine.
* [JWT](https://jwt.io) - Authentication .


## Endpoints

# Users

Read - login - Post
baseURl/API/users

---valid input </br>
```javascript
{</br>
"email":"antonio@hotmail.com",</br>
"password":"anto123"</br>
}</br>
```
Create - Post
baseURl/API/users/create

---valid input </br>
```javascript
{ </br>
    "name": "Antonio",</br>
    "email": "antonio@hotmail.com",</br>
    "password": "anto123",</br>
    "rol": "admin",</br>
    "permissions":  \["update someoneelse",  "delete someoneelse",] ,</br>
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",</br>
    "phone": "+3145645664566",</br>
    "address": "Cll 23 Kra 34 Barranquilla"</br>
}</br>
```
Delete - Delete
baseURl/API/users/:email

Update - Patch 
baseURl/API/users/:email

---valid input </br>
```javascript
{</br>
    "name": "Antonio",</br>
    "email": "antonio@hotmail.com",</br>
    "password": "anto321",</br>
    "rol": "admin",</br>
    "permissions":  \["update someoneelse",  "delete someoneelse", "create"] ,</br>
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",</br>
    "phone": "+3145645664566",</br>
    "address": "Cll 23 Kra 34 Barranquilla"</br>
}</br>
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
```javascript
{</br>
  "publishDate": "1953-03-05",</br>
  "title": "Fahrenheit 451",</br>
  "author": "Ray Bradbury",</br>
  "genre": "Novela",</br>
  "editorial": "Planeta",</br>
  "amount": 2000,</br>
  "availableAmount": 50,</br>
  "description": "Fahrenheit 451 es una novela distópica del escritor estadounidense Ray Bradbury, publicada en 1953 y </br>
  considerada una de sus mejores obras.​ La novela presenta una sociedad estadounidense del futuro en la que los libros </br>
  están prohibidos y existen «bomberos» que queman cualquiera que encuentren.​",</br>
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsB_fnDOrkPWxstj7bpcajLhTAO2eYL7FzAQ&s"</br>
}</br>

```
Delete - Delete
baseURl/API/books/:id

Update - Patch 
baseURl/API/books/:id

fields that are not going to be updated can be omitted, for example: 
---valid input </br>
```javascript
{ </br>
  "publishDate": "1952-03-05", </br>
  "description": "Fahrenheit 451 es una novela distópica del escritor estadounidense Ray Bradbury,</br>
  publicada en 1953 y considerada una de sus mejores obras.​"</br>
}</br>
```
