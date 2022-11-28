const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const controller = new UserController();

router.get('/all', controller.allUsers);
router.get('/:id');
router.get('/:email');
router.post('/create');
router.delete('/delete/:id');

module.exports = router;