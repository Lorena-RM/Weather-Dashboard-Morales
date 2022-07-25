
const searchBtnEl = document.querySelector(".searchBtn");
const cityInputEl = document.querySelector(".searchBox");
const searchForm = document.querySelector("#search-form");
const section = document.querySelector(".appendsection");
const btnAppend = document.querySelector(".buttonAppend");
const hidden = document.querySelector(".hidden");

let city = localStorage.getItem("city")


const apiKeyVar = "cc74a924b91e51b9e01d7af51fb380f6";


searchBtnEl.addEventListener("click", () => {
    //event.preventDefault();
    searchCity (); 
    saveLocalStorage ();
});

function saveLocalStorage () {

    let userCity = cityInputEl.value.trim();
    
    let cityArray = [];
    if (!city) {
        cityArray.push(userCity);
        localStorage.setItem("city", JSON.stringify(cityArray));
    } else {
        cityArray = cityArray.concat(JSON.parse(city)||0);
        cityArray.push(userCity);
        localStorage.setItem("city", JSON.stringify(cityArray));
    }
    renderButton ();
}

function searchCity () {
    let userCity = cityInputEl.value.trim();
    //console.log ("this is working!");
    
   
    let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=${apiKeyVar}`;
    fetch(requestUrl)
        .then(function(response){
            return response.json()
        })
        .then (function (data) {
            console.log(data);
            let lat = data[0].lat;
            let lon = data[0].lon;
            fiveDayWeather (lat, lon);

        })
        .catch (function (error) {
            console.log(error);
        });

}

function fiveDayWeather (lat, lon) {
    let requestUrl2 = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${apiKeyVar}`

    //let requestUrl2 = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${apiKeyVar2}`

    fetch(requestUrl2)
        .then(function(response) {
            return response.json() 
        })
        .then(function(data){
            console.log(data);
            let currentDay = data.current.dt
            let formatDate = moment(currentDay).format('MM/DD/YYYY')
            console.log(formatDate);
            //console.log(currentDay)
            let temp = data.current.temp
            //console.log(temp)
            let wind = data.current.wind_speed
            //console.log(wind)
            let humidity = data.current.humidity
            //console.log(humidity)
            let uvi = data.current.uvi
            //console.log(uvi)
            let day1 = data.daily[0];
            //console.log(day1);
            let day2 = data.daily[1];
            //console.log(day2);
            let day3 = data.daily[2];
            //console.log(day3);
            let day4 = data.daily[3];
            //console.log(day4);
            let day5 = data.daily[4];
            //console.log(day5);
            
            let future5DayArray = [day1,day2,day3,day4,day5]
            //console.log(future5DayArray);
            

            renderInfoCurrent(currentDay, temp, wind, humidity, uvi);
            renderFutureWeather (future5DayArray);
        })
}

function renderInfoCurrent(currentDay, temp, wind, humidity, uvi) {
    section.innerHTML = "";
    var formatDate = moment().format('MM/DD/YYYY')

    let userCity = cityInputEl.value.trim();
    var container = document.createElement("div")
    container.classList.add("container", "weather-section");

    var cityHeader = document.createElement("h2")
    cityHeader.classList.add("info");
    var cityTemp = document.createElement("p")
    cityTemp.classList.add("info")
    var cityWind = document.createElement("p");
    cityWind.classList.add("info")
    var cityHumidity = document.createElement("p");
    cityHumidity.classList.add("info")
    var cityUvi = document.createElement("p");
    cityUvi.classList.add("info");
    var headerFuture = document.createElement("h2");
    headerFuture.classList.add("mb-3", "mt-3");
    
    cityHeader.textContent = `${userCity} (${formatDate})`
    cityTemp.textContent = `Temp: ${temp} °F`;
    cityWind.textContent = `Wind: ${wind} MPH`;
    cityHumidity.textContent = `Humidity: ${humidity}%`;
    cityUvi.textContent = `UV Index: ${uvi}`;
    headerFuture.textContent = "5-Day Forecast:"

    container.append(cityHeader, cityTemp, cityWind, cityHumidity, cityUvi,);



    section.append(container, headerFuture);
    
}

function renderFutureWeather (future5DayArray) {
    var formatDate = moment().format('MM/DD/YYYY');
    var secContainer = document.createElement("div");
    secContainer.classList.add("container");
    var cardConatiner = document.createElement("div");
    cardConatiner.classList.add("row", "row-col-5", "cardcon");
    secContainer.append(cardConatiner);
    for (let index = 0; index < future5DayArray.length; index++) {
        const element = future5DayArray[index];          
        //console.log(element);  
        var col = document.createElement("div");
        col.classList.add("col");
        var textBoxEl = document.createElement("div");
        textBoxEl.classList.add("p-3");
        var textDay = document.createElement("h4");
        var textTemp = document.createElement("p");
        var textWind = document.createElement("p");
        var textHumidity = document.createElement("p");
        var textUvi = document.createElement("p");

        textDay.textContent = future5DayArray[index].dt;
        //console.log(textDay);
        textTemp.textContent = `Temp: ${future5DayArray[index].temp.max} °F`;
        //console.log(textTemp);
        textWind.textContent = `Wind: ${future5DayArray[index].wind_speed} MPH`;
        //console.log(textWind);
        textHumidity.textContent = `Humidity: ${future5DayArray[index].humidity}%`;
        //console.log(textHumidity);
        textUvi.textContent = `UV index: ${future5DayArray[index].uvi}`;
        //console.log(textUvi);

        textBoxEl.append(textDay, textTemp, textWind, textHumidity, textUvi)
        col.append(textBoxEl);
        cardConatiner.append(col);

    }
    section.append(secContainer);
}

function renderButton () {
    var getItem = JSON.parse(localStorage.getItem("city"));
    btnAppend.innerHTML = "";

    if (city) {
        for (let index = 0; index < getItem.length; index++) {
            const createBtnEl = document.createElement("button");
            createBtnEl.classList.add("mb-1");
            createBtnEl.textContent = getItem[index];
            btnAppend.append(createBtnEl);
        } 
    }else {
        console.log("none")
    }
    
}

renderButton ();


//fix console.log(none)
//make serach buttons work
//add images 
//change date format
//media a responsive website 
// fix form search

