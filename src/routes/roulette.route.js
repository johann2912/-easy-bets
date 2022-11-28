const router = require('express').Router();
const RouletteController = require('../controllers/roulette.controller');
const { validateCreateRoulette } = require('../middlewares/validations/createRoulette');
const controller = new RouletteController();

router.get('/all', controller.allRoulettes);
router.get('/id/:id', controller.rouletteById);
router.get('/name/:name', controller.roulettesByName);
router.post('/create/:document_number_user', validateCreateRoulette, controller.create);
router.delete('/delete/:roulette_id/:document_number_user', controller.deleteRoulette);

module.exports = router;