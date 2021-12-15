
const { MongoClient } = require('mongodb');

const uri = process.env.DB_URL;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB connect Done !");
    }
});

module.exports = client.db(process.env.DB_NAME);
