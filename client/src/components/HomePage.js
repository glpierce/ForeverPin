import React, {useEffect, useState} from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import { styled, alpha } from '@mui/material/styles';
import PinMap from "./PinMap"
import EditGroup from "./EditGroup";

const useStyles = makeStyles((theme) => ({
    homeContainer: {
        display: "flex",
        flexDirection: "row"
    },
    navContainer: {
        display: "flex",
        justifyContent: "center",
        width: 200,
        height: "calc(100vh - 69px)",
    },
    toolBar: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "calc(100vh - 69px)",
    },
    navElement: {
        width: 200
    },
    spacer: {
        height: "20vh"
    },
    mapContainer: {
        marginLeft: 10,
        height: "calc(100vh - 55px)",
    },
    newGroupButton: {
        textDecoration: "underline"
    }
}))

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 380,
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 0,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: "#000",
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

function HomePage({ user }) {
    const classes = useStyles();
    const [homePageReset, setHomePageReset] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [pins, setPins] = useState(null)
    const [groups, setGroups] = useState(null)
    const [mapToggle, setMapToggle] = useState(true)
    const [createGroupToggle, setCreateGroupToggle] = useState(false)
    const [editedGroup, setEditedGroup] = useState({})
    const [friends, setFriends] = useState(null)
    const [titleDisplay, setTitleDisplay] = useState("My Pins")
    const [pinsEditable, setPinsEditable] = useState(true)
    const [selectedPin, setSelectedPin] = useState(null)
    const [selectedGroup, setSelectedGroup] = useState({})

    useEffect(() => {
        console.log(process.env)
        getMyPins()
        getGroups()
        getFriends()
    },[homePageReset])

    function getMyPins() {
        setSelectedGroup({})
        setMapToggle(true)
        fetch(`/my_pins`)
        .then(r => r.json())
        .then(data => {
            setPins(data)
            setTitleDisplay(`My Pins`)
            setPinsEditable(true)
            setSelectedPin(null)
            setMapToggle(true)
        })
    }

    function getGroups() {
        fetch(`/my_groups`)
        .then(r => r.json())
        .then(data => {
            setGroups(data)
        })
    }

    function getFriends() {
        fetch(`/friends`)
        .then(r => r.json())
        .then(data => {
            setFriends(data)
        })
    }

    function getGroupPins(group_id) {
        setAnchorEl(null)
        setMapToggle(true)
        setEditedGroup({})
        fetch(`/my_pins`)
        .then(r => r.json())
        .then(data => {
            setPins(data.filter(pin => pin.pin_group_id === group_id))
            setSelectedGroup(groups.find(group => group.id === group_id))
            setTitleDisplay(groups.find(group => group.id === group_id).title)
            setPinsEditable(true)
            setSelectedPin(null)
        })
    }

    function getFriendPins(e, friend) {
        setMapToggle(true)
        setAnchorEl(null)
        fetch(`/pins/${friend.id}`)
        .then(r => r.json())
        .then(data => {
            setPins(data)
            setTitleDisplay(`${friend.user_name}'s Pins`)
            setPinsEditable(false)
            setSelectedPin(null)
        })
    }

    function createGroup() {
        setAnchorEl(null)
        setMapToggle(false)
        setCreateGroupToggle(true)
        setEditedGroup({user_id: user.id, title: "", description: "", marker_color: 0})
    }

    function editGroup() {
        setMapToggle(false)
        setCreateGroupToggle(false)
        setEditedGroup({...selectedGroup})
    }

    function renderMenuItems() {
        if (anchorEl.id === "groups") {
            return(
                <>
                    <MenuItem className={classes.newGroupButton} onClick={e => createGroup()} disableRipple>Create New Group</MenuItem>
                    {!!groups.length ? groups.map(group => <MenuItem key={group.id} onClick={e => getGroupPins(group.id)} disableRipple>{group.title}</MenuItem>) : <MenuItem disableRipple>No groups yet...</MenuItem>}
                </>
            )
        }
        if (anchorEl.id === "friends") {
            return(!!friends.length ? friends.map(friend => <MenuItem key={friend.id} onClick={e => getFriendPins(e, friend)} disableRipple>{friend.user_name}</MenuItem>) : <MenuItem disableRipple>No friends yet...</MenuItem>)
        }
    }
    
    return(
        <>
            {((pins !== null && friends !== null) && groups !== null) ? 
                <div className={classes.homeContainer}>
                    <div className={classes.navContainer}>
                        <AppBar position="static" style={{backgroundColor: "#083C5A"}}>
                            <Toolbar variant="regular" className={classes.toolBar}>
                                <div className={classes.spacer}></div>
                                <Button variant="h6" color="inherit" className={classes.navElement} onClick={e => {
                                    setSelectedGroup({})
                                    getMyPins()
                                }}>
                                    My Pins
                                </Button>
                                <Button id="groups" variant={(!!anchorEl && anchorEl.id === "groups") ? "outlined" : "h6"} color="inherit" className={classes.navElement} endIcon={<KeyboardArrowRightIcon />} onClick={e => setAnchorEl(e.currentTarget)}>
                                    Pin Groups
                                </Button>
                                <Button id="friends" variant={(!!anchorEl && anchorEl.id === "friends") ? "outlined" : "h6"} color="inherit" className={classes.navElement} endIcon={<KeyboardArrowRightIcon />} onClick={e => setAnchorEl(e.currentTarget)}>
                                    Friends' Pins
                                </Button>
                                <StyledMenu
                                    id="demo-customized-menu"
                                    MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={e => setAnchorEl(null)}
                                >
                                    {!!anchorEl ? renderMenuItems() : null}
                                </StyledMenu>
                                <div className={classes.spacer}></div>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div className={classes.mapContainer}>
                        {!!mapToggle && !!pins ? <PinMap user={user} pins={pins} groups={groups} getMyPins={getMyPins} pinsEditable={pinsEditable} selectedPin={selectedPin} setSelectedPin={setSelectedPin} titleDisplay={titleDisplay} editGroup={editGroup} selectedGroup={selectedGroup}/> : null}
                        {!mapToggle && !!Object.keys(editedGroup).length ? <EditGroup setPins={setPins} createGroupToggle={createGroupToggle} editedGroup={editedGroup} setEditedGroup={setEditedGroup} homePageReset={homePageReset} setHomePageReset={setHomePageReset} setSelectedGroup={setSelectedGroup} /> : null}
                    </div>
                </div>
            : <h1>Loading...</h1>}
        </>
    )
}

export default HomePage