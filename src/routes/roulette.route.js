const router = require('express').Router();

router.get('/all');
router.get('/by-id/:id');
router.get('/by-email');
router.post('/create');
router.delete('/delete/:id');

module.exports = router;