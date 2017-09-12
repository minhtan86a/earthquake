//create map
var map, infowindow;
function initMap() {
		infowindow = new google.maps.InfoWindow();
		map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: new google.maps.LatLng(2.8,-187.3),
		mapTypeId: 'terrain'
	});
}
$(function() {
	//Toggle box
	$('.close-btn').click(function() {
		$('#content').removeClass('open-box').addClass('close-box');
	});

	//get data
var data = $.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(data, status){
        for (var i = 0; i < data.features.length; i++) {
			var coords = data.features[i].geometry.coordinates;
			var latLng = new google.maps.LatLng(coords[1],coords[0]);
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon:'assets/imgs/pink-dot.png',
			});

			//add click event for marker
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
		      		return function() {
		      		//prepare data to show on popup	
		  			var location = data.features[i].properties.place;
		  			//format datatime
					var timestamp = data.features[i].properties.time;
				    var todate=new Date(timestamp).getDate();
				    var tomonth=new Date(timestamp).getMonth()+1;
				    var toyear=new Date(timestamp).getFullYear();
				    var original_date=tomonth+'/'+todate+'/'+toyear;
					var contentString = "<strong>" + location + "</strong><br /><hr />Datetime: " + original_date;

					//show small popup on map
		        	infowindow.setContent(contentString);
		        	infowindow.open(map, marker);

		        	var contents = $('#content');
		        	var properties = data.features[i].properties;
		        	contents.addClass('open-box');
		        	//show some data
		        	$('#status').text(properties.status);
		        	$('#tsunami').text(properties.tsunami);
		        	$('#sig').text(properties.sig);
		        	$('#net').text(properties.net);
		        	$('#types').text(properties.types);
		  		}
			})(marker, i));
		}
	});
});



											