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
    searchedCityTemp.innerHTML = Math.round(response.data.main.temp) ;
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
    let firstTemp = document.querySelector("#temp-3 strong") ;
    firstTemp.innerHTML = Math.round(response.data.list[1].main.temp);
    let firstHour = document.querySelector("#hours-3") ;
    firstHour.innerHTML = second_half(response.data.list[1].dt_txt) ;
    let firstIcon = document.querySelector("#icon-3") ;
    firstIcon.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`);
   
    let secondTemp = document.querySelector("#temp-6 strong") ;
    secondTemp.innerHTML = Math.round(response.data.list[3].main.temp);
    let secondHour = document.querySelector("#hours-6") ;
    secondHour.innerHTML = second_half(response.data.list[3].dt_txt) ;
    let secondIcon = document.querySelector("#icon-6") ;
    secondIcon.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.list[3].weather[0].icon}@2x.png`);
   
    let thirdTemp = document.querySelector("#temp-9 strong") ;
    thirdTemp.innerHTML = Math.round(response.data.list[5].main.temp);
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
  
    