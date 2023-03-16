## BE-Tech-Test
This is the Backend app for build an REst API for acronyms(a basic CRUD Operation). In this I created NodeJS Server with expressJS.

## Getting Started 
To get started with the app, you'll need to do the following: 
1. Clone the repo 
2. Install the dependencies using npm install 
3. Run the app using node index.js or nodemon index.js

## Endpoints

1. GET /acronym?page=1&limit=10&search=:search
2. POST /acronym - to create acronym with definition string and add that in mongoDB database
3. PATCH /acronym/:acronymID - To update the acronym for :acronymID
4. DELETE /acronym/:acronymID - To delete the acronym for :acronymID


