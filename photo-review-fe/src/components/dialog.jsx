import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
// import fileUpload from 'fuctbase64';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function FormDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [upload, setUpload] = React.useState(false);
    const [group, setGroup] = React.useState(false);
    const [SelectedFile, setSelectedFile] = React.useState(null);
    const [imagePreviewUrl, setimagePreviewUrl] = React.useState(null);
    const [shareuser, setShareuser] = React.useState(0);
    // const [state,setState] =React.useState({props.})
    const [userdata, setUserdata] = React.useState([]);
    const [desc, setDesc] = React.useState('');

    useEffect(() => {
        if (props.group === 1) {
            setUpload(true);
        }
        if (props.group === 2) {
            setGroup(true);
            // Axios.get(`http://localhost:5000/getusers`)
            //     .then(res => {
            //         console.log(res.data);
            //         setUserdata(res.data.data);
            //     })
        }

        console.log(upload, group);
    })
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleImage = () => {
        const data = JSON.parse(sessionStorage.getItem('userData'));
        let formData = new FormData();
        formData.set("sharedid", shareuser);
        formData.set("owner", data.id);
        formData.set("description", desc);
        formData.append("image", SelectedFile);
        console.log(formData);
        console.log(data, data.name, data.email, data.id);
        Axios.post('http://localhost:5000/imageupload', formData)
            .then(res => {
                if (res.data.success === true) {
                    setOpen(false);
                    swal('image uploaded and shared successfully', 'check your shared images and review it', 'success');

                }
            })
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setShareuser(event.target.value)
    };
    const changedesc = (event) => {
        setDesc(event.target.value)
    }
    const fileChangedHandler = event => {
        console.log('hello')
        setSelectedFile(event.target.files[0])
        let reader = new FileReader();
        console.log(event.target.files[0], SelectedFile)
        reader.onloadend = () => {
            setimagePreviewUrl(reader.result)
        }
        reader.readAsDataURL(event.target.files[0])

    }
    return (
        <div>
            {upload ?
                <div>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Open Upload dialog
      </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <input
                                type="file"
                                class="input-upload"
                                name="myfile"
                                accept="image/*"
                                onChange={fileChangedHandler} />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="description"
                                label="Description"
                                type="text"
                                onChange={changedesc}
                                fullWidth
                            />
                            <label>Select user/Group to share</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={shareuser}
                                onChange={handleChange}>
                                {props.users.map(data => (<MenuItem value={data.id}>{data.name}</MenuItem>))}
                                {props.groups.map(data => (<MenuItem value={data.id}>{data.name}</MenuItem>))}

                            </Select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
          </Button>
                            <Button onClick={handleImage} color="primary">
                                Upload Image
          </Button>
                        </DialogActions>
                    </Dialog>
                </div> : <></>}
            {group ?
                <div>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Open Create Group
      </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="group name"
                                type="text"
                                fullWidth
                            />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Choose members</FormLabel>
                                <FormGroup>
                                    {props.users.map((data) => (
                                        <FormControlLabel
                                            control={<Checkbox checked={data.name} onChange={handleChange} name="gilad" />}
                                            label={data.name}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
          </Button>
                            <Button onClick={handleClose} color="primary">
                                Create Group
          </Button>
                        </DialogActions>
                    </Dialog>
                </div> : <></>}
        </div>
    );
}
