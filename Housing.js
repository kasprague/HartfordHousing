
// Hartford Open Data.  API Docs: http://dev.socrata.com/foundry/#/data.hartford.gov/86ax-cfey

		var map = L.map('map').setView([41.766085, -72.672677], 13);
		
		var terrainTiles = L.tileLayer.provider('CartoDB.Positron');
				terrainTiles.addTo(map);

		var lastyear = 	new Date().getFullYear() - 1
			

		var xhr = $.getJSON('https://data.hartford.gov/resource/86ax-cfey.json?status=OPEN' 
		
// TODO: Sign up for a token for year filtering	+ '&$where=reported?' + '2015-01-01'

		, function (data) {
			 
			var geojson = {};
			geojson['type'] = 'FeatureCollection';
			geojson.features = []; 
			 
			 for (i = 1; i < data.length; i++){
			 	g = data[i]
			 	geometry = g.geom
			 	var newFeature = {
    			"type": "Feature",
    				"geometry": {
      							"type": "Point",
      							"coordinates": [parseFloat(geometry.longitude), parseFloat(geometry.latitude)],
    							},
    				"properties": {
     						 "location": g.location,
      					 "location_description": g.location_description,
      					 "owner_name": g.ownername,
      					 "reported": g.reported,
      					 "statusclosedate": g.statusclosedate,
      					 "complaintviolation": g.complaintviolation,
      					 "complieddate": g.complieddate,
      					 "department": g.department,
    					}
  			} 
			 
			  geojson.features.push(newFeature)
			};
			

			
			L.geoJson(geojson, 
			{onEachFeature: function (feature, layer) {
				layer.bindPopup("<b>Location:</b> " + feature.properties.location +
                    "<br><b>Reported: </b>" + feature.properties.reported +
                    "<br><b>Complaint Violation: </b>" + feature.properties.complaintviolation +
                    "<br><b>Owner: </b>" + feature.properties.ownername
                    
                    
                    )
                    
                    
                   
             }       
          }   
			).addTo(map)
												
			
		var info = L.control();
		
		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};
		
		info.update = function (props) {
			this._div.innerHTML = '<h2 style="margin:auto;">Open Housing Violations in Hartford</h2><br/>Sourced from <a href="https://data.hartford.gov/Housing-Development/HousingCodeViolations_01012011_Current/86ax-cfey"> Hartford Open Data </a>';
			
		};
		
		info.addTo(map);
		
		
			});
			
	
			
		
		
	
		
		
