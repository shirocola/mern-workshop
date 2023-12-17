const express = require("express")
const router = express.Router()
const { create, getAllBlogs, getBlogBySlug, removeBlog, updateBlog } = require('../controllers/blogController')

router.post('/create', create)
router.get('/blogs', getAllBlogs)
router.get('/blog/:slug', getBlogBySlug)
router.delete('/blog/:slug', removeBlog)
router.put('/blog/:slug', updateBlog)


module.exports=router
