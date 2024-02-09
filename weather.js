async function getlat(){ // function to get latitude of the place
    let city = document.getElementById("search").value //getting the value of the entered location
    let resp = await fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=61ac732d212c0f110eb0e5b701c7ca0b") //api to fetch latitude 
    let data = await resp.json();
    return data[0].lat
}
async function getlong(){ // function to get the longitude of the place
    let city = document.getElementById("search").value //getting the value of the entered location
    let resp = await fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=61ac732d212c0f110eb0e5b701c7ca0b") // api to fetch longitude
    let data = await resp.json();
    return data[0].lon
}
async function getweather(){ // function to get the weather details of the entered location
    let lat = await getlat()
    let long = await getlong()

    let resp = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=61ac732d212c0f110eb0e5b701c7ca0b")
    let data = await resp.json()

    let temp = data.main.temp - 273.15
    temp = temp.toFixed(3) //rounding off the temperature to 3 decimals
    let pressure = data.main.pressure
    let humidity = data.main.humidity
    let visibility = data.visibility
    let windspeed = data.wind.speed
    let winddir = data.wind.deg
    let descr = data.weather[0].main

    let temp1 = document.getElementById("tempvalue")
    let pressure1 = document.getElementById("pressure")
    let humidity1 = document.getElementById("humidity")
    let visibility1 = document.getElementById("visibility")
    let windspeed1 = document.getElementById("windspeed")
    let winddir1 = document.getElementById("winddir")
    let descr1 = document.getElementById("descr")
    let icon = document.getElementById("icon")
    let location = document.getElementById("location")
    let city = document.getElementById("search").value

    location.innerText = city;
    temp1.innerText = temp;
    pressure1.innerText = "Pressure: "+pressure;
    humidity1.innerText = "Humidity: "+humidity;
    visibility1.innerText = "Visibility: "+visibility;
    windspeed1.innerText = "Wind speed: "+windspeed;
    winddir1.innerText = "Wind direction: "+winddir;
    descr1.innerText = descr

    icon.setAttribute("src" , " https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")
    icon.setAttribute("width" , "70px")
}

document.getElementById("search").addEventListener("keyup", function(event )  {
    if (event.key === "Enter") { //adding event listener so that when enter key is pressed the getweather() function is called
      getweather();
    }
})

async function success(pos){
    let cdnts = pos.coords;
    let lat = cdnts.latitude; //getting the coordinates of the current location
    let long = cdnts.longitude;
    console.log(lat);
    console.log(long);
    let resp = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=61ac732d212c0f110eb0e5b701c7ca0b")
    let data = await resp.json()
    let temp = data.main.temp - 273.15
    temp = temp.toFixed(3)
    let pressure = data.main.pressure
    let humidity = data.main.humidity
    let visibility = data.visibility
    let windspeed = data.wind.speed
    let winddir = data.wind.deg
    let descr = data.weather[0].main

    let temp1 = document.getElementById("tempvalue")
    let pressure1 = document.getElementById("pressure")
    let humidity1 = document.getElementById("humidity")
    let visibility1 = document.getElementById("visibility")
    let windspeed1 = document.getElementById("windspeed")
    let winddir1 = document.getElementById("winddir")
    let descr1 = document.getElementById("descr")
    let icon = document.getElementById("icon")
    let location = document.getElementById("location")

    let resp2 = await fetch("http://api.openweathermap.org/geo/1.0/reverse?lat="+lat+"&lon="+long+"&limit=3&appid=61ac732d212c0f110eb0e5b701c7ca0b")
    let data2 = await resp2.json()

    location.innerText = data2[0].name;
    temp1.innerText = temp;
    pressure1.innerText = "Pressure: "+pressure;
    humidity1.innerText = "Humidity: "+humidity;
    visibility1.innerText = "Visibility: "+visibility;
    windspeed1.innerText = "Wind speed: "+windspeed;
    winddir1.innerText = "Wind direction: "+winddir;
    descr1.innerText = descr
    icon.setAttribute("src" , " https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")
    icon.setAttribute("width" , "70px")
}
navigator.geolocation.getCurrentPosition(success)
