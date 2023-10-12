const { getUsersRepository } = require('../repositories/user.repository');

const getUsers = async () => {
  return await getUsersRepository();
};

module.exports = { getUsers };
