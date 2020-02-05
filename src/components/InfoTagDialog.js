import React from "react";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@material-ui/core';

export default function InfoTagDialog(props) {

  return (
    <Dialog onClick={() => props.setOpen(false)} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle id="simple-dialog-title">Tag info for tag: {props.tag.name}</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          margin="dense"
          id="name"
          label="Name"
          type="name"
          fullWidth
          value={props.tag.name}
          disabled
        />
        <TextField
          margin="dense"
          variant="outlined"
          id="desc"
          label="Description"
          type="name"
          fullWidth
          value={props.tag.desc}
          disabled
        />
        <TextField
          disabled
          variant="outlined"
          margin="dense"
          id="lat"
          label="Latitude"
          type="lat"
          fullWidth
          value={props.tag.lat}
        />
        <TextField
          disabled
          variant="outlined"
          margin="dense"
          id="lng"
          label="Longitude"
          type="lng"
          fullWidth
          value={props.tag.lng}
        />
        <img src={"https://tagger-aa28.restdb.io/media/" + props.tag.img}></img>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)}
          color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
};