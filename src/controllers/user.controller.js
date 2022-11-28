const UserService = require('../services/user.service');
const errors = require('../errors');

class UserController {
    constructor() {
        this.userService = new UserService()
    };

    allUsers = async (req, res, next) => {
        try {
            const dataReturn = await this.userService.allUsers()
            if(!dataReturn.length) throw errors.functions.generateStandard(
                errors.types.NOT_FOUND,
                errors.messages.user.notFoundUsers,
            );

            res.json(dataReturn);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = UserController;