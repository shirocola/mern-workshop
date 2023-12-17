const express = require("express")
const router = express.Router()
const { create, getAllBlogs, getBlogBySlug, removeBlog, updateBlog } = require('../controllers/blogController')
const { requireLogin } = require('../controllers/authController')

router.post('/create', requireLogin, create)
router.get('/blogs', getAllBlogs)
router.get('/blog/:slug', getBlogBySlug)
router.delete('/blog/:slug', requireLogin, removeBlog)
router.put('/blog/:slug', requireLogin, updateBlog)


module.exports=router
