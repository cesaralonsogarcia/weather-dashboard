var cityInput = $('#cityInput');
var searchButton = $('#searchButton');
var searchList = $('#searchList');
var searchListButtons = $('#searchList > button');
var city = $('#city');
var todayDate = $('#todayDate');
var todayIcon = $('#todayIcon');
var todayTemp = $('#todayTemp');
var todayWind = $('#todayWind');
var todayHumidity = $('#todayHumidity');
var secondDate = $('#secondDate');
var secondIcon = $('#secondIcon');
var secondTemp = $('#secondTemp');
var secondWind = $('#secondWind');
var secondHumidity = $('#secondHumidity');
var thirdDate = $('#thirdDate');
var thirdIcon = $('#thirdIcon');
var thirdTemp = $('#thirdTemp');
var thirdWind = $('#thirdWind');
var thirdHumidity = $('#thirdHumidity');
var fourthDate = $('#fourthDate');
var fourthIcon = $('#fourthIcon');
var fourthTemp = $('#fourthTemp');
var fourthWind = $('#fourthWind');
var fourthHumidity = $('#fourthHumidity');
var fifthDate = $('#fifthDate');
var fifthIcon = $('#fifthIcon');
var fifthTemp = $('#fifthTemp');
var fifthWind = $('#fifthWind');
var fifthHumidity = $('#fifthHumidity');
var sixthDate = $('#sixthDate');
var sixthIcon = $('#sixthIcon');
var sixthTemp = $('#sixthTemp');
var sixthWind = $('#sixthWind');
var sixthHumidity = $('#sixthHumidity');

var dateDisplay = dayjs().format('MM/DD/YYYY');
var secondDateDisplay = dayjs().add(1, 'day').format('MM/DD/YYYY');
var thirdDateDisplay = dayjs().add(2, 'day').format('MM/DD/YYYY');
var fourthDateDisplay = dayjs().add(3, 'day').format('MM/DD/YYYY');
var fifthDateDisplay = dayjs().add(4, 'day').format('MM/DD/YYYY');
var sixthDateDisplay = dayjs().add(5, 'day').format('MM/DD/YYYY');

var cityFromUser = 'Dallas';
var cityLat;
var cityLon;
var weatherAPIKey = 'ee1e324da2fdf212344dc0dfc23a3390'
var geocodingAPIUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityFromUser + '&limit=1&appid=' + weatherAPIKey;
var weatherAPIUrl;
var iconUrl;
var cityHistoryString = '';
var cityHistory = [];
var searchListButtonHTML = '<button class="btn btn-secondary" type="button">';
var buttonEndTagHTML = '</button>';

// Ensure the code is not run until the browser has finished rendering
$(function () {
    // Render dates on screen
    todayDate.text(dateDisplay);
    secondDate.text(secondDateDisplay);
    thirdDate.text(thirdDateDisplay);
    fourthDate.text(fourthDateDisplay);
    fifthDate.text(fifthDateDisplay);
    sixthDate.text(sixthDateDisplay);

    getCityHistory();
    displaySearchHistory();

    // Use Dallas as default to display the first set of data
    getWeatherData();

    // Event listener for search button
    searchButton.click(function () {
        cityFromUser = cityInput.val();
        geocodingAPIUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityFromUser + '&limit=1&appid=' + weatherAPIKey;
        getWeatherData();
        saveToCityHistory();
        getCityHistory();
        displaySearchHistory();
        // Event listener for buttons from search history before reloading the page
        searchListButtons.click(function () {
            cityFromUser = $(this).text();
            geocodingAPIUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityFromUser + '&limit=1&appid=' + weatherAPIKey;
            getWeatherData();
        })
    });

    // Event listener for buttons from search history
    searchListButtons.click(function () {
        cityFromUser = $(this).text();
        geocodingAPIUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityFromUser + '&limit=1&appid=' + weatherAPIKey;
        getWeatherData();
    })
});

// This function get the data from the API
function getWeatherData() {
    fetch(geocodingAPIUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Save latitude and longitude for city
            city.text(data[0].name);
            cityLat = data[0].lat;
            cityLon = data[0].lon;
            weatherAPIUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + weatherAPIKey + '&units=imperial';
            // Nested fetch to get weather after getting latitude and longitude
            fetch(weatherAPIUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // Render data to screen
                    renderData(data);
                });
        });
}

// This function renders the data from the API to the screen
function renderData(data) {
    todayTemp.text(data.list[0].main.temp);
    iconUrl = 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png';
    todayIcon.attr('src', iconUrl);
    todayWind.text(data.list[0].wind.speed);
    todayHumidity.text(data.list[0].main.humidity);
    secondTemp.text(data.list[7].main.temp);
    iconUrl = 'https://openweathermap.org/img/wn/' + data.list[7].weather[0].icon + '@2x.png';
    secondIcon.attr('src', iconUrl);
    secondWind.text(data.list[7].wind.speed);
    secondHumidity.text(data.list[7].main.humidity);
    thirdTemp.text(data.list[15].main.temp);
    iconUrl = 'https://openweathermap.org/img/wn/' + data.list[15].weather[0].icon + '@2x.png';
    thirdIcon.attr('src', iconUrl);
    thirdWind.text(data.list[15].wind.speed);
    thirdHumidity.text(data.list[15].main.humidity);
    fourthTemp.text(data.list[23].main.temp);
    iconUrl = 'https://openweathermap.org/img/wn/' + data.list[15].weather[0].icon + '@2x.png';
    fourthIcon.attr('src', iconUrl);
    fourthWind.text(data.list[23].wind.speed);
    fourthHumidity.text(data.list[23].main.humidity);
    fifthTemp.text(data.list[31].main.temp);
    iconUrl = 'https://openweathermap.org/img/wn/' + data.list[15].weather[0].icon + '@2x.png';
    fifthIcon.attr('src', iconUrl);
    fifthWind.text(data.list[31].wind.speed);
    fifthHumidity.text(data.list[31].main.humidity);
    sixthTemp.text(data.list[39].main.temp);
    iconUrl = 'https://openweathermap.org/img/wn/' + data.list[15].weather[0].icon + '@2x.png';
    sixthIcon.attr('src', iconUrl);
    sixthWind.text(data.list[39].wind.speed);
    sixthHumidity.text(data.list[39].main.humidity);
}

// This function gets the city history from local storage
function getCityHistory() {
    cityHistoryString = localStorage.getItem('cityHistory');
    if (cityHistoryString !== null) {
        cityHistory = JSON.parse(cityHistoryString);
    }
}

// This function saves the city input from the user to local storage
function saveToCityHistory() {
    cityHistory.push(cityFromUser);
    localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
}

// This function displays the buttons from the search history
function displaySearchHistory() {
    searchList.text('');
    if (cityHistoryString !== null) {
        for (var i = 0; i < cityHistory.length; i++) {
            searchList.append(searchListButtonHTML + cityHistory[i] + buttonEndTagHTML);
            searchListButtons = $('#searchList > button');
        }
    }
    searchListButtons = $('#searchList > button');
}