const Blog = require('../models/blog')

const blog_index = async (req, res) => {
    await Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('blogs/index', {title: 'All Blogs', blogs:result})
    })
    .catch((err) => {
        console.log(err)
    })
}

const blog_details = async (req, res) => {
    const id = req.params.id
    await Blog.findById(id)
    .then(result => {
        res.render('blogs/details', { blog: result, title: 'Blog Details'} )
    })
    .catch(err => {
        res.status(404).render('404', {title: '404'})
    })
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create New Blog'})
}

const blog_create_post = async (req, res) => {
    const blog = await new Blog(req.body)
    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err)
    })
}

const blog_delete = async (req, res) => {
    const id = req.params.id

    await Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'})
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}