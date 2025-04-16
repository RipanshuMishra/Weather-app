document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById("city-input");
    const weatherBtn = document.getElementById("weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const tempDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error");

    const API_KEY = "eabb8707e77b686990d59cd9bd68183d";

    weatherBtn.addEventListener('click',async()=>{
        const city = cityInput.value.trim()
        if(!city)return;


        try{
            const weatherData = await fetchweatherData(city);
            displayWeatherData(weatherData);
        }catch(error){
            showError();
        }


    })


    async function fetchweatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log(response);

        if(!response.ok){
            throw new Error("city not found");
        }
        const data = await response.json()
        return data
 
    }


    function displayWeatherData(data){
        console.log(data);
        const {name, main, weather} = data
        cityNameDisplay.textContent = name;
        tempDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;


        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

    }

    function showError(error) {
         
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');

        
    }


})