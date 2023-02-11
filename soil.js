let submit = document.getElementById('submitBtn')
submit.onclick = callSoilData()

async function callSoilData() {
    let zip_url = await fetch('https://forecast.weather.gov/zipcity.php?inputstring=30318')

    
    let lat = parseInt(zip_url['url'].substring(zip_url['url'].length - 20, zip_url['url'].length - 13))
    let lon = parseInt(zip_url['url'].substring(zip_url['url'].length - 8))

    let url = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=nitrogen&property=phh2o&depth=0-5cm&value=Q0.5`
    let response = await fetch(url)
    let data = await response.json()

    // let nitrogen = await data['properties']['layers'][0]['depths'][0]['values']['Q0.5']

    let ph_temp = await data['properties']['layers'][1]['depths'][0]['values']['Q0.5']
    let ph = parseInt(ph_temp) / 10
    

    console.log(ph)
    return response
}