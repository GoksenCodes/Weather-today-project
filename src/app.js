function displayTemprature(response) {
    console.log(response.data.main.temp)
    let searchedCityTemp = document.querySelector("#temp") ;
    searchedCityTemp.innerHTML = Math.round(response.data.main.temp) ;
    let city = document.querySelector("#searched-city") ;
    city.innerHTML = response.data.name ;
}


let apiKey="683dab27e61c352cc6f11bcf41592476" ;
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}&units=metric` ;

axios.get(apiUrl).then(displayTemprature);

