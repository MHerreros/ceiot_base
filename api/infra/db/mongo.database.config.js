const { MongoClient } = require('mongodb');

const startDatabase = async uri => {
  const connection = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    monitorCommands: true,
  });
  return await connection.db();
};
module.exports = { startDatabase };
