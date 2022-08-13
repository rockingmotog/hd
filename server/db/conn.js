const { MongoClient } = require("mongodb");
const dburi = process.env.ATLAS_URI;
const client = new MongoClient(dburi, { useNewUrlParser: true, useUnifiedTopology: true });


var _db;

module.exports = {

    connectToServer: function (callback) {
        client.connect(function (db, err) {
            if (db) {
                _db = db.db("employees")
                console.log('Succesfully connected to the MongoDb')
            }
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    }
}