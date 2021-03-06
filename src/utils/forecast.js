const request = require('request');

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=39618faddce98f27e023c9d1c8a15877&query='+latitude+','+longitude+'&units=m';

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)

        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. There is a ' + body.current.precip + '% chance of rain. With humidity of '+body.current.humidity +'%')
        }
            
    })
}

module.exports = forecast;