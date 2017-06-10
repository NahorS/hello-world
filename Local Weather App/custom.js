//Aninmated icons will be shown only for the current location.
var icons = new Skycons({"color":"#d5f4e6"});
var unit = "N";
var t;
var minT,maxT;
var urlPart1 = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/6cbabb3682fd43a569b9f461df979e3d/";
var openUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=";
var appid = "&APPID=2ae3f8dc944daf76f2eb9f7f28def739";
function cityWeather(){
  var city = $("#searchCity").val();
  var url1 = openUrl + city + appid + "&units=metric";
  $.ajax({url:url1,dataType:'json',success:function(data){
    $("#weatherIcon").hide();
    if(typeof data === "string")
      data = JSON.parse(data);
    var cityName = data.name;
    var temp = Math.floor(data.main.temp);
    t = temp;
    var h = data.main.humidity;
    var temp_min = data.main.temp_min;
    minT = temp_min;
    var temp_max = data.main.temp_max;
    maxT = temp_max;
    var weather = data.weather[0].description;
    unit = "C";
    $("#cityName").text(cityName);
    $("#temp").text(temp);
    $("#humidity").text(h + "%");
    $("#minTemp").text(temp_min);
    $("#maxTemp").text(temp_max);
    $("#weather").text(weather);
    $("#CorF").text("C")
    $("#CorF1").text("C");
    $("#CorF2").text("C");
  }});
}
function localWeather(){
  
  if(navigator.geolocation)
 navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var longi = position.coords.longitude;

      var url1 = urlPart1 + lat + ',' + longi + '?units=auto'; //url created.
$.ajax({type:'GET',url:url1,
        dataType:'json',
        success:function(w){          
          if(typeof w=="string"){
            w=JSON.parse(w);//Weather object.
          }          
          $("#weatherIcon").show();
          var icon = w.currently.icon;
          icons.add("weatherIcon",icon);
          icons.play();
        var temp = Math.floor(w.currently.temperature);
          t = temp;
          var h = w.currently.humidity;
          var temp_min =Math.floor( w.daily.data[0].temperatureMin);
          minT = temp_min;
          var temp_max = Math.floor(w.daily.data[0].temperatureMax);
          maxT = temp_max;
          var weather = w.daily.data[0].summary;
          var cityName = w.timezone;
          cityName = cityName.split('/');
          if(w.flags.units=="us"){
          unit = "F";
          $("#cityName").text(cityName[1]);
          $("#humidity").text((h*100) + "%");
          $("#minTemp").text(temp_min);
          $("#maxTemp").text(temp_max);
          $("#weather").text(weather);
          $("#temp").text(temp);
          $("#CorF").text("F");
          $("#CorF1").text("F");
          $("#CorF2").text("F");
        }
        else{
          unit = "C";
          $("#cityName").text(cityName[1]);
         $("#humidity").text(Math.floor(h*100) + "%");
          $("#minTemp").text(temp_min);
          $("#maxTemp").text(temp_max);
          $("#weather").text(weather);
          $("#temp").text(temp);
          $("#CorF").text("C");
          $("#CorF1").text("C");
          $("#CorF2").text("C");
        }
      }});
    },function(error){
      if(error.code==1)
        alert("Access is denied");
      else
        alert(error.message);
    },{timeout:30000,enableHighAccuracy:true});
  else{
    alert(error.message);}
}

$(document).ready(function(){
  localWeather();
  $("#getCurrentLocButton").on('click',localWeather);
  $("#citySubmitButton").on('click',cityWeather);
  $("#changeUnits").on('click',function(){
    if(unit=="F"){
      //Toggle between Celcius and Farenheit.
      t = Math.floor((t - 32) * 5 / 9);
      maxT = Math.floor((maxT - 32) * 5 / 9);
      minT = Math.floor((minT - 32) * 5 / 9);
      unit = "C";
      $("#temp").text(t);
      $("#minTemp").text(minT);
      $("#maxTemp").text(maxT);
      $("#CorF").text("C");
      $("#CorF1").text("C");
      $("#CorF2").text("C");
    }
    else{
      t = Math.floor((t * 9 / 5)  + 32);
      maxT = Math.floor((maxT * 9 / 5) + 32);
      minT = Math.floor((minT * 9 / 5) + 32);
      unit = "C";
      $("#temp").text(t);
      $("#minTemp").text(minT);
      $("#maxTemp").text(maxT);
      $("#CorF").text("F");
      $("#CorF1").text("F");
      $("#CorF2").text("F");
      
      unit = "F";
    }
  });
});