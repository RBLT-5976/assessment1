**Get All Users**
----
  Returns json data about all users in the system.

* **URL**

  api/users

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"username":"super","email":"super@com.au","groupList":[],"adminGroupList":["g1","g2"],"ofGroupAdminsRole":true},      {"username":"paul","email":"paul@com.au","groupList":["g1","g2"],"adminGroupList":[],"ofGroupAdminsRole":true}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Users are not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
    
**Get a User**
----
  Returns json data about a single user.

* **URL**

  api/users/:username

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `username=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"username":"super","email":"super@com.au","groupList":[],"adminGroupList":["g1","g2"],"ofGroupAdminsRole":true}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
    
 
 
**Add a User**
  ----
  
  Returns json data about the added user.

* **URL**

  api/users

* **Method:**

  `POST`
  
*  **URL Params**

  None
  
* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"username":"myuser","email":"myuser@com.au","groupList":[],"adminGroupList":["g1","g2"],"ofGroupAdminsRole":true}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User couldn't be add, user with the same user name already exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
    
**Update a User**
----
  Returns json data about the updated user.

* **URL**

  api/users/:username

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**

 `username=[string]`
 
* **Data Params**

  **Content:** `{"username":"myuser","email":"myuser@com.au","groupList":[],"adminGroupList":["g1","g2"],"ofGroupAdminsRole":true}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"username":"myuser","email":"myuser@com.au","groupList":[],"adminGroupList":["g1","g2"],"ofGroupAdminsRole":true}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User couldn't be found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
  
**Delete a User**
----
  Returns json data about success.

* **URL**

  api/users/:username

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**

 `username=[string]`
 
* **Data Params**

  None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"isSuccess":"true"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User couldn't be found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
