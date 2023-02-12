let state = ""


const map1 = new Map();
map1.set('Tomato', 6.5);
map1.set('Bean', 6.5);
map1.set('Carrot', 6.5);
map1.set('Potato', 6.25);
map1.set('Beetroot', 6.5);
map1.set('Parsnip', 6.4);
map1.set('Cucumber', 6.25);
map1.set('Zucchini', 6.75);
map1.set('Chili', 6.75);
map1.set('Bell Pepper', 6.75);
map1.set('Broccoli', 7.3);
map1.set('Cauliflower', 6.5);
map1.set('Brussel Sprouts', 6.5);
map1.set('Kale', 6.75);
map1.set('Cabbage', 6.5);
map1.set('Spinach', 7.25);
map1.set('Pumpkin', 6.4);


const mapPlantTemp = new Map();
mapPlantTemp.set('Tomato', 77.5);
mapPlantTemp.set('Bean', 75);
mapPlantTemp.set('Carrot', 60);
mapPlantTemp.set('Potato', 72.5);
mapPlantTemp.set('Beetroot', 62.5);
mapPlantTemp.set('Parsnip', 68);
mapPlantTemp.set('Cucumber', 80);
mapPlantTemp.set('Zucchini', 70);
mapPlantTemp.set('Chili', 80);
mapPlantTemp.set('Bell Pepper', 75);
mapPlantTemp.set('Broccoli', 55);
mapPlantTemp.set('Cauliflower', 62.5);
mapPlantTemp.set('Brussel Sprouts', 60);
mapPlantTemp.set('Kale', 70);
mapPlantTemp.set('Cabbage', 62.5);
mapPlantTemp.set('Spinach', 55);
mapPlantTemp.set('Pumpkin', 80);

const mapPlantTime = new Map();
mapPlantTime.set('Tomato', 80);
mapPlantTime.set('Bean', 60);
mapPlantTime.set('Carrot', 65);
mapPlantTime.set('Potato', 95);
mapPlantTime.set('Beetroot', 105);
mapPlantTime.set('Parsnip', 140);
mapPlantTime.set('Cucumber', 60);
mapPlantTime.set('Zucchini', 50);
mapPlantTime.set('Chili', 105);
mapPlantTime.set('Bell Pepper', 75);
mapPlantTime.set('Broccoli', 70);
mapPlantTime.set('Cauliflower', 115);
mapPlantTime.set('Brussel Sprouts', 85);
mapPlantTime.set('Kale', 60);
mapPlantTime.set('Cabbage', 150);
mapPlantTime.set('Spinach', 40);
mapPlantTime.set('Pumpkin', 105);


let submit = document.getElementById('submitBtn')
submit.onclick = async function () {
    state = await callSoilData()
}

async function callSoilData() {
    let zcode = document.getElementById("zipcode").value

    let url1 = `https://forecast.weather.gov/zipcity.php?inputstring=${zcode}`
    let zip_url = await fetch(url1)

    let lat = parseInt(zip_url['url'].substring(zip_url['url'].length - 20, zip_url['url'].length - 13))
    let lon = parseInt(zip_url['url'].substring(zip_url['url'].length - 8))



    let url = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=nitrogen&property=phh2o&depth=0-5cm&value=Q0.5`


    let response = await fetch(url)
    let data = await response.json()


    // let nitrogen = await data['properties']['layers'][0]['depths'][0]['values']['Q0.5']

    let ph_temp = await data['properties']['layers'][1]['depths'][0]['values']['Q0.5']
    let ph = parseInt(ph_temp) / 10

    let difference = 100
    let vegetable_array = []
    map1.forEach((key, value) => {
        if (Math.abs(ph - key) < difference) {
            difference = Math.abs(ph - key)
            vegetable_array = [key, value]
        }
    })

    let val = document.getElementById('zipcode').value



    let response2 = await fetch("http://ZiptasticAPI.com/" + zcode)
    let data2 = await response2.json()


    let stateMonthTemps =
        [['AL', 45.3, 49.3, 56.15, 52.725, 70.95, 77.6, 80.3, 79.65, 74.8, 64.45, 53.9, 47.7],
        ['AK', 4.15, 8.7, 12.35, 10.525, 40.05, 50.9, 54.1, 50.35, 41.4, 27.15, 13.35, 6.95],
        ['AZ', 43.15, 46.25, 52.15, 49.2, 66.7, 76.45, 81, 79.5, 73.55, 62.4, 51, 42.35],
        ['AR', 40.25, 44.35, 52.15, 48.25, 69.2, 77.05, 80.5, 79.65, 73, 61.8, 50.8, 42.6],
        ['CA', 44.8, 46.85, 50.8, 48.825, 62.3, 70, 76.15, 75.5, 70.55, 61.05, 50.8, 43.95],
        ['CO', 26.3, 29, 37.05, 33.025, 53, 62.95, 68.55, 66.4, 58.9, 46.85, 35.2, 26.45],
        ['CT', 27.25, 29.35, 36.85, 33.1, 58.05, 66.85, 72.35, 70.55, 63.4, 52.1, 41.85, 32.65],
        ['DE', 35.2, 37.1, 44.25, 40.675, 63.6, 72.55, 77.4, 75.45, 69.05, 58.05, 47.5, 39.5],
        ['FL', 58.25, 61.25, 65.4, 63.325, 76.25, 80.65, 82.25, 82.2, 80, 73.7, 65.8, 60.75],
        ['GA', 46.7, 50.25, 56.7, 53.475, 71.3, 77.7, 80.5, 79.65, 74.75, 65.1, 55.15, 49],
        ['HI', 69.75, 69.65, 70.4, 70.025, 73.45, 75.3, 76.5, 77.15, 76.8, 75.75, 73.6, 71.35],
        ['ID', 25.15, 28.05, 35.25, 31.65, 50.15, 57.45, 66.4, 65.25, 56.4, 44.25, 32.5, 24.65],
        ['IL', 26.65, 31.05, 41.4, 36.225, 63.25, 72.2, 75.45, 73.6, 66.75, 54.8, 42.15, 31.55],
        ['IN', 27.7, 31.45, 41, 36.225, 62.45, 71.25, 74.25, 72.65, 66, 54.5, 42.35, 32.5],
        ['IA', 19.5, 24.1, 36.4, 30.25, 59.95, 69.9, 73.4, 71, 63.65, 50.95, 36.9, 24.95],
        ['KS', 31.05, 34.95, 44.85, 39.9, 63.9, 74.2, 79, 77.1, 68.85, 56.25, 43.25, 33.25],
        ['KY', 34.45, 38.2, 46.4, 42.3, 65.15, 73, 76.4, 75.25, 68.85, 57.55, 46.2, 38.05],
        ['LA', 49.9, 53.7, 60.1, 56.9, 74.2, 80.25, 82.4, 82.3, 77.8, 68.1, 58.25, 51.8],
        ['ME', 15.2, 17.5, 26.9, 22.2, 51.5, 60.8, 66.35, 64.9, 56.9, 45.3, 34.1, 22.6],
        ['MD', 33.9, 36.2, 43.6, 39.9, 63.45, 72.1, 76.7, 74.8, 68.25, 57.05, 46.3, 38.1],
        ['MA', 25.95, 28, 35.35, 31.675, 56.9, 65.7, 71.25, 69.65, 62.35, 51.05, 40.95, 31.5],
        ['MI', 20.2, 21.95, 31.1, 26.525, 54.85, 64.6, 68.8, 67.3, 59.95, 48.1, 36.3, 26.2],
        ['MN', 10.05, 14.7, 27.85, 21.275, 54.8, 64.75, 69.05, 66.8, 58.6, 45.05, 29.8, 16.45],
        ['MS', 45.6, 49.65, 56.65, 53.15, 71.8, 78.5, 81.05, 80.5, 75.45, 64.95, 54.4, 47.85],
        ['MO', 30.85, 35.45, 45.1, 40.275, 64.65, 73.55, 77.55, 75.9, 68.2, 56.65, 44.7, 34.8],
        ['MT', 21.05, 23.55, 32.45, 28, 50.45, 58.75, 66.65, 65.4, 55.7, 42.8, 30.6, 22.1],
        ['NE', 25.1, 28.45, 38.7, 33.575, 58.4, 69.1, 74.45, 72.35, 63.75, 50.4, 37.3, 27.2],
        ['NV', 32.8, 35.7, 42.15, 38.925, 56.25, 65.65, 73.8, 71.95, 63.5, 51.55, 39.95, 31.85],
        ['NH', 19.1, 21.35, 29.9, 25.625, 53.7, 62.6, 67.6, 65.95, 58.4, 46.75, 35.85, 25.4],
        ['NJ', 31.75, 33.85, 41.05, 37.45, 61.25, 70.3, 75.4, 73.55, 66.9, 55.35, 45.1, 36.6],
        ['NM', 35.7, 39.5, 46.1, 42.8, 61.65, 71.1, 74.1, 72.2, 65.75, 55.15, 43.8, 35.65],
        ['NY', 21.55, 23.55, 31.6, 27.575, 55.75, 64.4, 69, 67.35, 60.4, 48.8, 37.9, 27.85],
        ['NC', 40.8, 43.75, 50.3, 47.025, 66.85, 74.35, 77.95, 76.45, 70.8, 60.35, 50.3, 43.6],
        ['ND', 10.45, 14.6, 27.05, 20.825, 53.65, 63.65, 69, 67.5, 57.9, 43.3, 27.9, 15.65],
        ['OH', 28.1, 30.9, 39.75, 35.325, 61.1, 69.75, 73.25, 71.75, 65.1, 53.75, 42.25, 33],
        ['OK', 38.3, 42.45, 51.15, 46.8, 68.4, 77.3, 81.95, 80.85, 72.9, 61.25, 49.45, 40.1],
        ['OR', 33.55, 35.6, 40.05, 37.825, 51.9, 58.1, 66.55, 65.9, 59.2, 48.5, 38.6, 32.45],
        ['PA', 26.6, 28.95, 36.85, 32.9, 58.55, 66.95, 71.15, 69.55, 62.75, 51.4, 40.75, 31.65],
        ['RI', 29.1, 30.8, 37.65, 34.225, 57.55, 66.5, 72.35, 71.05, 64, 53.15, 43.45, 34.55],
        ['SC', 45.35, 48.55, 55.05, 51.8, 70.6, 77.6, 80.85, 79.5, 74.2, 64.05, 54, 47.65],
        ['SD', 18.4, 22.15, 33.3, 27.725, 55.9, 66.35, 72.65, 70.65, 61.5, 47.15, 33.1, 22],
        ['TN', 37.9, 41.8, 49.5, 45.65, 66.7, 74.15, 77.5, 76.45, 70.4, 59.3, 48.35, 40.9],
        ['TX', 47.15, 51.3, 58.5, 54.9, 73.55, 80.5, 82.95, 82.6, 76.3, 66.8, 56.05, 48.3],
        ['UT', 28, 32.2, 40.4, 36.3, 55.85, 65.95, 73.3, 71.1, 62.25, 49.65, 37.25, 27.9],
        ['VT', 17.35, 19.6, 28.35, 23.975, 53.35, 62.05, 66.8, 65.15, 57.8, 46.1, 34.9, 24.05],
        ['VA', 35.85, 38.7, 45.75, 42.225, 63.8, 71.7, 75.75, 74.2, 67.9, 57, 46.65, 39.05],
        ['WA', 31.85, 34.55, 39.7, 37.125, 52.85, 58.3, 65.4, 65.3, 58.45, 47.25, 37.25, 31.15],
        ['WV', 31.4, 34.55, 42.1, 38.325, 61.1, 68.65, 72.3, 71.25, 65.05, 53.95, 43.25, 35.25],
        ['WI', 15.25, 19.15, 30.55, 24.85, 55.4, 65.05, 69.25, 67.2, 59.5, 46.8, 33.4, 21.4],
        ['WY', 21.75, 23.7, 32.7, 28.2, 49, 58.65, 66.5, 64.65, 55.35, 42.6, 30.5, 21.75]]



    let vegetable = vegetable_array[1]


    plantTemp = mapPlantTemp.get(vegetable)
    minDif = 10000000
    monthIndex = 5
    let month = 'testMonth'


    for (i = 0; i < 50; i++) {
        if (stateMonthTemps[i][0] == data2.state) {
            for (j = 1; j < 13; j++) {
                if (Math.abs(stateMonthTemps[i][j] - plantTemp) < minDif) {
                    minDif = Math.abs(stateMonthTemps[i][j] - plantTemp)
                    monthIndex = j    
                }
            }
        }
    }

    switch (monthIndex) {
        case 1:
            month = 'January'
            break;
        case 2:
            month = 'February'
            break;
        case 3:
            month = 'March'
            break;
        case 4:
            month = 'April'
            break;
        case 5:
            month = 'May'
            break;
        case 6:
            month = 'June'
            break;
        case 7:
            month = 'July'
            break;
        case 8:
            month = 'August'
            break;
        case 9:
            month = 'September'
            break;
        case 10:
            month = 'October'
            break;
        case 11:
            month = 'November'
            break;
        case 12:
            month = 'December'
            break;

    }






    let days = mapPlantTime.get(vegetable)

    let html = `
        <p>Your zip code, ${zcode}, is located in ${data2.state} </p>
        <p>
            Based on your soil conditions and weather, we recommend planting ${vegetable} seeds in ${month}
        </p>
        <p>It will take ${days} days to grow</p>
        <hr>
    `

    let error = `
    <p style="color: red">No data available for this region!</p>
    <hr>
`

    let info = document.getElementById("informaton");

    if (vegetable == undefined || data2.state == undefined) {
        info.innerHTML = error + info.innerHTML
    } else {
        info.innerHTML = html + info.innerHTML
    }




    return [data2.state, vegetable_array]
}