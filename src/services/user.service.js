const { User, HistoryBets, Roulette } = require('../models/index');
const errors = require('../errors');
const bcrypt = require('bcryptjs');

class UserService {

    async allUsers(){
        const users = await User.findAll();
        return users;
    };

    async userById(id){
        const user = await User.findOne({
            where: {
                id
            }
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
            where: {
                document_number
            }
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
            where: {
                email
            }
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
            where: {
                email
            }
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

    async myAllBets(user){
        const bets = await HistoryBets.findAll({
            include: [
                {
                   model: User
                },
                {
                    model: Roulette
                }
            ],
            where:{
                user_id: user.id
            }
        });

        return bets;
    };

    async myBetById(id, user){
        const bets = await HistoryBets.findOne({
            include: [
                {
                   model: User
                },
                {
                    model: Roulette
                }
            ],
            where:{
                id,
                user_id: user.id,
            }
        });

        return bets;
    };

    async createUser(data){
        const existUser = await User.findOne({
            where: {
                document_number: data.document_number
            }
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
        const user = await User.findOne({ 
            where: {
                document_number
            } 
        });
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

    async acquireCredit(document_number, newBalance){
        const user = await User.findOne({ 
            where: {
                document_number
            } 
        });
        const { user_type } = user.dataValues
        if(user_type !== 1) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.user.userNotClient,
        );
        /**
         * update new balance user
         */
        const oldBalance = user.balance;
        if(newBalance.balance) user.balance = Number(user.balance + newBalance.balance);
        const userWithNewBalance = await user.save();

        return {
            oldBalance,
            newBalance: user.balance,
            user: userWithNewBalance.dataValues,
        }
    }

    async bettingCredits(document_number, id, userDataBet){
        const user = await User.findOne({ 
            where: {
                document_number
            } 
        });
        const { user_type, balance } = user.dataValues
        if(user_type !== 1) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.user.userNotClient,
        );
        const roulette = await Roulette.findOne({ 
            where: {
                id
            } 
        });
        if(!roulette) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.roullete.notFoundRoulette,
        );
        const { minimum_bet_balance, number_min,  number_max, quota} = roulette.dataValues;
        if(balance < minimum_bet_balance) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.user.userInsufficientCredits,
        );
        if(userDataBet.number_bet < number_min) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.roullete.RouletteMinimumNumber,
        );
        if(userDataBet.number_bet > number_max) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.roullete.RouletteMaximumNumber,
        );

        /**
         * update new balance user
         */
        user.balance = Number(user.balance - userDataBet.balance_bet);
        await user.save();

        const bet = await HistoryBets.create({
            date_bet: new Date().toISOString(),
            balance_bet: Number(userDataBet.balance_bet),
            potential_gain: Number(userDataBet.balance_bet * quota),
            quota: Number(quota),
            number_bet: Number(userDataBet.number_bet),
            user_id: user.dataValues.id,
            roulette_id: roulette.dataValues.id,
        });
        
        return bet;
    };

    async bettingCredits(document_number, id, userDataBet){
        const user = await User.findOne({ 
            where: {
                document_number
            } 
        });
        const { user_type, balance } = user.dataValues
        if(user_type !== 1) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.user.userNotClient,
        );
        const roulette = await Roulette.findOne({ 
            where: {
                id
            } 
        });
        if(!roulette) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.roullete.notFoundRoulette,
        );
        const { minimum_bet_balance, number_min,  number_max, quota} = roulette.dataValues;
        if(balance < minimum_bet_balance) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.user.userInsufficientCredits,
        );
        if(userDataBet.number_bet < number_min) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.roullete.RouletteMinimumNumber,
        );
        if(userDataBet.number_bet > number_max) throw errors.functions.generateStandard(
            errors.types.BAD_REQUEST,
            errors.messages.roullete.RouletteMaximumNumber,
        );

        /**
         * update new balance user
         */
        user.balance = Number(user.balance - userDataBet.balance_bet);
        await user.save();

        const bet = await HistoryBets.create({
            date_bet: new Date().toISOString(),
            balance_bet: Number(userDataBet.balance_bet),
            potential_gain: Number(userDataBet.balance_bet * quota),
            quota: Number(quota),
            number_bet: Number(userDataBet.number_bet),
            user_id: user.dataValues.id,
            roulette_id: roulette.dataValues.id,
        });
        
        return bet;
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