# NewHome
Welcome to NewHome, a pet adoption, social experience! You can keep track of pets that your are willing to adopt and take care of any animals you want! 
<h1>
<h1>

## Installation:
To start the application you will need to take the following steps:
* run  ``` npm install ``` to to install dependencies which will also create the neccesarry ``node_modules`` for those dependencies
* run ```npm run build``` to start the webpack compiler (this script can be found in the `package.json`)
* run ```npm start``` to start the server (this script can be found in the `package.json`)
* Once you have the server running you can navigate to  http://localhost:8080/home which will bring you to our home page!
<h1>
<h1>

## Client side: 
* This directory will contain the ```dist``` directory (which is created after running the compiler) as well as the ```src ``` directory which will contain the ```components``` folder.
* Also within this directory the ```index.js```, ```styles.jsx```, ```breed.js```, and ```UserContext.jsx``` files will exist. 
<h1>

 ## Within the ``src/components`` directory:

 ### Adoption.jsx:

  * This component will render each pet adoption entry that is coming from the PetFinder API. This view will show the pets photo(if included in the api), the pets provided description, as well as the pets name, on a `<Grid>` material UI component
  * It utilizes the UserContext to handle the 'liked (heart)' or 'unliked' status by utilizing a global 'savedPets' array that is being passed down from the UserContext, and will render it's 'liked' status respectivly. 
  * This component also has a couple click handling functions, `handleSavePet()` and `handleUnsave()` which are event handlers that query the database via `axios` and update it's 'in savedList' status and then uses conditional rendering to render the proper heart which idicates that specific pets' status
  * There is another event handling function that is triggered after clicking the `view more` button, which will redirect the user to the `PetView.jsx` component. 
 
  
 ### AdoptionFeed.jsx:

  * This component will use conditional rendering via a function call to render either the mapped through instances of Adoption entries that are being retrieved from an axios `GET` request and then being saved to the `animals` state. 
  * OR if there are no results from the  `axios` request yet, then it will render the `Loading.jsx` component until there is data saved in the `animals` state. 
 
 ### App.jsx:

  * This component is what renders all of the other components as well as the navigation bar. 
  * The navigation bar utilizes `React router` to 

 ### Login.jsx:

  * This component will render a `sign-in` button and a `log-in` through google button. When clicked, it goes to the `/auth/google` route taking you to the google page so the user can choose which google account to use and to give google consent to access validation through them. After successfully logging in the page is directed to the `Profile.jsx` page. On failure, the page is redirected back to the `Login.jsx` page.

 ### PetView.jsx:

  * This component will render the full view of the single focused pet that is clicked where you will be able view more information about the pet, save the pet, as well as the option to adopt the pet as well
  
 ### Post.jsx:

  * This component will render the posts from a user regarding a pet they have adopted, with the option to click on the post to see more about the pet.
 
 ### PostFeed.jsx:

  * This component will render a list of Post components in a single column.

 ### PostForms.jsx:

  * This component will render and recieve the user inputs to create a post regarding a pet they have adopted.

### Profile.jsx:

  * This component has an axios `GET` request to go to the `/proAuth` route in the server and sets the user profile in state and also renders the user photo along with their name as its is in google's data.
    * On success, it has an axios POST request that goes to the `/user` endpoint and sends the user data. On failure, redirect to `/Login` page.
  * If user exists, after both previous routes succeed, another axios `GET` route goes to the `/pet/savePet/${user.id}` endpoint to get the users saved pet list from the database and renders it to the `Profile.jsx` page.
  * It will render a logout button that will terminate sessions. When clicked, it goes to the `/logout` route in the server. On success,redirected back to the `Login.jsx` page.
  * There is a favorited pet list, imported from `./SavedList.jsx` that showes all the pets that the user has favorited
  * There is a saved pet list, imported from `./SavedList.jsx` that showes all the pets that the user saved
  * There is a followed pet list, imported from `./SavedList.jsx` that showes all the pets that the user is following

### Search.jsx:

  * Here you can search for different pets by your specifications! You can search by breed, by animal type, by hair length, size, and gender!
  * This component will render a list of animals that meet these specifications, and will give you the ability to view more and focus on a specific animal that a user is interested in

<h1>
<h1>

## Server Side and Backend:
  * This server directory will be the magic that connects the frontend to both the PetFinder api, as well as the mongoDB database that we have for user, and pet information. 

  * Within this ``server`` directory you will find the `db` folder as which will containg the `models` folder, `index.js` file for the database connection, and the `mongoSchmema.js` file which will contain the schemas for every model created in the program

  * The `routes` directory will also exist within the `db` folder which will contain the neccesarry express router request functions to their respective models. 

  * Within the 'server' folder, the `index.js` file which connects the express server to the program, will reside. 

#### db/index.js: 

  * creats the moongoose database connection and utilizes the mongoURI as well as username and password that is contained in the `.env` file. Each developer on this project will need to get their own username/password and personal mongoDB URI and stored exactly as the `.env` example in this `README`

#### db/models/index.js: 

  * Stores all the `mongoose models` in an index file

#### mongoSchema.js:
  
  * creates the mongoose models - `userSchema, petSchema, postSchema, followersSchema, and savedPetSchema,`
<h1>
 
## Within the `db/models` directory: 

  ### Follower.js: 

  * Creates and exports the Follower mongoose model.

  ### Pet.js: 

  * Creates the model for the Pet model based off of the schema wich will export the Pet that is being used/ manipulated in the database

  ### Post.js: 

  * Creates and exports the Post mongoose model.

  ### SavedPet.js: 

  * Creates and exports the SavedPet mongoose model.

  ### User.js: 

  * Creates and exports the User mongoose model.
  <h1>

## Within the `db/routes` directory:

  ### index.js: 

  * Contains and exports all the express.Router routes from the `db/routes` folder.

  ### feed.js: 

  *  Handles api request and DB request helper function to get api page, handles options for search, if theres a fail then helper to get api authorization then runs helper function to get api page.

  ### pet.js: 

  * Contains the endpoints related to accessing and manipulating pets in the database and from the api. 

  ### user.js: 

  * Contains an express.Router `POST` that gets the user, using the users 'googleID', from mongoDB, if not found, creates and saves to thee DB
<h1>
<h1>


## Ignored/hidden files:
  * These files contain necesarry information for the apis 

  ### .env:

  * This file contains the neccesarry examples to match all places where `.env` credentials are used. These fields need to be filled with each developers own credentials.
 #### These values will hold reference to any user in our databasea:
    * DB_USER= 
    * DB_PASS=
 #### These are neccesarry for the petfinder API:
    * API_KEY= 
    * API_SECRET= 
    * API_AUTH= 
 #### These are for the google Oauthentication:
    * GOOGLE_CLIENT_ID= 
    * GOOGLE_CLIENT_SECRET= 
    * GOOGLE_CALLBACK_URL= 
  #### These are for the A3 storage buckets: 
    * STORJ_API_KEY =
    * STORJ_API_SECRET =
    * STORJ_API_URL =
  
  ### .gitignore:

  * node_modules
    .env
    client/dist/bundle.js

<h1>
<h1>


## Formatting and Linting:
  * These are going to be files that will create formatting rules 

   ### .eslintrc.json:
    
   * This is the file where the actual rulings for eslint exists, some 'best practices' are disabled for usability purposes since some files need to be written a certain way, in which eslint doens't "like"

   ### .eslintignore: 
  
  * this file references the neccesarry file paths for eslint to ignore entirely 

   ### .prettierignore: 

   * Similar to eslint, this file will contain styled rulings for the overall syntax of the project, which will handle any formatting issues that it deems appropriate to interpret in such a way. 

   ### .prettierrc: 

   * Contains the rules for how prettier will style and format the code.

   <h1>
  <h1>
  
