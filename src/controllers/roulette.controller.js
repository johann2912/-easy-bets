const UserService = require('../services/user.service');
const RouletteService = require('../services/roulette.service');

class RouletteController { 
    constructor(){
        this.rouletteService = new RouletteService();
        this.userService = new UserService();
    };

    allRoulettes = async (req, res, next) => {
        try {
            const roulettes = await this.rouletteService.allRoulettes();
            
            res.json(roulettes);
        } catch (error) {
            next(error);
        }
    };

    rouletteById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const roulette = await this.rouletteService.rouletteById(id);
            
            res.json(roulette);
        } catch (error) {
            next(error);
        }
    };

    runningRoulette = async (req, res, next) => {
        try {
            const { id } = req.params;
            const roulette = await this.rouletteService.runRolutte(id);
            
            res.json(roulette);
        } catch (error) {
            next(error);
        }
    };

    roulettesByName = async (req, res, next) => {
        try {
            const { name } = req.params;
            const roulette = await this.rouletteService.rouletteByName(name);
            
            res.json(roulette);
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const { document_number_user } = req.params
            const user = await this.userService.userByDocumentNumber(document_number_user);
            if(user.user_type !== 0) throw errors.functions.generateStandard(
                errors.types.BAD_REQUEST,
                errors.messages.user.userNotAdmin,
            );
            const roulette = await this.rouletteService.create(req.body);

            res.json(roulette);
        } catch (error) {
            next(error);
        }
    }

    deleteRoulette = async (req, res, next) => {
        try {
            const { document_number_user, roulette_id } = req.params;
            const user = await this.userService.userByDocumentNumber(document_number_user);
            if(user.user_type !== 0) throw errors.functions.generateStandard(
                errors.types.BAD_REQUEST,
                errors.messages.user.userNotAdmin,
            );
            const roulette = await this.rouletteService.delete(roulette_id);

            res.json(roulette);
        } catch (error) {
            next(error);
        }
    };

};

module.exports = RouletteController;