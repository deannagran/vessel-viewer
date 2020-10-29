//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
    db: {
        uri: 'mongodb+srv://aleusa:aleusa@cluster0.oqljz.mongodb.net/test?retryWrites=true&w=majority', //place the URI of your mongo database here.
    },
    jwt: {
        JWT_SECRET: 'h', // this is the secret server token password-- can be anything you want when you run locally
    }
};
