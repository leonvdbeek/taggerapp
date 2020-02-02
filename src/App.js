import React from 'react';
import TagMap from './components/TagMap';
import TagDialog from './components/TagDialog';

const axios = require("axios");

export default function App() {
  const [tags, setTags] = React.useState([]);
  const [cent, setCent] = React.useState({ lat: 33, lng: 33 });
  const [open, setOpen] = React.useState(false);

  //At render will call getData
  React.useEffect(() => (initMap()), []);

  //Function to run on initial load to set center and load data
  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
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
      .then(function (response) {
        console.log(response.data);
        setTags(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <TagMap cent={cent} open={open} setOpen={setOpen} tags={tags} />

      <TagDialog cent={cent} open={open} setOpen={setOpen} setTags={setTags} />
    </div>
  );
}