const { MongoClient } = require('mongodb');

const uri = process.env.DB_URL;

const client = new MongoClient(
  'mongodb+srv://loghai:o1673665674@cluster0.7pajw.mongodb.net/testing-node?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DB connect Done !');
  }
});

module.exports = client.db(process.env.DB_NAME);
