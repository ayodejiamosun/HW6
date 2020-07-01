// Search history array
var cities = ["London", "Austin", "Sydney"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayWeather() {

  var city = $(this).attr("data-name");
  var todayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6c814b3476e3dccefc544cd800fb5edf&units=metric";
  var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6c814b3476e3dccefc544cd800fb5edf&units=metric";

  // AJAX call for current weather
  $.ajax({
    url: todayQueryURL,
    method: "GET"
  }).then(function(response) {
    $("#current-weather-div").empty();

 

    var heading1 = $("<h3>").text("Current Forcast: ");
    $("#current-weather-div").append(heading1);

    var cityName = response.name;
    var pcityName = $("<p>").text("City: " + cityName);

    var temp = response.main.temp;
    var ptemp = $("<p>").text("Temp: " + temp + "°C");

    var humidity = response.main.humidity;
    var phumidity = $("<p>").text("Humidity: " + humidity + "%");
    
    var wind = response.wind.speed;
    var pwind = $("<p>").text("Wind Speed: " + wind + " mph");

    // var UV = 

    $("#current-weather-div").append(pcityName, ptemp, phumidity, pwind);

  });

  // AJAX call for 5 day forecast
  $.ajax({
    url: fiveDayQueryURL,
    method: "GET"
  }).then(function(response) {

    $("#five-day-div").empty();

    for (var i = 0; i < 5; i++) {
        
        var heading2 = $("<h3>").text("5 Day Forcast: ");
        $("#five-day-div").append(heading2);


        var fivetemp = response.list[i].main.temp;
        var pfivetemp = $("<p>").text("Temp: " + fivetemp + "°C"); 

        var fivehumidity = response.list[i].main.humidity;
        var pfivehumidity = $("<p>").text("Humidity: " + fivehumidity + "%"); 

        var spacer = $("<p>").text("-----------------");

        $("#five-day-div").append(pfivetemp, pfivehumidity, spacer);

        
    }



  });

}

// Function for displaying search history list
function renderButtons() {

  // Deleting the cities prior to adding new cities
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generating buttons for each city in the array
    var a = $("<button>");
    // Adding a class of city-btn to our button
    a.addClass("city-btn");
    // Adding a data-attribute
    a.attr("data-name", cities[i]);
    // Providing the initial button text
    a.text(cities[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a city button is clicked
$("#search-btn").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var city = $("#city-input").val().trim();

  // Adding movie from the textbox to our array
  cities.push(city);

  // Calling renderButtons which handles the processing of our cities array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "city-btn"
// $(".city-btn").on("click", function() {
//     $("#current-weather-div").clear();
//     $("#five-day-div").clear();
// });

$(document).on("click", ".city-btn", displayWeather);



// Calling the renderButtons function to display the initial buttons
renderButtons();