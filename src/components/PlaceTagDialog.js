import React from "react";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Typography, } from '@material-ui/core';

const axios = require("axios");

export default function PlaceTagDialog(props) {
  const [file, setFile] = React.useState();
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [hasError, setError] = React.useState(false);

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
      .then(function (response) {
        console.log(response.data);
        props.setTags(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Function to create a new tag based on GeoLocation
  const postTag = (fileid) => {
    console.log("posting new tag (" + props.cent.lat + ", " + props.cent.lng + ")...");

    axios.post('https://tagger-aa28.restdb.io/rest/tags', { name: name, description: desc, lat: props.cent.lat, lng: props.cent.lng, img: fileid }, {
      headers: {
        'cache-control': 'no-cache',
        "x-apikey": "5e33ef294327326cf1c91d89"
      }
    })
      .then(res => {
        console.log(res)
        //After posting make sure to get the data again
        getData();
        props.setOpen(false);
        setFile();
        setName("");
        setDesc("");
        setError(false);
      })
  };

  const handleFileUpload = () => {
    if (name === '') {
      setError(true)
    } else {
      console.log("Uploading image..")
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
          postTag(res.data.ids[0])
        })
    }
  };

  return (
    <Dialog onClose={() => {
      props.setOpen(false)
      setError(false)
    }} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle id="simple-dialog-title">Create a new tag!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Insert a name, description and upload an image and post a new tag! The GPS coordinates are based on your location!
        </DialogContentText>
        <TextField
          autoFocus
          required
          error={hasError}
          helperText={hasError ? 'Name can not be empty!' : ' '}
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
          value={props.cent.lat}
        />
        <TextField
          disabled
          variant="outlined"
          margin="dense"
          id="lng"
          label="Longitude"
          type="lng"
          fullWidth
          value={props.cent.lng}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span" margin="dense">
            Upload
          </Button>
          <Typography>{file ? 'Selected: ' + file.name : 'Please upload a file'}</Typography>
        </label>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          props.setOpen(false)
          setError(false)
        }} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleFileUpload()} color="primary">
          Tag!
        </Button>
      </DialogActions>
    </Dialog>
  )
};