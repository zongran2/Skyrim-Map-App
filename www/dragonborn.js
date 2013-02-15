var gameTypeOptions = {
	getTileUrl: function(coord, zoom) {
		var normalizedCoord = getNormalizedCoord(coord, zoom);
		if (!normalizedCoord) {
			return null;
		}
		var boundnorm = Math.pow(2, zoom);
		return "http://maps.tamrielma.ps/dragonborn" + "/" + zoom + "/" + normalizedCoord.x + "/" + (boundnorm - normalizedCoord.y - 1) + ".jpg";
	},
	tileSize: new google.maps.Size(256, 256),
	isPng: false,
	minZoom: 0,
	maxZoom: 5,
	radius: 1738000,
	name: 'Game'
};
var gameMapType = new google.maps.ImageMapType(gameTypeOptions);
var fusione = '1Nk80BH7CeROBXLRFBb1yfOI5c2EqOxVMhU-V9m4';

function initialize() {
	var mapGame = ['Game']
	var myLatlng = new google.maps.LatLng(-10, 20);
	var myOptions = {
		center: myLatlng,
		zoom: 1,
		mapTypeControl: false,
		streetViewControl: false,
		panControl: false,
		scaleControl: false,
		zoomControl: true,
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    google.maps.event.addListener(map, 'tilesloaded',  function(){
                                  document.getElementById("caricamento").style.display = 'none';
                                  });	
	map.mapTypes.set('Game', gameMapType)
	map.setMapTypeId('Game');

  layerMarkers = new google.maps.FusionTablesLayer({});
  layerMarkers.setMap(map);
  
}//FINE INITIALIZE

function filterData() {
	var filter = [];
	var idx = 0;
	var seletts = document.getElementsByName('selett');
	for (var i = 0, selett; selett = seletts[i]; i++) {
		if (selett.selected) {
			var selettName = selett.value.replace(/'/g, '\\\'');
			filter.push("'" + selettName + "'");
		}
		if (document.getElementById('toggleAll').selected) {
			var i = 0;
			for (i = 0; i <= 70; i++) {
				filter[idx] = i;
				idx++;
			}
		}
	}
	if (filter.length) {
		if (!layerMarkers.getMap()) {
			layerMarkers.setMap(map);
		}
		layerMarkers.setOptions({
			query: {
				select: 'numero',
				from: fusione,
				where: "'numero' IN (" + filter.join(',') + ')'
			}
		});
	} else {
		layerMarkers.setMap(null);
	}
}




function getNormalizedCoord(coord, zoom) {
	var y = coord.y;
	var x = coord.x;
	var tileRange = 1 << zoom;
	if (y < 0 || y >= tileRange) {
		return null;
	}
	if (x < 0 || x >= tileRange) {
		x = (x % tileRange + tileRange) % tileRange;
	}
	return {
		x: x,
		y: y
	};
}


