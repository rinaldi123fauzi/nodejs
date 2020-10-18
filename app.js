const express = require('express')
const morgan = require('morgan')

//express app
const app = express()

//register view engine
app.set('view engine', 'ejs')

//listen for requests
app.listen(3000)

//middleware & static files
app.use(express.static('public'))

//this is middleware
app.use(morgan('dev'))

app.get('/', (req, res) => {
    //res.send('<p>Hello</p>')
    // res.sendFile('./views/index.html', { root: __dirname })
    const blogs = [
        {title: 'PHP', snippet: 'Lorem ipsum'},
        {title: 'RUBY', snippet: 'Lorem ipsum'},
        {title: 'NODE', snippet: 'Lorem ipsum'}
    ]
    res.render('index', {title: 'Home', blogs})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
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
