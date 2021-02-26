const request = require('postman-request')

const forecast = (lattitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=dfcfba653b86aa2a251dad98b19dfcc6&query='+encodeURIComponent(lattitude)+','+encodeURIComponent(longitude)+'&units=f'
    // console.log(url)
    request({url,json: true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to wether service..',undefined)
        }else if(body.error){
            callback('Location not found...',undefined)
        }else{
            const current = body.current
            // console.log(current)
            callback(undefined,current.weather_descriptions+'. It is currently '+current.temperature+' degrees out and feels like '+current.feelslike+'. There is '+current.precip+'% chance of rain.')
        }
    })
}

module.exports = forecast
