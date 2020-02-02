import React from "react";
import {
  GoogleMapProvider,
  MapBox,
  Marker,
  CustomControl
} from "@googlemap-react/core";
import {Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Typography, } from '@material-ui/core';

const axios = require("axios");

export default function App() {
  const [tags, setTags] = React.useState([]);
  const [cent, setCent] = React.useState({lat: 33, lng: 33});
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState();
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");

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
    console.log("posting new tag (" + cent.lat + ", " + cent.lng + ")...");

    axios.post('https://tagger-aa28.restdb.io/rest/tags', { name: name, description: desc, lat: cent.lat, lng: cent.lng, img: file}, {
      headers: {
        'cache-control': 'no-cache',
        "x-apikey": "5e33ef294327326cf1c91d89"
      }
    })
    .then(res => {
      console.log(res) 
      //After posting make sure to get the data again
      getData();
      setOpen(false);
    })
  };

  const handleFileUpload = (file) => {
    const fd = new FormData();
    fd.append('image', file, file.name);
    axios.post('https://tagger-aa28.restdb.io/media', fd, {
      headers: {
        'cache-control': 'no-cache',
        "x-apikey": "5e33ef294327326cf1c91d89"
      }
    })
    .then(res => {
      console.log(res) 
      setFile(res.data.ids[0])
    })
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
          <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ marginBottom: "20px" }}>
            Place tag!
          </Button>
        </CustomControl>

        {tags.map(tag => (
          <Marker
            key={tag._id}
            id={tag.name}
            opts={{
              position: {
                lat: tag.lat,
                lng: tag.lng
              }
            }}
          />
        ))}
      </GoogleMapProvider>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Create a new tag!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          variant="outlined"
          margin="dense"
          id="name"
          label="Name"
          type="name"
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          margin="dense"
          variant="outlined"
          id="desc"
          label="Description"
          type="name"
          fullWidth
          value={desc}
          onChange={(event) => setDesc(event.target.value)}
        />
        <TextField
          disabled
          variant="outlined"
          margin="dense"
          id="lat"
          label="Latitude"
          type="lat"
          fullWidth
          value={cent.lat}
        />
        <TextField
          disabled
          variant="outlined"
          margin="dense"
          id="lng"
          label="Longitude"
          type="lng"
          fullWidth
          value={cent.lng}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={(event) => handleFileUpload(event.target.files[0])}
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span" margin="dense">
            Upload
          </Button>
          <Typography>{file ? 'Uploaded: '+file : 'Please upload a file'}</Typography>
        </label>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => postTag()} color="primary">
          Tag!
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}

