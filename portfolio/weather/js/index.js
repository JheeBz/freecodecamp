// feather.replace();
const endpoint = 'http://fcc-weather-api.glitch.me';
let weatherInfo;
let international = true;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    long = position.coords.longitude;
    lat = position.coords.latitude;
    getWeather(long, lat);
  });
}

const getWeather = (long, lat) => {
  $.ajax({
    url: endpoint + `/api/current?lat=${lat}&lon=${long}`,
      type: 'get',
      success: function(response) {
        weatherInfo = response;
        render(weatherInfo);
      },
      dataType: 'json',
      cache: false
  });
}

const render = (weather) => {
  renderTemp(weather);
  renderLocation(weather);
  renderDesc(weather);
  renderWeatherIcon(weather);
}

const renderWeatherIcon = (weather) => {
  $(".weather.icon > i").addClass("wi wi-owm-" + weather.weather[0].id);
}

const renderDesc = (weather) => {
  $(".weather.description").html(weather.weather[0].description.capitalize());
}

const renderTemp = (weather) => {
  const celsius = weather.main.temp;
  const fahrenheit = celsius * 9/5 + 32;
  let htmlToRender;
  if (international) {
    htmlToRender = parseInt(celsius) + ' °C';
    // $("#international-switch > i.wi").removeClass(".wi-celsius").addClass("wi-fahrenheit");
  } else {
    htmlToRender = parseInt(fahrenheit) + ' °F'
    // $("#international-switch > i.wi").removeClass(".wi-fahrenheit").addClass("wi-celsius");
  }
  $(".weather.degrees").html(htmlToRender);
}

const renderLocation = (weather) => {
  $('.weather.location').html(`${weather.name}, ${weather.sys.country}`);
}

$("#international-switch").click(() => { 
  international = international ? false : true;
  renderTemp(weatherInfo);
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}