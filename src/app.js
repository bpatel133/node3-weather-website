const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bhavik Patel'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bhavik Patel'
    });
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide and address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error});
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forescast: forecastData,
                location,
                address: req.query.address
            });
        })
    })

    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a seach term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText:'Ive fallen and I cant get up',
        title: 'Help',
        name: 'Bhavik Patel'
    });
})

app.get('/help/*', (req, res)=>{
    res.render('404',
    {
        title: '404',
        name: 'Bhavik Patel',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res)=>{
    res.render('404',
    {
        title: '404',
        name: 'Bhavik Patel',
        errorMessage: 'Page not found'
    });
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});