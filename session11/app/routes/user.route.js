const router = require('express').Router();
const User = require('../controllers/user.controller');

router.get('/', User.index);
router.post('/register', User.create);
router.get('/single/:id', User.single);
router.delete('/single/:id', User.delete);
router.patch('/single/:id', User.edit); // || put

module.exports = router;