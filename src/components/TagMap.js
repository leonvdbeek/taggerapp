import React from "react";
import {
  GoogleMapProvider,
  MapBox,
  Marker,
  CustomControl
} from "@googlemap-react/core";
import {Button} from '@material-ui/core';

export default function TagMap(props) {

    return(
        <GoogleMapProvider>
            <MapBox
            apiKey="AIzaSyBemL6idNDqQ9rh3jZvAzq9F6sAfYGBIf4"
            style={{
                height: "100vh",
                width: "100%"
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
            <Button variant="contained" color="primary" onClick={() => props.setOpen(true)} style={{ marginBottom: "20px" }}>
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
            />
            ))}
        </GoogleMapProvider>
    )
};