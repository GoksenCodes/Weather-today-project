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

function displayTemprature(response) {
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


let apiKey="683dab27e61c352cc6f11bcf41592476" ;
let city="Lisbon"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric` ;

axios.get(apiUrl).then(displayTemprature);

