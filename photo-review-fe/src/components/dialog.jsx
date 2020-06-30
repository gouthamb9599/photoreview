import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
    const [inse, setInse] = React.useState(0);
    const [groupname, setGroupname] = React.useState('')
    const [SelectedFile, setSelectedFile] = React.useState(null);
    const [shareuser, setShareuser] = React.useState(0);
    const [usertem, setUsertem] = React.useState('');
    const [Review, setReview] = React.useState('');
    const currentuser = JSON.parse(localStorage.getItem('userData'));
    const [userdata, setUserdata] = React.useState([currentuser.id]);
    const [desc, setDesc] = React.useState('');

    useEffect((props, upload, group) => {
        if (props.group === 1) {
            setUpload(true);
        }
        if (props.group === 2) {
            setGroup(true);
        }

        console.log(upload, group);
    })
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleImage = () => {
        const data = JSON.parse(localStorage.getItem('userData'));
        let formData = new FormData();
        // var datas = base64Img.base64Sync(SelectedFile);
        // formData.append("image64", datas)
        console.log(Review);
        formData.set("sharedid", shareuser);
        formData.set("owner", data.id);
        formData.set("review", Review);
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
    const handlegroupname = (event) => {
        setGroupname(event.target.value);
    }
    const handleUsers = (event) => {
        console.log(event.target.value)
        setUsertem(event.target.value);
        setInse(inse + 1);
        if (inse === 0) {
            setUserdata(userdata, usertem);
            console.log(userdata);

        }
        else if (inse > 0) {
            setUserdata(userdata => [...userdata, usertem]);

        }
    }
    const handlereview = (event) => {
        setReview(event.target.value)
        console.log(event.target.value);
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
    const creategroup = () => {
        console.log(userdata);
        Axios.post(`http://localhost:5000/creategroup`, { groupname: groupname, users: userdata })
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    swal('group is created successfully', 'check groups tab', 'success');
                }
            })
        setOpen(false);

    }
    return (
        <div>
            {upload ?
                <div>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Open Upload dialog
      </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">UPLOAD</DialogTitle>
                        <DialogContent>
                            <input
                                type="file"
                                class="input-upload"
                                name="myfile"
                                accept="image/*"
                            />
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
                            <label>Do you want a Review ?</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Review}
                                onChange={handlereview}
                            >
                                <MenuItem value='yes'>Yes</MenuItem>
                                <MenuItem value='no'>No</MenuItem>
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
                                onChange={handlegroupname}
                                type="text"
                                fullWidth
                            />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Choose members</FormLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={usertem}
                                    onChange={handleUsers}
                                >

                                    {props.users.map((data) => (
                                        <MenuItem value={data.id}>{data.name}</MenuItem>
                                    ))}
                                </Select>
                                {userdata.map((data) => (<span>{data}</span>))}
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
          </Button>
                            <Button onClick={creategroup} color="primary">
                                Create Group
          </Button>
                        </DialogActions>
                    </Dialog>
                </div> : <></>}
        </div>
    );
}
