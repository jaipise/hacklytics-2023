let submit = document.getElementById('submitBtn')
submit.onclick = callSoilData()

async function callSoilData() {
    let response = await fetch('https://rest.isric.org/soilgrids/v2.0/properties/layers')
    let data = await response.json()
    console.log(data)
    return response
}