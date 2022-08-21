const {MongoClient} = require('mongodb');
const dbURL = 'mongodb://localhost:27017';

const myConnection = (callback) => {
    MongoClient.connect(dbURL, {}, (err, client) => {
        if (err) return callback(err, false);
        const connection = client.db('blogs');
        callback(false, connection);
    });
}

const myComment = (callback) => {
    MongoClient.connect(dbURL, {}, (err, client) => {
        if (err) return callback(err, false);
        const connection = client.db('comments');
        callback(false, connection);
    });
}

module.exports = {myConnection, myComment};