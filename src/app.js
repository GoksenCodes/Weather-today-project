function formatDate(timestamp) {
    let date = new Date(timestamp)
    let hours = date.getHours();
    if (hours < 10 ) {
        hours = `0${hours}` ;
    }
    let minutes = date.getMinutes();
    if (minutes < 10 ) {
        minutes = `0${minutes}` ;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}` ;


    
}

function showTemperature(response) {
    let searchedCityTemp = document.querySelector("#temp") ;
    searchedCityTemp.innerHTML = Math.round(response.data.main.temp) ;
    let city = document.querySelector("#searched-city") ;
    city.innerHTML = response.data.name ;
    let currentDate = document.querySelector("#current-date")
    currentDate.innerHTML = formatDate(response.data.dt * 1000);
    let currentDayIcon = document.querySelector("#current-icon")
    currentDayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    currentDayIcon.setAttribute("alt", response.data.weather[0].description);
}

function ShowForecast(response) {
    console.log(response)
    let firstTemp = document.querySelector("#temp-3") ;
    firstTemp.innerHTML = Math.round(response.data.list[0].main.temp);
    let firstIcon = document.querySelector("#icon-3") ;
    firstIcon.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`);
    let secondTemp = document.querySelector("#temp-6") ;
    secondTemp.innerHTML = Math.round(response.data.list[1].main.temp);
    let secondIcon = document.querySelector("#icon-6") ;
    secondIcon.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`);
    let thirdTemp = document.querySelector("#temp-9") ;
    thirdTemp.innerHTML = Math.round(response.data.list[2].main.temp);
    let thirdIcon = document.querySelector("#icon-9") ;
    thirdIcon.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png`);

}

function search(city) {
    let apiKey="683dab27e61c352cc6f11bcf41592476" ;
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric` ;
    axios.get(apiUrl).then(showTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric` ;
    axios.get(apiUrl).then(ShowForecast)

}



function getCity(event) {
    event.preventDefault();
    let searchedCity = document.querySelector("#user-input")
    search(searchedCity.value);
    
}





let form = document.querySelector("#search-form")
form.addEventListener("submit", getCity) ;

search("New York")