


// GET AND DISPLAY PREVIOUS CITIES FROM LOCAL STORAGE    
    function showPrevCities(type) {
        console.log("up top: "+type);
        // clear current City List
        $("#cityList").empty();
        var prevCitiesRaw = localStorage.getItem("prevCities");
        var prevCities = [];
        if(!!prevCitiesRaw) {
            prevCities = JSON.parse(prevCitiesRaw);
        }
        for (let k = 0; k < prevCities.length; k++) {
            var cityDisplay = document.getElementById("cityList");
            let newListItem = document.createElement("div");
            newListItem.setAttribute("class","cityList");
            newListItem.setAttribute("data-city",prevCities[k].city);
            newListItem.setAttribute("data-state",prevCities[k].state);
            newListItem.setAttribute("data-lat",prevCities[k].lat);
            newListItem.setAttribute("data-lon",prevCities[k].lon);
            newListItem.textContent = prevCities[k].city;
            cityDisplay.appendChild(newListItem);
        }  
    }

// GET LAT & LONG FROM DIRECT GEOCODING API

    function cityValidation(citySt) {
        // if(citySt == "") {
            var citySt = document.getElementById('city').value;
        // }
        console.log(citySt);
        var checkMe = citySt.split(",");
        console.log("citySt Length: "+checkMe.length);
        if(checkMe.length!="2") {
            alert("You must enter in format city,state such as Chicago,IL or Fort Lauderdale,FL");
            return;
        }
        
        var url = "https://api.openweathermap.org/geo/1.0/direct?q="+citySt+",us&limit=10&appid=f1d85396b0ac359611b0e0093b0c32df"
        fetch(url)
          .then(response => response.json())
          .then(function (data) {
            console.log(data);
            var lat = data[0].lat;
            var lon = data[0].lon;
            var city = data[0].name;
            var state = data[0].state;
            console.log("lat/long/city/st: "+lat+"/"+lon+"/"+city+"/"+state);
            // getWeather(lat,lon,city,state);
            storeCity(lat,lon,city,state);
          })
          .catch(function () {
  
          });
      }

// ADD NEW SEARCH CITY TO LOCAL STORAGE

function storeCity(lat,lon,city,state) {
    console.log(city);
    var citiesRaw = localStorage.getItem("prevCities"); // get string of all data
    var citiesArray = []; // make an empty array
        if (!!citiesRaw) {
        citiesArray = JSON.parse(citiesRaw); //parse string into array
        }
    citiesArray.unshift({ city: city, state: state, lat: lat, lon: lon}); // stick new city on front end 
    localStorage.setItem("prevCities", JSON.stringify(citiesArray));
    showPrevCities("add");
    getWeather(lat,lon,city,state);
    };




//GET THE WEATHER LOWDOWN
    function getWeather(lat,lon,city,state) {
        var url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely&units=imperial&appid=f1d85396b0ac359611b0e0093b0c32df"
        fetch(url)
          .then(response => response.json())
          .then(function (data) {
            console.log("Hello from getWeather" + lat + "/" + lon);
            drawWeather(data,city,state);
          })
          .catch(function () {
  
          });
      }

  
      function drawWeather(d,city,state) {
        console.log("Hello from drawWeather. city: "+city+"state: "+state);
        console.log(d);
        document.getElementById('location').innerHTML = city; // + ", " + state;
        document.getElementById('description').innerHTML = "Currently " + d.current.weather[0].description;
        document.getElementById('temp').innerHTML = "The temperature right now is " + d.current.temp.toFixed() + '&deg;' + " but it feels like " + d.current.feels_like.toFixed() + '&deg;';
        document.getElementById('minmax').innerHTML = "Today's low is " + d.daily[0].temp.min.toFixed() + " and the high will be " + d.daily[0].temp.max.toFixed();
        var currentIcon = d.current.weather[0].icon;
        var currentIconURL = "http://openweathermap.org/img/wn/"+currentIcon+"@2x.png";
        console.log("icon: "+currentIconURL);
        document.getElementById("nowIcon").src=currentIconURL;
        // document.getElementById('tempmax').innerHTML = "The high today is " + tempmax + '&deg';
        
// DISPLAY THE 5 DAY FORECAST   
        // clear current 5 day forecast
        $("#5day").empty();
        // add info for each of next 5 days
        for(var i=1; i<6; i++) {
        //get api data to display    
        var date = dayjs.unix(d.daily[i].dt).format('ddd MMM M');
        var low = d.daily[i].temp.min;
        var high = d.daily[i].temp.max;
        var weathDesc = d.daily[i].weather[0].description;
        var uvi = d.daily[i].uvi;
        var hum = d.daily[i].humidity;
        var currentIcon = d.daily[i].weather[0].icon;
        var currentIconURL = "http://openweathermap.org/img/wn/"+currentIcon+".png";
        console.log("icon: "+currentIconURL);
        // document.getElementById("nowIcon").src=currentIconURL;
        // console.log("desc: "+weathDesc+" uvi: "+uvi+" hum; "+hum);
        //get elements in place to attach stuff to
        var dailyContainer = document.getElementById("5day");
        var oneDay = document.createElement("div");
        oneDay.setAttribute("id","card"+i);
        oneDay.setAttribute("class","cardDate");
        var iconE = document.createElement("img");
        iconE.setAttribute("class","fiveDicon");
        iconE.setAttribute("src",currentIconURL);
        var dateE = document.createElement("p");
        dateE.setAttribute("class","cardDate");
        var lowE = document.createElement("p");
        var highE = document.createElement("p");
        var weathDescE = document.createElement("p");
        var uviE = document.createElement("p");
        var humE = document.createElement("p");
        oneDay.setAttribute("class", "fiveDayCard");
        dateE.textContent = date;
        lowE.textContent = "Low: "+ low.toFixed();
        highE.textContent = "High: "+ high.toFixed();
        weathDescE.textContent = weathDesc;
        uviE.textContent = "UV Index: "+uvi;
        humE.textContent = "Humidty: "+hum;
        dailyContainer.appendChild(oneDay);
        var card = document.getElementById("card"+i);
        card.appendChild(dateE);
        card.appendChild(iconE);
        card.appendChild(weathDescE);
        card.appendChild(lowE);
        card.appendChild(highE);
        card.appendChild(humE);
        card.appendChild(uviE);
        }

      }


showPrevCities("all");
// cityValidation("Honolulu,HI");
getWeather("21.3069","-157.8583","Honolulu","HI")

//  *** EVENT LISTENERS ***

//Listen for click on city
var cities = document.getElementById("cityList");
console.log("cities; " + cities);
cities.addEventListener("click", function(event){
    // clear current 5 day forecast
    $("#5day").empty();
    console.log(event);
    // var city = event.target.innerHTML
    var lat = event.target.dataset.lat;
    var lon = event.target.dataset.lon;
    var city = event.target.dataset.city;
    var state = event.target.dataset.state;
    console.log("From event listener the city is: " + city)
    console.log("lat: "+lat+" lon: "+lon)
    document.getElementsByClassName("fiveDayCard").innerHTML = "";
    getWeather(lat,lon,city,state);
})


