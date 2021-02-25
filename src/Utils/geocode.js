const request = require('postman-request')

const geocode = (addr,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(addr)+'.json?limit=1&access_token=pk.eyJ1Ijoic2lkaGFydGgtYXQiLCJhIjoiY2tsaTN6Z3ZkMDVnMTJ2cGx2Zmo2b3VlcSJ9.fYP4xZZDYTyGO3KND89WHQ'
    // console.log(url)
    request({url, json: true},(error,{body} = {})=>{
        if(error){
            callback('Unable to connect to location service..',undefined)
        }else if(body.message === "Not Found" || body.features.length == 0){
            callback('Unable to find location. Try another..',undefined)
        }else{
            callback(undefined,{
                lattitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name    
            })
        }
    })
}
module.exports = geocode

