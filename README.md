# Music Library

This is an app designed to perform CRUD requests on a locally-hosted PostgreSQL database. 

## Installation

Pull and run a docker image of PostgreSQL:

`docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres`

Install the project to your machine:

git clone `https://github.com/JordsCodes/music-library`


## Usage

Navigate to the root directory in your terminal and run:

`npm start`

Now that the project is running, we can make CRUD requests to the routes specified in the routes files for artists and albums. 

This will update the locally-hosted Artists and Albums tables.

For example, the user could make a POST request to http://localhost:3000/artists/.

The body of the request should be written in JSON:

`{ 
"name": "Oasis"
 "genre": "Rock"
}`

The user can also make GET, PUT, PATCH, and DELETE requests to routes `/artists`, `/artists/id/albums` and `/albums`. 

Please see the included test files for proper formatting of requests.

To view the Artist and Albums tables, I recommend using pgAdmin4.


## Credits

Command Shift:

https://github.com/CommandShiftHQ

Jordan Noble:

https://twitter.com/JordsCodes

https://www.linkedin.com/in/jordan-noble-a9b931267/




