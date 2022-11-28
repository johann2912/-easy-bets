const { User } = require('../models/index');
const errors = require('../errors');
const bcrypt = require('bcryptjs');

class UserService {

    async allUsers(){
        const users = await User.findAll();
        return users;
    };

    async userById(id){
        const user = await User.findOne({
            id
        });
        if(!user) throw errors.functions.generateStandard(
            errors.types.NOT_FOUND,
            errors.messages.user.notFoundUser,
        );
        const { password, ...userData } = user.dataValues;

        return userData;
    };

    async userByDocumentNumber(document_number){
        const user = await User.findOne({
            document_number
        });
        if(!user) throw errors.functions.generateStandard(
            errors.types.NOT_FOUND,
            errors.messages.user.notFoundUser,
        );
        const { password, ...userData } = user.dataValues;

        return userData;
    };

    async userByEmail(email){
        const user = await User.findOne({
            email
        });
        if(!user) throw errors.functions.generateStandard(
            errors.types.NOT_FOUND,
            errors.messages.user.notFoundUser,
        );
        const { password, ...userData } = user.dataValues;

        return userData;
    };

    async login(email, passwordEntry){
        const user = await User.findOne({
            email
        });
        const { password, ...userData } = user.dataValues
        const comparePassword = bcrypt.compareSync(
            passwordEntry, password
        )
        if(!comparePassword)    throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.user.userNotCredentials,
        );

        return {
            login: true,
            user: userData
        };
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

    async updateUser(document_number, userData){
        const user = await User.findOne({ document_number });
        const { user_type } = user.dataValues
        if(user_type !== 0) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.user.userNotAdmin,
        );
        if(userData.nick_name) user.nick_name = userData.nick_name;
        if(userData.document_type) user.document_type = userData.document_type;
        if(userData.document_number) user.document_number = userData.document_number;   
        if(userData.email) user.email = userData.email;
        if(userData.user_type) user.user_type = userData.user_type;  
        const userUpdate = await user.save();
        
        return userUpdate;
    };

    async deleteUser(document_number){
        const user = await this.userByDocumentNumber(document_number);
        if(user.user_type !== 0) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.user.userNotAdmin,
        );
        await User.destroy({
            where: { 
                document_number: user.document_number 
            }
        });

        return 'user successfully deleted';
    };
};

module.exports = UserService;