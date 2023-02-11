let state = ""
let zcode = 0


submit.onclick = async function() {
    zcode = document.getElementById("zipcode").value
    state = await callState()

}

async function callState() {
    let response = await fetch("http://ZiptasticAPI.com/" + zcode)
    let data = await response.json()
    console.log(data.state)


    return data.state
}