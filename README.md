# Mesq Api

## Description
Personal project created with Node.Js using MySQL + Sequelize, the aim of this project was learn more about ORM and rest APIs.

## Setting Up
First of all you need to create and fill a '.env' file with all information that you can see on file '.env.example'.

![.env.exemple](https://cdn.discordapp.com/attachments/482730270299258885/836290561144389632/env2.png)

After that just run following commands:

- `npm install`  Install dependencies
- `npx sequelize db:create`  Create database
- `npx sequelize db:migrate`  Run database migrations
- `npm start`  Finally run the server

At this point if you done everything correctly your server should be running on your choosen `APP_HOST:APP_PORT`.

## 🚀 Techs used
- <img src="https://cdn.jsdelivr.net/npm/programming-languages-logos@0.0.3/src/javascript/javascript_16x16.png"> Javascript
- <img src="https://github.com/devicons/devicon/blob/master/icons/mysql/mysql-original.svg" width=16px heigth=16px> MySQL 
- <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" width=16px heigth=16px> NodeJs
- <img src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" width=16px height=16px> Npm
- <img src="https://github.com/devicons/devicon/blob/master/icons/sequelize/sequelize-original.svg" width=16px height=16px> Sequelize
- 🔒 JWT
- ☕ Coffe 


# ![](https://cdn.discordapp.com/attachments/695442261877719050/836389514107682826/routes.png)Endpoints

**Home**
----
  Return status of the application.

* **URL**

  /

* **Method:**

  `GET`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "status" : "Running","time": "TIMESTAMP" }`
----

**Create User**
----
  Create an user in database using payload info.

* **URL**

  /users/create

* **Method:**

  `POST`

* **Data Params**

  ```json
  {
    "name":"john",
    "email": "john_doe@example.com",
    "password": "goodPassword"
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
        "name": "john",
        "email": "john_doe@example.com",
        "created_at": "0000-00-00T00:00:00.000Z"
    }
    ```

* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : "User already exists" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "error" : "Fields are in wrong format" }`
----

**Show User**
----
  Return json info about a single user.

* **URL**

  /users/:id

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[integer]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "john",
        "email": "john_doe@example.com",
        "created_at": "0000-00-00T00:00:00.000Z"
    }
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error" : "User not found" }`

----

**Login User**
----
Returns a authentication token.

* **URL**

  /users/login

* **Method:**

  `POST`

* **Data Params**

  ```json
  {
    "email": "john_doe@example.com",
    "password": "goodPassword"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "user": "john",
        "token": "$3X4mpl3T0k3n$"
    }
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "error" : "Fields are in wrong format" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error" : "Wrong username/password" }`

----

**Delete User**
----

* **URL**

  /users/delete

* **Method:**

  `DELETE`

*  **Headers**

   **Required:**

   `authorization: "Bearer token"`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "delete": true,
        "msg": "User john deleted"
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : "auth required" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error" : "User not found" }`
____

**Show all Publications**
----
  Return json info about all publications.

* **URL**

  /publications

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    [
        {
            "id": 1,
            "title": "title of Publi",
            "description": "description of Publi",
            "content": "content of Publi",
            "updated_at": "0000-00-00T00:00:00.000Z",
            "created_at": "0000-00-00T00:00:00.000Z",
            "user": {
                "id": 1,
                "name": "john",
                "email": "john_doe@example.com"
            },
            "categories": [
                { "tag" : "tag1" },
                { "tag" : "tag2" }
            ]

        },
        {
            "OTHERS" : "PUBLICATIONS..."
        }
    ]
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error" : "No publications found" }`

----
**Show Publications by category**
----
  Return json info about all publications of specific category.

* **URL**

  /publications/category/:category_name

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `category_name=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    [
        {
            "id": 1,
            "title": "title of Publi",
            "tag": "someTag",
            "content": "content of Publi",
            "description": "description of Publi",
            "user_id": 1,
            "email": "john_doe@example.com",
            "created_at": "0000-00-00T00:00:00.000Z"
        },
        {
            "OTHERS" : "PUBLICATIONS..."
        }
    ]
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error" : "No publications found" }`

----
**Search Publications by string**
----
  Return json info about all publications which match description or title with query_string.

* **URL**

  /publications/search?q=query_string

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    [
        {
            "id": 1,
            "title": "title of Publi",
            "content": "content of Publi",
            "description": "description of Publi",
            "user_id": 1,
            "email": "john_doe@example.com",
            "created_at": "0000-00-00T00:00:00.000Z"
        },
        {
            "OTHERS" : "PUBLICATIONS..."
        }
    ]
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error" : "No publications found" }`

----
**Show Publications of specific User**
----
  Return json info about publications of an user specified in url.

* **URL**

  /publications/user/:id

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `?q=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    [
        {
            "id": 1,
            "title": "title of Publi",
            "description": "description of Publi",
            "content": "content of Publi",
            "updated_at": "0000-00-00T00:00:00.000Z",
            "created_at": "0000-00-00T00:00:00.000Z",
            "user": {
                "id": 1,
                "name": "john",
                "email": "john_doe@example.com"
            },
            "categories": [
                { "tag" : "tag1" },
                { "tag" : "tag2" }
            ]

        },
        {
            "OTHERS" : "PUBLICATIONS..."
        }
    ]
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error" : "User not found" } OR { "error" : "No publications found" } `

----

**Create Publication**
----
Create a publication
* **URL**

  /publications/create

* **Method:**

  `POST`

* **Data Params**

    ```json
    {
        "title": "title of Publi",
	    "description": "description of Publi",
	    "categories": ["tag1","tag2","tag3"],
	    "content": "content of Publi"
    }
    ```

*  **Headers**

   **Required:**

   `authorization: "Bearer token"`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
        "id": 1,
        "title": "title of Publi",
        "content": "content of Publi",
        "description": "description of Publi",
        "user_id": 1,
        "created_at": "0000-00-00T00:00:00.000Z",
        "updated_at": "0000-00-00T00:00:00.000Z"
    },
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : "auth required" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error" : "User not found" }`

----

**Delete User**
----

* **URL**

  /users/delete/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**

   `id=[integer]`

*  **Headers**

   **Required:**

   `authorization: "Bearer token"`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "delete": true,
        "msg": "Publication |Name of publication| deleted"
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : "auth required" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error" : "this publication does not exists" }`
____
