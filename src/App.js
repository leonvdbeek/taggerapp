import React from 'react';
import TagMap from './components/TagMap';
import PlaceTagDialog from './components/PlaceTagDialog';
import TagInfoDialog from './components/InfoTagDialog';

const axios = require("axios");

export default function App() {
  const [tags, setTags] = React.useState([]);
  const [cent, setCent] = React.useState({ lat: 33, lng: 33 });
  const [openPlace, setOpenPlace] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [selectedTag, setSelectedTag] = React.useState({ lat: 0, lng: 0, name: "", desc: "", img: 0 });
  const [loading, setLoading] = React.useState(true);

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
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <TagMap loading={loading} cent={cent} setSelectedTag={setSelectedTag} openPlace={openPlace} setOpenPlace={setOpenPlace} openInfo={openInfo} setOpenInfo={setOpenInfo} tags={tags} />
      <TagInfoDialog open={openInfo} setOpen={setOpenInfo} tag={selectedTag} />
      <PlaceTagDialog cent={cent} open={openPlace} setOpen={setOpenPlace} setTags={setTags} />
    </div>
  );
}