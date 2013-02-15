//////////////Type GAME START//////////////
var gameTypeOptions = {
getTileUrl: function(coord, zoom) {
    var normalizedCoord = getNormalizedCoord(coord, zoom);
    if (!normalizedCoord) {
        return null;
    }
    var boundnorm = Math.pow(2, zoom); 
    return "http://maps.tamrielma.ps/skyrim" + "/" + zoom + "/" + normalizedCoord.x + "/" + (boundnorm - normalizedCoord.y - 1) + ".jpg";
},
tileSize: new google.maps.Size(256, 256),
isPng: false,
maxZoom: 5,
minZoom: 1,
radius: 1738000,
name: 'Game'
};   
var gameMapType = new google.maps.ImageMapType(gameTypeOptions);
//////////////Type GAME END//////////////
var fusione = '1vEQ4Qzt8X1iCWEkvpSdnP4rtV0i5h7zDUnBLBP8';

function initialize() {  
    var mapGame = ['Game']   
    //  var mapBump = [ 'Bump']      
    var myLatlng = new google.maps.LatLng(0,0);
    if(screen.width<768||screen.height<768){
        var myOptions = {
        center: myLatlng,
        zoom: 2,
        mapTypeControl: false,
        streetViewControl: false,      
        mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
	    position: google.maps.ControlPosition.BOTTOM_CENTER,
            mapTypeId/*s*/: [/*'Bump',*/'Game']
        }             
      } 
    }       
    else {  
        var myOptions = {
        center: myLatlng,
        zoom: 2,
        mapTypeControl: false,
        streetViewControl: false,      
        mapTypeControlOptions: {
	    position: google.maps.ControlPosition.BOTTOM_CENTER,
            mapTypeId/*s*/: [/*'Bump',*/'Game']
        }             
      } 
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions ); 
    google.maps.event.addListener(map, 'tilesloaded',  function(){
                                  document.getElementById("caricamento").style.display = 'none';
                                  });
    map.mapTypes.set('Game',gameMapType)
    map.setMapTypeId('Game');
  layerMarkers = new google.maps.FusionTablesLayer({styleId: 2,templateId: 2});
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
    
    
	if (document.getElementById('toggleAll').selected)   {
	  var i=0;
	  for (i=0;i<=70;i++)
	  {
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
