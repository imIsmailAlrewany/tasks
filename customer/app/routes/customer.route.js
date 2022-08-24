const router = require('express').Router();
const Customer = require('../controller/customer.controller');
const auth = require('../middleware/auth.middleware');

router.post ('/register', Customer.register);
router.get ('/login', Customer.login);

router.patch('/edit/:id', auth, Customer.edit);
router.get('/profile/:id', auth, Customer.profile);
router.get('/logout/:id', auth, Customer.logout);

module.exports = router;