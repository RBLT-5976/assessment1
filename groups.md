**Get All Groups**
----
  Returns json data about all groups in the system.

* **URL**

  api/groups

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ "id": 1, "name": "g1" }, { "id": 2, "name": "g2" }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Groups are not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
    
**Get a Group**
----
  Returns json data about one group based on id.

* **URL**

  api/groups/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "id": 1, "name": "g1" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Group doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
    
 
 
**Add a Group**
  ----
  
  Returns json data about the added group.

* **URL**

  api/groups

* **Method:**

  `POST`
  
*  **URL Params**

  None
  
* **Data Params**

  **Content:** { "id": 5, "name": "group5" }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "id": 5, "name": "group5" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Group couldn't be add, group with the same id already exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
    
  
**Delete a Group**
----
  Returns json data about success.

* **URL**

  api/groups/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**

 `id=[integer]`
 
* **Data Params**

  None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"isSuccess":"true"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Group couldn't be found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
