const searchBtnEl = document.querySelector(".searchBtn");
const cityInputEl = document.querySelector(".searchBox");
const searchForm = document.querySelector("#search-form");
const section = document.querySelector(".appendsection");
const btnAppend = document.querySelector(".buttonAppend");
const hidden = document.querySelector(".hidden");

//parse coming out of local storage
let citiesAlreadySearched =
JSON.parse(localStorage.getItem("citiesAlreadySearched")) || [];

//api key ->in the future i will use a gitignore for this
const apiKeyVar = "cc74a924b91e51b9e01d7af51fb380f6";

//this event listener will grab the user input value and trigger the search city function with that value
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userCity = cityInputEl.value.trim();
  searchCity(userCity);
});

//searchcity function
function searchCity(cityName) {
  
  //first api reuqest is used to get city information to obtain a lat & lon
  let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKeyVar}`;
  //1st promise
  fetch(requestUrl)
    .then(function (response) {
      //if the response is not 200
      if (response.status !== 200){
        //this replaces the html withe the 404 html
        document.location.replace('./404.html')
      } else {
         return response.json();   
      }
    })
    .then(function (data) {
      //grabbing data from response
      //grabes first city form array of cities
      const cityResponse = data[0].name;
      //calling a function to save into local storage
      saveToLocalStorage(cityResponse);
      const lat = data[0].lat;
      const lon = data[0].lon;
      //calling function for next api call 
      fiveDayWeather(lat, lon, cityResponse);
    })
    .catch(function () {
      //this is in case no city is found.. a catch all/also replaces html to 404
      document.location.replace('./404.html')
    });
}

function fiveDayWeather(lat, lon, cityName) {
  let requestUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${apiKeyVar}`;

  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      //declaring variables for current data
      const icon = data.current.weather[0].icon;
      const temp = data.current.temp;
      const wind = data.current.wind_speed;
      const humidity = data.current.humidity;
      const uvi = data.current.uvi;
     
      //declaring variables for future data
      let day1 = data.daily[0];
      let day2 = data.daily[1];
      let day3 = data.daily[2];
      let day4 = data.daily[3];
      let day5 = data.daily[4];

      //creating Array for daily, using declared variables
      let future5DayArray = [day1, day2, day3, day4, day5];
      
      //calling to funtions to display current and the next 5 days
      renderInfoCurrent(cityName, icon, temp, wind, humidity, uvi);
      renderFutureWeather(future5DayArray);
    });
}

//using the parameters passed from fivedayweather function i am able to use that data information in this function 
function renderInfoCurrent(cityName, icon, temp, wind, humidity, uvi) {
  //will clear out section each time a new city is searched/prevents duplicates
  section.innerHTML = "";

  //using moment to get current date 
  let formatDate = moment().format("MM/DD/YYYY");
  //creating a img EL and adding a src to it with parameters around icon so it can change depending on the icon code the weather renders 
  const img = document.createElement("img");
  img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
 
  //creating a div to start creating my container for curent weather section
  const container = document.createElement("div");
  container.classList.add("container", "weather-section");
  //elements that will go inside on container
  const cityHeader = document.createElement("h2");
  const cityTemp = document.createElement("p");
  const cityWind = document.createElement("p");
  const cityHumidity = document.createElement("p");
  const cityUvi = document.createElement("p");
  const uviCode = document.createElement("span");
  //element that is created for title for future5dayforecast
  const headerFuture = document.createElement("h2");
  headerFuture.classList.add("mb-3", "mt-3");
  //text content for elements that were created
  cityHeader.textContent = `${cityName} (${formatDate})`;
  cityHeader.append(img)
  cityTemp.textContent = `Temp: ${temp} °F`;
  cityWind.textContent = `Wind: ${wind} MPH`;
  cityHumidity.textContent = `Humidity: ${humidity}%`;
  cityUvi.textContent = "UV Index: ";
  uviCode.textContent = `${uvi}`;

  headerFuture.textContent = "5-Day Forecast:";
  //uvi seprate because span is being appended to uvi index
  //sseparate because that number specifically is being color coded
  cityUvi.append(uviCode);
  //appending all elements to container 
  container.append(cityHeader, cityTemp, cityWind, cityHumidity, cityUvi);
  //appedning container and the header for future to the section
  section.append(container, headerFuture);
  //finally calling another function for adding class codes
  classCodesForUvi (uvi, uviCode);
}

function  classCodesForUvi(uvi, uviCode) {
  //conditional to help us determine which class its going to add specifically depending on the uvi number 
    if (uvi <= 2 ) {
        uviCode.classList.add("uviCodeLow");   
    } else if (uvi <= 5) {
        uviCode.classList.add("uviCodeModerate");   
    } else if (uvi <= 8) {
        uviCode.classList.add("uviCodeHigh");   
    } else if (uvi > 8) {
        uviCode.classList.add("uviCodeVeryHigh");   
    }
}


function renderFutureWeather(future5DayArray) {
  //this is outside of the for loop because these are elements i do not want to repeat for each day of the 5day array
  const secContainer = document.createElement("div");
  secContainer.classList.add("container");
  const cardConatiner = document.createElement("div");
  cardConatiner.classList.add("row", "row-col-5", "cardcon");
  secContainer.append(cardConatiner);

  for (let index = 0; index < future5DayArray.length; index++) {
    //creating an variable for futureuvi as it needs to go through a forloop to add determining classes
    let futureUvi = future5DayArray[index].uvi
    //using moment to obtain data for each object in array
    let formatDate = moment(future5DayArray[index].dt*1000).format("MM/DD/YYYY");
    //creating im element and adding img source to it
    const img = document.createElement("img");
    let dailyIcons = future5DayArray[index].weather[0].icon;
    img.src = `https://openweathermap.org/img/wn/${dailyIcons}@2x.png`;
   
    //creating elements that go inside each card (each day)
    const col = document.createElement("div");
    col.classList.add("col");
    const textBoxEl = document.createElement("div");
    textBoxEl.classList.add("p-3", "media-p");
    const textDay = document.createElement("h4");
    const textTemp = document.createElement("p");
    const textWind = document.createElement("p");
    const textHumidity = document.createElement("p");
    const textUvi = document.createElement("p");
    const spanUvi = document.createElement("span");

    //uvi for loop
    if (futureUvi <= 2 ) {
        spanUvi.classList.add("uviCodeLow");   
    } else if (futureUvi <= 5) {
        spanUvi.classList.add("uviCodeModerate");   
    } else if (futureUvi <= 8) {
        spanUvi.classList.add("uviCodeHigh");   
    } else if (futureUvi > 8) {
        spanUvi.classList.add("uviCodeVeryHigh");   
    }

    //adding text content to elements created
    textDay.textContent = formatDate;
    textTemp.textContent = `Temp: ${future5DayArray[index].temp.max} °F`;
    textWind.textContent = `Wind: ${future5DayArray[index].wind_speed} MPH`;
    textHumidity.textContent = `Humidity: ${future5DayArray[index].humidity}%`;
    textUvi.textContent = "UV index: ";
    spanUvi.textContent = futureUvi;
    
    //appending corresponding elements
    textUvi.append(spanUvi);
    textBoxEl.append(textDay, img, textTemp, textWind, textHumidity, textUvi);
    col.append(textBoxEl);
    cardConatiner.append(col);
  }
  section.append(secContainer);
}

function saveToLocalStorage(cityName) {
  // if citiesAlreadySearched does not contain the cityName, then add city to the array and renderbuttons()
  if (!citiesAlreadySearched.includes(cityName)) {
    citiesAlreadySearched.push(cityName);
    localStorage.setItem(
      "citiesAlreadySearched",
      JSON.stringify(citiesAlreadySearched)
    );
    //calling functions to render buttons in array onto screen
    renderButtons();
  }
}


function renderButtons() {
  //citiesAlreadySearched is global variable
  //clears out buttons before creating new buttons with new array// prevents duplicates
  btnAppend.innerHTML = "";

  for (let index = 0; index < citiesAlreadySearched.length; index++) {
    const createBtnEl = document.createElement("button");
    createBtnEl.classList.add("mb-1");
    createBtnEl.textContent = citiesAlreadySearched[index];
    //creating event listener for these buttons so i can click and search that same city again
    createBtnEl.addEventListener("click", () => {
      searchCity(citiesAlreadySearched[index]);
    });
    btnAppend.append(createBtnEl);
  }
}

renderButtons();

