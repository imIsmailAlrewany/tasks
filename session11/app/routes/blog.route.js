const router = require('express').Router();
const Blog = require('../controllers/blog.controller');

router.get('/', Blog.index);
router.post('/add', Blog.add);
router.get('/single/:id', Blog.single);
router.delete('/single/:id', Blog.delete);
router.patch('/single/:id', Blog.edit);

module.exports = router;