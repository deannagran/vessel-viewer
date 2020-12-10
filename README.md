## _**PLEASE READ THIS TO COMPLETION BEFORE ASKING ANY QUESTIONS!**_
Vessel Viewer is an app made for the external company Digital Twin Marine, as part of UF's CEN3031 course. This app allows clients to view their custom VR vessel models and securely share the vessel project page with other employees. 

### _**IMPORTANT NOTES**_ - 
1. Never push anything from your node_modules folder to this repo. 
2. You can reconfigure the current MongoDB setup for local development or production use. See corresponding instructions below:

- Local development: create a config file (make sure to name it config.js) in the config folder, which exports your db.uri connection. An example is provided, config/config.example.js. This file will be ignored by git so your DB credentials will be kept safe when the app is deployed. Note: for local development, any files with Axios post requests must be changed to localhost:5000. If this is not done, the router will not behave as anticipated. 

For example, line 24 in client/Dashboard.js: `associatedVessels = await Axios.post(url + "/users/findVessel" `
should be changed to: `associatedVessels = await Axios.post("http://localhost:5000/users/findVessel"`

## Run these commands to get started!

### `npm install`
### `npm install yarn -g`
### `cd server && npm install`
### `cd client && npm install`


## Getting Started
To get started, make a copy of this template repo for your project team.
Since this project will hold both the client application and the server application, there will be node modules in two different places. First, run `npm install` and `npm install nodemailer` from the root. After this, you will run `cd server && npm install and cd client && npm install` from the root.
Then you will want to create a config.js file in /server/config which will contain the MongoDB URI and JSONWebToken password. This file will be ignored by git, so your credentials will be kept safe.
As the application grows, you may want to add or modify existing functions. You can find all of the components that we created to set up the website in /client/src/views and /server/mail. Accordingly, in /server/routes/userRouter, you can find all the URLs that the HTTPS requests are routed to.

## Available Scripts

### `yarn workspace client start`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `yarn workspace server start`

Runs just the server in development mode.<br>


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri and JSON web token password
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `mail` - This holds all of the function that used in the mail-related router.
- #### `middleware` - This is where we define the middleware which will protect selected routes.
- #### `models` - This holds all of our data models, namely our user model
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!

## Source Credits
1. Some of Vessel Viewer's backend was made using Devistry's MERN Stack user auth tutorial (namely AuthOptions.js and the /login, /register, and /tokenIsValid routers within userRouter). Check him out here: https://www.youtube.com/watch?v=4_ZiJGY5F38&ab_channel=Devistry
2. This project's primary directory structure was built using Dakota Rennemann's MERN Template code. https://github.com/rennemannd/MERN-Template
3. Certain frontend elements (contact form, icons) were referenced from MDBootstrap here: https://mdbootstrap.com/docs/jquery/forms/contact/
4. All sample vessel models are property of Digital Twin Marine. https://digitaltwinmarine.com/