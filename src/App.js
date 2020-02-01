import React from "react";
import {
  GoogleMapProvider,
  MapBox,
  Marker,
  CustomControl
} from "@googlemap-react/core";
const axios = require("axios");
var request = require("request");


export default function App() {
  const [tags, setTags] = React.useState([]);
  const [cent, setCent] = React.useState({lat: 33, lng: 33});


  //At render will call getData
  React.useEffect( () => (initMap()), []);

  //Function to run on initial load to set center and load data
  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCent(pos);
      })
    }
    // Get the data aswell
    console.log("getting data...");
    axios
      .get("https://tagger-aa28.restdb.io/rest/tags", {
        headers: {
          'cache-control': 'no-cache',
          "x-apikey": "5e33ef294327326cf1c91d89"
        }
      })
      .then(function(response) {
        console.log(response.data);
        setTags(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // Function to get all tags from database
  const getData = () => {
    console.log("getting data...");
    axios
      .get("https://tagger-aa28.restdb.io/rest/tags", {
        headers: {
          'cache-control': 'no-cache',
          "x-apikey": "5e33ef294327326cf1c91d89"
        }
      })
      .then(function(response) {
        console.log(response.data);
        setTags(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // Function to create a new tag based on GeoLocation
  const postTag = () => {
    console.log("Getting Geo location!");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("posting new tag (" + pos.lat + ", " + pos.lng + ")...");

        // Got geo location so will post now, this will give errors but it gets posted anyway soo...
        var options = { method: 'POST',
          url: 'https://tagger-aa28.restdb.io/rest/tags',
          headers: 
          { 'cache-control': 'no-cache',
            'x-apikey': '00652993be9a59ac992a8c96e319850b38bd4' },
          body: { lat: pos.lat, lng: pos.lng },
          json: true };

        request(options, function (error, response, body) {
          if (error) console.log(error);;

          console.log(body);

          //After posting make sure to get the data again
          getData();
        });
      })
    }    
  };

  return (
    <div className="App">
      <GoogleMapProvider>
        <MapBox
          apiKey="AIzaSyBemL6idNDqQ9rh3jZvAzq9F6sAfYGBIf4"
          style={{
            height: "100vh",
            width: "100%"
          }}
          opts={{
            center: cent,
            zoom: 6,
            disableDefaultUI: false,
            fullscreenControl: false,
            streetViewControl: false
          }}
        />

        <CustomControl bindingPosition="BOTTOM_CENTER">
          <button onClick={() => postTag()} style={{ marginBottom: "20px" }}>
            Place tag!
          </button>
        </CustomControl>

        {tags.map(tag => (
          <Marker
            key={tag._id}
            opts={{
              position: {
                lat: tag.lat,
                lng: tag.lng
              }
            }}
          />
        ))}
      </GoogleMapProvider>
    </div>
  );
}

