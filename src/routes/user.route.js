const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const { validateCreateUser } = require('../middlewares/validations/createUser');
const { validateUpdateUser } = require('../middlewares/validations/updateUser');
const { validateUserAcquireCredit } = require('../middlewares/validations/userAcquireCredit');
const { validateUserBettigCredits } = require('../middlewares/validations/userbettingCredits');
const controller = new UserController();

router.get('/:id', controller.userById);
router.get('/all/:document_number', controller.allUsers);
router.get('/document_number/:document_number', controller.userByDocumentNumber);
router.get('/email/:email', controller.userByEmail);
router.get('/login/:email/:password', controller.loginUser);
router.post('/create', validateCreateUser, controller.createUser);
router.post('/acquire-credits/:document_number', validateUserAcquireCredit, controller.acquireCredit);
router.post('/betting-credits/:document_number/roulette/:id', validateUserBettigCredits, controller.bettingCredits);
router.put('/update/:document_number',  validateUpdateUser, controller.updateUser)
router.delete('/delete/:document_number', controller.deleteUser);

module.exports = router;