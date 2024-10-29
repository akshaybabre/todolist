## Setting Up Development Environment

To make development easier and avoid manually restarting the server, we use `nodemon` to automatically monitor changes in the `db.json` file and restart `json-server` when changes are detected.

### Step 1: Install `nodemon` Globally
To install `nodemon`, run the following command in your terminal:

## CMD
npm install -g nodemon

## Run json-server with nodemon
nodemon --watch db.json --exec "json-server --watch db.json --port 3000"

--watch db.json: Instructs nodemon to monitor db.json for any changes.
--exec "json-server --watch db.json --port 3000": Runs json-server with db.json on port 3000, allowing you to make CRUD requests at http://localhost:3000/todos
