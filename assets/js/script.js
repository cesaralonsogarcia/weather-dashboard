var cityInput = $('#cityInput');
var searchButton = $('#searchButton');
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

var cityFromUser;
var cityLat;
var cityLon;
var weatherAPIKey = 'ee1e324da2fdf212344dc0dfc23a3390'
var geocodingAPIUrl;
var weatherAPIUrl;
var iconUrl;

// Ensure the code is not run until the browser has finished rendering
$(function() {
    // Render dates on screen
    todayDate.text(dateDisplay);
    secondDate.text(secondDateDisplay);
    thirdDate.text(thirdDateDisplay);
    fourthDate.text(fourthDateDisplay);
    fifthDate.text(fifthDateDisplay);
    sixthDate.text(sixthDateDisplay);

    // Get data for current city

    // Event listener for search button
    searchButton.click(function() {
        cityFromUser = cityInput.val();
        geocodingAPIUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityFromUser + '&limit=1&appid=' + weatherAPIKey;
        // Get data from API
        fetch(geocodingAPIUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Save latitude and longitude for city
                console.log(data);
                city.text(data[0].name);
                cityLat = data[0].lat;
                cityLon = data[0].lon;
                weatherAPIUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + weatherAPIKey + '&units=imperial';
                console.log(weatherAPIUrl);
                // Nested fetch to get weather after getting latitude and longitude
                fetch(weatherAPIUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        // Render data to screen
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
                    });
            });
    });

    
});
