const { User } = require('../models/index');
const errors = require('../errors');
const bcrypt = require('bcryptjs');

class UserService {
    async allUsers(){
        const users = await User.findAll();
        return users;
    };

    async createUser(data){
        const existUser = await User.findOne({
            document_number: data.document_number
        });
        if(existUser) throw errors.functions.generateStandard(
            errors.types.FORMAT_ERROR,
            errors.messages.user.userExist,
        );
        /**
         * encrypt user password
         */
        data.password = bcrypt.hashSync(data.password, 10);
        const user = await User.create(data);
        const { password, ...userData } = user.dataValues;

        return userData;
    };
};

module.exports = UserService;