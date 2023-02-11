const map1 = new Map();
map1.set('Tomato', 6.5);
map1.set('Bean', 6,5);
map1.set('Carrot', 6.5);
map1.set('Potato', 6.25);
map1.set('Beetroot', 6.5);
map1.set('Parsnip', 6.4);
map1.set('Cucumber', 6.25);
map1.set('Zucchini', 6.75);
map1.set('Chili', 6.75);
map1.set('Bell Peppers', 6.75);
map1.set('Broccoli', 7.3);
map1.set('Cauliflower', 6.5);
map1.set('Brussel Sprouts', 6.5);
map1.set('Kale', 6.75);
map1.set('Cabbage', 6.5);
map1.set('Spinach', 7.25);
map1.set('Pumpkin', 6.4);

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