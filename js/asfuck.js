	var sunnyIcon = "wi wi-day-sunny";
	var rainIcon = "wi wi-sprinkles";
	var cloudyIcon = "wi wi-cloudy";
	var stormIcon = "wi wi-lightning";
	var coldIcon = "wi wi-snowflake-cold";


$(document).ready(function() {  
	//ICON VARIABLES
	//CHECK IF GEOLOCATION IS AVAILABLE
	 if ("geolocation" in navigator) {
	  $('#locate').show(); 
	} else {
	  $('#locate').hide();
	}

	navigator.geolocation.getCurrentPosition(function(position) {
	    loadWeather(position.coords.latitude+','+position.coords.longitude); 
	  });


	//LOCATION UPDATE
	$('#locate').on('click', function() {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    loadWeather(position.coords.latitude+','+position.coords.longitude); 
	  });
	});

	$('#locate').bind('touchstart', function() {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    loadWeather(position.coords.latitude+','+position.coords.longitude); 
	  });
	});

	$("#more").on('click', toggle);

	loadWeather();
	setInterval(loadWeather, 60000); //Update the weather every 5 minutes.
});

function toggle() {
	var el = document.getElementById("extra");
	if ( el.style.display != 'none' ) {

		el.style.display = 'none';

	}

	else {

		el.style.display = '';

	}

}


//DOCUMENT
function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather){
    	console.log("test");
    console.log(weather.title);

  	var iconHolder = $('#icon')[0];
	//COLOURS
	var orange = "#F2B441";
	var lightBlue = "#A0CCFF";
	var darkBlue = "#23568F";

	var icon = document.getElementById("icon");
	var adj = document.getElementById("adj");
	var bg = document.body;

	//THRESHOLDS
		//***//TIER ONE
			var hot = 26;  
			var cold = 14;
			var windy = 8;
		//******//TIER TWO
				var storm = 12;
				var snow = 18;
				var cloudy = 30;
				var sunny =  36;
				var rainy = 47;

		//STATES
		var currentTemp = weather.temp;
		var currentState = weather.todayCode;
	    var wind = weather.wind.speed;
	    var humid = weather.humidity;
	    	console.log(currentTemp + " " + currentState  + " " + wind);
	    	if (currentTemp >= hot){ //IF IT'S HOT
	    		if(currentState <= 36 && currentState > 30){ // IF IT'S HOT AND THE ITS SUNNY

	    			bg.style.background = orange;
	    			adj.innerHTML = "SUNNY";
	    			icon.setAttribute("class", sunnyIcon);

	    		}else if(currentState <= 30 && currentState > 18){ // AND CLOUDY
	    			
	    			bg.style.background = lightBlue;
	    			adj.innerHTML = "CLOUDY";
	    			icon.setAttribute("class", cloudyIcon);

	    		}else{

	    			bg.style.background = orange;
	    			adj.innerHTML = "HOT";
	    			icon.setAttribute("class", sunnyIcon);
	    		}

	    	}else if(currentTemp <= cold){ //========== IF IT'S COLD
	    		if(currentState >= 47){ //====== AND RAINING
	    			
	    			console.log("RAIN");
	    			bg.style.background = darkBlue;
	    			adj.innerHTML = "WET";
	    			icon.setAttribute("class", rainIcon);


	    		}else if(currentState <= 30 && currentState > 18){ //====== AND CLOUDY

	    			console.log("CLOUDS");
	    			bg.style.background = lightBlue;
	    			adj.innerHTML = "CLOUDY";
	    			icon.setAttribute("class", cloudyIcon);

	    		}else if(currentState <= 18 && currentState > 12){ //====== AND STORMY

	    			console.log("STORM");
	    			bg.style.background = darkBlue;
	    			adj.innerHTML = "STORMY";
	    			icon.setAttribute("class", stormIcon);

	    		}else{

	    			console.log("SHITS COLD YO"); //====== OR JUST FUCKING COLD
	    			bg.style.background = lightBlue;
	    			adj.innerHTML = "COLD";
	    			icon.setAttribute("class", coldIcon);

	    		}
	    	}else if(currentTemp > cold && currentTemp < hot){ //===== ===== IF IT'S AVERAGE
	    		if(currentState <= 36 && currentState < 30){ //====== AND SUNNY
	    			
	    			console.log("SHITS SUNNY YO");
					bg.style.background = orange;
	    			adj.innerHTML = "SUNNY";
	    			icon.setAttribute("class", sunnyIcon);

	    		}else if(currentState <= 30 && currentState > 18){ //====== AND CLOUDY
	    			
	    			console.log("SHITS CLOUDY YO (and average)");
	    			bg.style.background = lightBlue;
	    			adj.innerHTML = "CLOUDY";
	    			icon.setAttribute("class", cloudyIcon);

	    		}else{
	    			
	    			bg.style.background = orange;
	    			adj.innerHTML = "AVERAGE";
	    			icon.setAttribute("class", sunnyIcon);

	    		}
	    	}else{

	    			bg.style.background = "#Eb01A5";
	    			adj.innerHTML = "BROKE";
	    			icon.setAttribute("class", coldIcon);

	    	}


	    }
    });
}

  