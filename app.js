const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { result } = require('lodash')
const blogRoutes = require('./routes/blogRoutes')
const Blog = require('./models/blog')
const AuthRoutes = require('./routes/authRoutes')
const jwt = require('jsonwebtoken')


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
app.use(express.urlencoded({extended: true})) //for form data
app.use(express.json())
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
    app.use('/blogs', blogRoutes)

    //auth routes
    app.use('/api', AuthRoutes)

    app.post('/api/blog/input', verifyToken, (req,res) => {
        const blog = new Blog({
            title: req.body.title,
            snippet: req.body.snippet,
            body: req.body.body
        })
        jwt.verify(req.token, 'verySecretValue', (err, authData) => {
            if (err){
                res.sendStatus(403)
            }else{
                blog.save()
                .then((result) => {
                    res.send(result)
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        })
    })

    //FORMAT OF TOKEN
    //Authorization : Bearer <access_token>

    //verifyToken
    function verifyToken(req, res, next){
        //Get auth header value
        const bearerHeader = req.headers['authorization']
        //Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined'){
            //Split at the space
            const bearer = bearerHeader.split(' ')
            //Get token from array
            const bearerToken = bearer[1]
            //Set the token
            req.token = bearerToken
            //Next middleware
            next()
        }else{
            //Forbidden
            res.sendStatus(403)
        }
    }

    //redirects
        // app.get('/about-us', (req, res) => {
        //     res.redirect('/about')
        // })

    //404 page
    app.use((req, res) => {
        // res.status(404).sendFile('./views/404.html', { root: __dirname })
        res.status(404).render('404', {title: '404'})
    })
