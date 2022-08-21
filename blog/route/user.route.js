const router = require('express').Router();
const userController = require('../controller/user.controller');

router.get('/', userController.all);

router.get('/add', userController.add);

router.post('/add', userController.addLogic);

router.get('/edit/:id', userController.edit);

router.post('/edit/:id', userController.editLogic);

router.get('/single/:id', userController.single);

router.get('/delete/:id', userController.delete);

router.post('/single/:id', userController.comment);

// router.post('/single/:id', userController.addComment);

module.exports = router;