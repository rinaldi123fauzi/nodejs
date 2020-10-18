const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { result } = require('lodash')

//express app
const app = express()

//connect to MongoDB
const dbURI = 'mongodb+srv://node:node123@nodetuts.a94l9.mongodb.net/note-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs')

//listen for requests
// app.listen(3000)

//middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))

//mongoose and mongo sandbox routes
    // app.get('/add-blog',(req, res) => {
    //     const blog = new Blog({
    //         title: 'new blog 2',
    //         snippet: 'about my new blog 2',
    //         body: 'more about my new blog 2'
    //     })
    //     blog.save()
    //     .then((result) => {
    //         res.send(result)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // })

    // app.get('/all-blogs', (req, res) => {
    //     Blog.find()
    //     .then((result) => {
    //         res.send(result)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // })

    // app.get('/single-blog', (req, res) => {
    //     Blog.findById('5f8c24536d62722a146af3b0')
    //     .then((result) => {
    //         res.send(result)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // })


//routes--------------------------------------
    app.get('/', (req, res) => {
        //res.send('<p>Hello</p>')
        // res.sendFile('./views/index.html', { root: __dirname })
        // const blogs = [
        //     {title: 'PHP', snippet: 'Lorem ipsum'},
        //     {title: 'RUBY', snippet: 'Lorem ipsum'},
        //     {title: 'NODE', snippet: 'Lorem ipsum'}
        // ]
        // res.render('index', {title: 'Home', blogs})
        res.redirect('/blogs')
    })

    app.get('/about', (req, res) => {
        res.render('about', {title: 'About'})
    })

    //blog routes
    app.get('/blogs', (req, res) => {
        Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs:result})
        })
        .catch((err) => {
            console.log(err)
        })
    })

    app.get('/blogs/create', (req, res) => {
        res.render('create', {title: 'Create'})
    })

    //redirects
        // app.get('/about-us', (req, res) => {
        //     res.redirect('/about')
        // })

    //404 page
    app.use((req, res) => {
        // res.status(404).sendFile('./views/404.html', { root: __dirname })
        res.status(404).render('404', {title: '404'})
    })
