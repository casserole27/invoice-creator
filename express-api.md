1. Install Node.js and npm from nodejs.org

2. Initialize project
 - choose a directory or `mkdir`
 - npm init -y
 - creates package.json file with default settings

3. Install Express
 - npm install express

4. Create the server file
 - `touch` server.js or app.js in project directory and open in code editor

5. Set up the server
```javascript
    const express = require('express');
    const app = express();
    const port = 3000;

    app.use(express.json()); //Middleware to parse JSON bodies

    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    //This code sets up a basic server that listens on port 3000 and responds with "Hello, World!" when the root URL is accessed.
```
 - can run the server here with `node server.js` terminal command

6. Create routes:
 - Create a `routes` folder with and `items.js` file --> best practice for maintainable code and adding additional routes
 - Define routes for creating, reading, updating, and deleting (CRUD)
 ```javascript
 //CRUD code goes here
 ```

 7. Run the server
  - Run the command `node server.js`

8. Test the API
 - test with Postman or curl
 - make GET, POST, PUT, and DELETE requests to the `/items` endpoint

9. Connect to database

```javascript
/***********API REQUESTS*************/

GET: retrieve data from the server
POST: typically used to create a new resource
PUT: create or update a resource
PATCH: partial updates to a resource
DELETE: delete a resource from the server

// DELETE items

