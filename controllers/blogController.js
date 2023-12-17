//connect with DB
const slugify = require('slugify');
const Blogs = require('../models/blog');
const { v4: uuidv4 } = require('uuid');
// submit data to DB
exports.create=(req, res)=>{
	const {title, content, author} =req.body;
	let slug = slugify(title);

	//validation
	if(!slug)slug=uuidv4();

	switch(true){
		case !title:
			return  res.status(400).json({error:"Title is required"});
			break;
		case !content:
			return res.status(400).json({error:"Content is required"});
			break;
	};
	// save data to DB
	Blogs.create({title, content, author, slug})
		.then(blog => {
			res.json(blog);
		})
		.catch(err => {
			res.status(400).json({error:"Duplicate title" });
		})
}
// get all blogs
exports.getAllBlogs= async (req, res)=>{
	try {
		const blogs = await Blogs.find({}).sort({createdAt: -1});
		res.json(blogs);
	} catch (err) {
		console.log(err);
	}
		
}

//get blog by slug
exports.getBlogBySlug= async (req, res)=>{
	try {
		const blog = await Blogs.findOne({slug: req.params.slug})
		res.json(blog);
	} catch (err) {
		console.log(err);
	}
}


//delete blog by slug
//delete blog by slug
exports.removeBlog = async (req, res) => {
    try {
        const blog = await Blogs.findOneAndDelete({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.json(blog);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
}

//update blog by slug
exports.updateBlog = async (req, res) => {
	try {
		const {slug} = req.params;
		const {title, content, author} = req.body;
		const updated = await Blogs.findOneAndUpdate({slug}, {title, content, author}, {new: true});
		res.json(updated);
	}catch(err){
		console.log(err);
	}
}


//localhost:8080//install-postman