const { NOTFOUND } = require('sqlite3');
const { User } = require('../models/index');

class UserService {
    async allUsers(){
        const users = await User.findAll();
        return users;
    };
};

module.exports = UserService;