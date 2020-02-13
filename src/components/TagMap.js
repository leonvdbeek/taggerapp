import React from "react";
import LoadingOverlay from 'react-loading-overlay';
import {
  GoogleMapProvider,
  MapBox,
  Marker,
  CustomControl
} from "@googlemap-react/core";
import { Button, Typography } from '@material-ui/core';

export default function TagMap(props) {

  return (
    <div style={{ height: "100%", position: "fixed" }} >
      <LoadingOverlay active={props.loading} spinner text={<Typography>Loading data..</Typography>}>
        <GoogleMapProvider>
          <MapBox
            apiKey="AIzaSyBemL6idNDqQ9rh3jZvAzq9F6sAfYGBIf4"
            style={{
              height: "100vh",
              width: "100vw",
              minHeight: "-webkit-fill-available",
              position: "fixed"
            }}
            opts={{
              center: props.cent,
              zoom: 6,
              disableDefaultUI: false,
              fullscreenControl: false,
              streetViewControl: false
            }}
          />
          <CustomControl bindingPosition="BOTTOM_CENTER">
            <Button variant="contained" color="primary" onClick={() => props.setOpenPlace(true)} style={{ marginBottom: "20px" }}>
              Place tag!
                </Button>
          </CustomControl>

          {props.tags.map(tag => (
            <Marker
              key={tag._id}
              id={tag.name}
              opts={{
                position: {
                  lat: tag.lat,
                  lng: tag.lng
                }
              }}
              onClick={() => {
                props.setSelectedTag({ lat: tag.lat, lng: tag.lng, name: tag.name, desc: tag.desc, img: tag.img })
                props.setOpenInfo(true)
              }
              }
            />
          ))}
        </GoogleMapProvider>
      </LoadingOverlay>
    </div>
  )
};