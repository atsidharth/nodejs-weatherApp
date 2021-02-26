const path = require('path')
const express = require('express')
const hbs = require('hbs')                   // for partials - use some content on every page like header, footer
const geocode = require('./Utils/geocode')               
const forecast = require('./Utils/forecast')

const app = express()
const port = process.env.PORT || 3000       // for heroku as port will be set dynamically

const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

app.set('view engine','hbs')                //informing express which template engine we are using : by default will take from 'views' dir
app.set('views', viewsPath)                 // informing express where to check for view files
hbs.registerPartials(partialsPath) 

app.use(express.static(publicDir))         //Setup static directory to serve

app.get('',(req,res)=>{
    res.render('index',{                    //loading dynamic files with hbs
        title: 'Weather',
        name: 'Sid'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Sid'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is help text',
        title: 'HELP',
        name: 'Sid'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address..'
        })
    }
    geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(lattitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Add a search string'
        })
    }
    res.send({
        products:[]
    })
    console.log(req.query.search)
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404 page',
        errorMsg: 'Help article not found',
        name: 'Sid'
        
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: '404 Page',
        errorMsg: 'Page not found.',
        name: 'Sid'
    })
})

// Uses one time to make the server up

app.listen(port,()=>{
    console.log('Sever is up at port'+port) 
})