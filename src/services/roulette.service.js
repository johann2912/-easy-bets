const { Roulette, ResultRoulette } = require('../models/index');
const errors = require('../errors');

class RouletteService {

    async allRoulettes(){
        const roulettes = await Roulette.findAll();
        if(!roulettes.length)throw errors.functions.generateStandard(
            errors.types.NOT_FOUND,
            errors.messages.roullete.notFoundRoulettes,
        );
        
        return roulettes
    };

    async rouletteById(id){
        const roulette = await Roulette.findOne({
            where: {
                id
            }
        });
        if(!roulette)throw errors.functions.generateStandard(
            errors.types.NOT_FOUND,
            errors.messages.roullete.notFoundRoulette,
        );

        return roulette
    };

    async rouletteByName(name){
        const roulette = await Roulette.findOne({
            where: {
                name
            }
        });
        if(!roulette)throw errors.functions.generateStandard(
            errors.types.NOT_FOUND,
            errors.messages.roullete.notFoundRoulette,
        );

        return roulette.dataValues
    };

    async create(data){
        const existRoulette = await Roulette.findOne({
            where: {
                name: data.name
            }
        });
        if(existRoulette)throw errors.functions.generateStandard(
            errors.types.NOT_FOUND,
            errors.messages.roullete.rouletteExist,
        );
        const roulette = await Roulette.create(data);

        return roulette.dataValues;
    }

    async delete(id){
        const roulette = await this.rouletteById(id);
        await Roulette.destroy({
            where: { 
                id: roulette.id 
            }
        });

        return 'roulette successfully deleted';
    };

    async runRolutte(id){
        const roulette = await this.rouletteById(id);
        const { number_min, number_max, name } = roulette.dataValues;
        /**
         * generate result rulette
         */
        const result = Math.random()*(number_max - number_min) + number_min;
        const resultSplit = `${result}`.split('.')[0];
        const result_date = new Date().toISOString();
        await ResultRoulette.create({
            result: Number(resultSplit),
            result_date,
            roulette_id: roulette.dataValues.id,
        })

        return {
            name_roulette: name,
            result: Number(resultSplit),
            date: result_date,
        }
    };
};

module.exports = RouletteService;