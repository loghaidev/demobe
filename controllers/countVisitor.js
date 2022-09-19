const db = require('../configs/db');
const { ObjectId } = require('mongodb');
const countVisitor = db.collection('countVisitor');

const count = async (req, res) => {
  if (req.query.code) {
    try {
      await countVisitor.updateOne(
        { _id: ObjectId(req.query.code) },
        { $inc: { visitor: 1 } }
      );
      res.send('Update success');
    } catch (e) {
      res.status(500).send('Internal server');
    }
  } else {
    res.status(400).send('Missing params "code"');
  }
};

module.exports = {
  count,
};
