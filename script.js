const apiKey = 'a14cc752fb4420650988752047902311'; // Replace with your actual API key
const weatherResult = document.getElementById('weatherResult');
const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('cityInput');
const suggestionsBox = document.getElementById('suggestions');

const cities = [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", 
    "Ahmedabad", "Bhavnagar", "Jamnagar", "Junagadh", "Mehsana"
    // Add more cities as needed
];

cityInput.addEventListener('input', () => {
    const input = cityInput.value.toLowerCase();
    suggestionsBox.innerHTML = ''; // Clear previous suggestions
    if (input) {
        const filteredCities = cities.filter(city => city.toLowerCase().includes(input));
        filteredCities.forEach(city => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = city;
            suggestionItem.addEventListener('click', () => {
                cityInput.value = city; // Set input value to selected city
                suggestionsBox.innerHTML = ''; // Clear suggestions
            });
            suggestionsBox.appendChild(suggestionItem);
        });
    }
});

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description } = data.weather[0];

    weatherResult.innerHTML = `
        <h3>Weather in ${name}</h3>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
}
