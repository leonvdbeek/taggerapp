import React from "react";
import {Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Typography, } from '@material-ui/core';

export default function TagDialog(open, setOpen, setName, name, setDesc, desc, cent, handleFileUpload, file, postTag) {

    return(

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
                    value={cent}
                />
                <TextField
                    disabled
                    variant="outlined"
                    margin="dense"
                    id="lng"
                    label="Longitude"
                    type="lng"
                    fullWidth
                    value={cent}
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
    )
};