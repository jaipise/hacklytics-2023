let submit = document.getElementById('submitBtn')
submit.onclick = callSoilData()

async function callSoilData() {
    let response = await fetch('https://rest.isric.org/soilgrids/v2.0/properties/query?lon=33&lat=33&property=nitrogen&property=phh2o&depth=0-5cm&value=Q0.5')
    let data = await response.json()
    console.log(data)
    let nitrogen = data.layers[4]
    let ph = data.layers[7]

    return response
}