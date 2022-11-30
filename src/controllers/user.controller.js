const UserService = require('../services/user.service');
const errors = require('../errors');

class UserController {
    constructor() {
        this.userService = new UserService()
    };

    allUsers = async (req, res, next) => {
        try {
            const { document_number } = req.params;
            const user = await this.userService.userByDocumentNumber(document_number);
            if(user.user_type !== 0) throw errors.functions.generateStandard(
                errors.types.BAD_REQUEST,
                errors.messages.user.userNotAdmin,
            );
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

    myAllBets = async (req, res, next) => {
        try {
            const { document_number } = req.params;
            const user = await this.userService.userByDocumentNumber(document_number);
            if(!user) throw errors.functions.generateStandard(
                errors.types.BAD_REQUEST,
                errors.messages.user.notFoundUser,
            );
            const dataReturn = await this.userService.myAllBets(user);
            if(!dataReturn.length) throw errors.functions.generateStandard(
                errors.types.NOT_FOUND,
                errors.messages.user.notFoundUsers,
            );

            res.json(dataReturn);
        } catch (error) {
            next(error);
        }
    };

    myBetById = async (req, res, next) => {
        try {
            const { document_number, id } = req.params;
            const user = await this.userService.userByDocumentNumber(document_number);
            if(!user) throw errors.functions.generateStandard(
                errors.types.BAD_REQUEST,
                errors.messages.user.notFoundUser,
            );
            const dataReturn = await this.userService.myBetById(id, user);
            if(!dataReturn) throw errors.functions.generateStandard(
                errors.types.NOT_FOUND,
                errors.messages.user.userBetNotFound,
            );

            res.json(dataReturn);
        } catch (error) {
            next(error);
        }
    };

    userById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const dataReturn = await this.userService.userById(id);
    
            res.json(dataReturn)
        } catch (error) {
            next(error);
        }
    };

    userByDocumentNumber = async (req, res, next) => {
        try {
            const { document_number } = req.params;
            const dataReturn = await this.userService.userByDocumentNumber(document_number);
    
            res.json(dataReturn)
        } catch (error) {
            next(error);
        }
    };

    userByEmail = async (req, res, next) => {
        try {
            const { email } = req.params;
            const dataReturn = await this.userService.userByEmail(email);
    
            res.json(dataReturn)
        } catch (error) {
            next(error);
        }
    };

    loginUser = async(req, res, next) => {
        try {
            const { email, password } = req.params;
            const dataReturn = await this.userService.login(email, password);
    
            res.json(dataReturn)
        } catch (error) {
            next(error);
        }
    }

    createUser = async (req, res, next) => {
        try { 
            const dataReturn = await this.userService.createUser(req.body)
            res.json(dataReturn);
        } catch (error) {
            next(error);
        }
    };

    updateUser = async (req, res, next) => {
        try { 
            const { document_number } = req.params;
            const dataReturn = await this.userService.updateUser(
                document_number,
                req.body
            );
            
            res.json(dataReturn);
        } catch (error) {
            next(error);
        }
    };

    acquireCredit = async (req, res, next) => {
        try { 
            const { document_number } = req.params;
            const dataReturn = await this.userService.acquireCredit(
                document_number,
                req.body
            );
            
            res.json(dataReturn);
        } catch (error) {
            next(error);
        }
    };

    bettingCredits = async (req, res, next) => {
        try { 
            const { document_number, id } = req.params;
            const dataReturn = await this.userService.bettingCredits(
                document_number,
                id,
                req.body
            );
            
            res.json(dataReturn);
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req, res, next) => {
        try { 
            const { document_number } = req.params;
            const dataReturn = await this.userService.deleteUser(document_number)

            res.json(dataReturn);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = UserController;