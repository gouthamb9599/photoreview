import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { Input } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import GroupTwoToneIcon from '@material-ui/icons/GroupTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';
import ImageTwoToneIcon from '@material-ui/icons/ImageTwoTone';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import swal from 'sweetalert';
import Dialog from '../components/dialog';
import '../styles/drawer.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function PermanentDrawerLeft(props) {
    const classes = useStyles();
    const [groupsarray, setGroupsarray] = React.useState([]);
    const [uploadarray, setUploadarray] = React.useState([]);
    const [usershared, setUsershared] = React.useState([]);
    const [shareddatau, setShareddatau] = React.useState(false);
    const [shareddatag, setShareddatag] = React.useState(false);
    const [groupshared, setGroupshared] = React.useState([]);
    const [users, setUsers] = React.useState(false);
    const [uploads, setUploads] = React.useState(false);
    const [openupload, setOpenupload] = React.useState(false);
    const [opencreateg, setOpencreateg] = React.useState(false);
    const [groups, setGroups] = React.useState(false);
    const [review, setreview] = React.useState('');
    const [review2, setreview2] = React.useState('');
    const viewusers = () => {
        setUsers(!users);
    }
    const submit = () => {
        const data = JSON.parse(localStorage.getItem('userData'));
        setreview('');
        swal('reply submitted successfully', 'check your other shared images', 'success');
        Axios.post(`http://localhost:5000/postreview`, { id: data.id, review: review })
    }

    const viewgroups = () => {
        const data = JSON.parse(localStorage.getItem('userData'));
        Axios.get(`http://localhost:5000/getgroups?userid=${data.id}`)
            .then(res => {

                if (res.data.success === true) {
                    setGroupsarray(res.data.data)
                }
            })
        setGroups(!groups);
    }
    const handlereview = (event) => {
        setreview(event.target.value);
        setreview2(event.target.value)
    }
    const shareonclick2 = () => {
        setShareddatag(!shareddatag)
    }
    const shareonclick1 = () => {
        setShareddatau(!shareddatau)
    }
    const viewuploads = () => {
        const data = JSON.parse(localStorage.getItem('userData'));
        Axios.get(`http://localhost:5000/getuploads?userid=${data.id}`)
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    setUploadarray(res.data.data);
                }
            })
        setUploads(!uploads);
    }
    // const handleClickuser = (id) => {
    //     Axios.get(`http://localhost:5000/getshareduserimages?id=${id}`)
    //         .then(res => {
    //             // console.log(res);
    //             if (res.data.success === true) {
    //                 setUsershared(res.data.data)
    //                 setShareddatau(true);
    //                 // console.log(res.data.data);
    //             }

    //         })
    // }
    // const handleClickgroup = (id) => {
    //     Axios.get(`http://localhost:5000/getsharedgroupimages?id=${id}`)
    //         .then(res => {
    //             // console.log(res);
    //             if (res.data.success === true) {
    //                 setGroupshared(res.data.data);
    //                 setShareddatag(true);
    //             }
    //         })}


    return (
        <div id="set">
            <div>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            The Photo Reviewer
          </Typography>
                        <Button style={{
                            float: "right",
                            position: "absolute",
                            right: "0",
                            color: "white"
                        }} className="logbutton" onClick={props.logout} variant="h6" noWrap>Logout</Button>
                    </Toolbar>
                </AppBar>
                <div className="draw">
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        <div className={classes.toolbar} />

                        <Divider />
                        <List>
                            <ListItem button onClick={e => viewusers()} key='Users'>
                                <AccountCircleTwoToneIcon />
                                <ListItemText primary='Users' />
                            </ListItem>
                            <ListItem button onClick={e => viewgroups()} key='Groups'>
                                <GroupTwoToneIcon />
                                <ListItemText primary='Groups' />
                            </ListItem>
                            <ListItem button onClick={e => viewuploads()} key='Uploads'>
                                <ImageTwoToneIcon />
                                <ListItemText primary='Uploads' />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button onClick={() => setOpenupload(!openupload)} key='Upload Photo'>
                                <AddPhotoAlternateTwoToneIcon />
                                <ListItemText primary='Upload Photo' />
                            </ListItem>
                            <ListItem button onClick={() => setOpencreateg(!opencreateg)} key='Create Group'>
                                <GroupAddTwoToneIcon />
                                <ListItemText primary='Create Group' />
                            </ListItem>
                        </List>
                        {openupload ? <Dialog upload={true} users={props.users} groups={groupsarray}></Dialog> : <></>}
                        {opencreateg ? <Dialog upload={false} users={props.users} groups={groupsarray}></Dialog> : <></>}
                    </Drawer>
                </div>
            </div>
            <div>
                {users ? <div className="displayset">
                    <h3>Users</h3>
                    <div >
                        {props.users.map((data) => (
                            <div>
                                <Button >{data.name}</Button>
                            </div>))}
                        <h3>Image shared by :praveen</h3>
                        <Button color="primary" onClick={shareonclick1}>show images</Button>
                    </div>
                </div> : <></>}
                {groups ? <div className="displayset">
                    <h3>Groups</h3>
                    <div>
                        {groupsarray.map((data) => (<div>
                            <Button >{data.name}</Button>
                        </div>))}
                        <Button >friends share</Button>
                        <h3>Image shared to :friends share</h3>
                        <Button color="primary" onClick={shareonclick2}>show images</Button>
                    </div>
                </div> : <></>}
                {uploads ? <div className="displayset">
                    {uploadarray.map(data =>
                        <div>
                            ID:{data.id}
                            <img src={live} alt="live" height="100" width="200" />
                        </div>
                    )}
                </div> : <></>}
                {shareddatau ? <div>
                    <div>{usershared.map(data => <div>
                        <img src={data.image} height="100" width="200" />)
                    {data.review ?
                            <div><Input type="text" value={review} onChange={handlereview} placeholder="Enter your reply"></Input>
                                <Button onClick={submit}>submit</Button></div> : <></>}
                    </div>
                                </div>}

                </div> : <></>}
                {shareddatag ?
                    <div>{groupshared.map(data => <div>
                        <img src={data.image} height="100" width="200" />)
                    {data.review ?
                            <div><Input type="text" value={review} onChange={handlereview} placeholder="Enter your reply"></Input>
                                <Button onClick={submit}>submit</Button></div> : <></>}
                    </div>
                                </div>}


            </div>

        </div>
    );
}
