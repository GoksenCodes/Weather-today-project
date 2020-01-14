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
    return `Last updated at ${day} ${hours}:${minutes}` ;


    
}

function showTemperature(response) {
    let searchedCityTemp = document.querySelector("#temp") ;
    celsiusTemp = response.data.main.temp
    searchedCityTemp.innerHTML = Math.round(celsiusTemp) ;
    let city = document.querySelector("#searched-city") ;
    city.innerHTML = response.data.name ;
    let currentDate = document.querySelector("#current-date")
    currentDate.innerHTML = formatDate(response.data.dt * 1000);
    let currentDayIcon = document.querySelector("#current-icon")
    currentDayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    currentDayIcon.setAttribute("alt", response.data.weather[0].description);
    }

    




function showForecast(response) {
    console.log(response)
    let firstTemp = document.querySelector("#temp-3") ;
    celsiusTemp3 = response.data.list[1].main.temp ;
    firstTemp.innerHTML = Math.round(celsiusTemp3);
    let firstHour = document.querySelector("#hours-3") ;
    firstHour.innerHTML = second_half(response.data.list[1].dt_txt) ;
    let firstIcon = document.querySelector("#icon-3") ;
    firstIcon.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`);
   
    let secondTemp = document.querySelector("#temp-6") ;
    celsiusTemp6 = response.data.list[3].main.temp ;
    secondTemp.innerHTML = Math.round(celsiusTemp6);
    let secondHour = document.querySelector("#hours-6") ;
    secondHour.innerHTML = second_half(response.data.list[3].dt_txt) ;
    let secondIcon = document.querySelector("#icon-6") ;
    secondIcon.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.list[3].weather[0].icon}@2x.png`);
   
    let thirdTemp = document.querySelector("#temp-9") ;
    celsiusTemp9 = response.data.list[5].main.temp
    thirdTemp.innerHTML = Math.round(celsiusTemp9);
    let thirdHour = document.querySelector("#hours-9") ;
    thirdHour.innerHTML = second_half(response.data.list[5].dt_txt) ;
    let thirdIcon = document.querySelector("#icon-9") ;
    thirdIcon.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.list[5].weather[0].icon}@2x.png`);

    
}


function second_half (datetime) {
    console.log (datetime);
    return datetime.slice(11,16)
    }


function search(city) {
    let apiKey="683dab27e61c352cc6f11bcf41592476" ;
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric` ;
    axios.get(apiUrl).then(showTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric` ;
    axios.get(apiUrl).then(showForecast)

    document.querySelector(".searchresult-section").style.display = 'block';
    document.querySelector(".forecast-section").style.display = 'block';
}



function getCity(event) {
    event.preventDefault();
    let searchedCity = document.querySelector("#user-input")
    search(searchedCity.value);
    
}


let form = document.querySelector("#search-form")
form.addEventListener("submit", getCity) ;


function displayData(response) {
    // let city = document.querySelector("#searched-city");
    let currentCity = response.data.name;
    // let temp = document.querySelector("#temp");
    // let currentCityTemp = Math.round(response.data.main.temp);
    // city.innerHTML = currentCity;
    // temp.innerHTML = currentCityTemp;
    search(currentCity)
  }

function getPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "683dab27e61c352cc6f11bcf41592476";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayData);
  }
  
  function getCoords() {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getPosition);
    clearForm()
  }
  
  function clearForm() {
    document.getElementById("user-input").value = ""
  }

  let button = document.querySelector("#current-location-button");
  button.addEventListener("click", getCoords);
  
  function displayCityData(response) {
      let city = document.querySelector(".city");
      let userCityInput = response.data.name;
      let temp = document.querySelector(".degree-value");
      let inputTemp = response.data.main.temp;
      city.innerHTML = userCityInput;
      temp.innerHTML = inputTemp;
    }

    function showFahrenheitTemp(event) {
        event.preventDefault();
        celsiusLink.classList.remove("active");
        fahrenheitLink.classList.add("active");
        let fahrenheitTemp= (celsiusTemp * 9) / 5 + 32
        let temp = document.querySelector("#temp")
        temp.innerHTML = Math.round(fahrenheitTemp);

        let fahrenheitTemp3 = (celsiusTemp3 * 9) / 5 + 32
        let temp3 = document.querySelector("#temp-3")
        temp3.innerHTML = Math.round(fahrenheitTemp3);

        let fahrenheitTemp6 = (celsiusTemp6 * 9) / 5 + 32
        let temp6 = document.querySelector("#temp-6")
        temp6.innerHTML = Math.round(fahrenheitTemp6);

        let fahrenheitTemp9 = (celsiusTemp9 * 9) / 5 + 32
        let temp9 = document.querySelector("#temp-9")
        temp9.innerHTML = Math.round(fahrenheitTemp9);

    }

    function showCelsiusTemp(event) {
        event.preventDefault();
        celsiusLink.classList.add("active");
        fahrenheitLink.classList.remove("active");
        let temp = document.querySelector("#temp");
        temp.innerHTML = Math.round(celsiusTemp);
    }

    let celsiusTemp = null;
    let celsiusTemp3 = null ;
    let celsiusTemp6 = null;
    let celciusTemp9 = null;

    let fahrenheitLink = document.querySelector(".fahrenheit");
    fahrenheitLink.addEventListener("click" , showFahrenheitTemp);

    let celsiusLink = document.querySelector(".celsius");
    celsiusLink.addEventListener("click" , showCelsiusTemp);

    