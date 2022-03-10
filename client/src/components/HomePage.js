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
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [pins, setPins] = useState(null)
    const [groups, setGroups] = useState(null)
    const [routes, setRoutes] = useState(null)
    const [friends, setFriends] = useState(null)
    const [titleDisplay, setTitleDisplay] = useState("My Pins")
    const [pinsEditable, setPinsEditable] = useState(true)
    const [selectedPin, setSelectedPin] = useState(null)

    useEffect(() => {
        getMyPins()
        // getGroups()
        // getRoutes()
        getFriends()
    },[])

    function getMyPins() {
        fetch(`/my_pins`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setPins(data)
            setTitleDisplay(`My Pins`)
            setPinsEditable(true)
            setSelectedPin(null)
        })
    }

    function getGroups() {
        fetch(`/my_groups`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setGroups(data)
        })
    }

    function getRoutes() {
        fetch(`/my_routes`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setRoutes(data)
        })
    }

    function getFriends() {
        fetch(`/friends`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setFriends(data)
        })
    }

    function viewMyPins() {
        getMyPins()
    }

    function getGroupPins() {

    }

    function getRoute() {

    }

    function getFriendPins(e, friend) {
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

    function renderMenuItems() {
        if (anchorEl.id === "groups") {
            return(!!groups ? groups.map(group => <MenuItem onClick={e => getGroupPins()} disableRipple>{group.title}</MenuItem>) : <MenuItem disableRipple>No groups yet...</MenuItem>)
        }
        if (anchorEl.id === "routes") {
            return(!!routes ? routes.map(route => <MenuItem onClick={e => getRoute()} disableRipple>{route.title}</MenuItem>) : <MenuItem disableRipple>No routes yet...</MenuItem>)
        }
        if (anchorEl.id === "friends") {
            return(!!friends.length ? friends.map(friend => <MenuItem onClick={e => getFriendPins(e, friend)} disableRipple>{friend.user_name}</MenuItem>) : <MenuItem disableRipple>No friends yet...</MenuItem>)
        }
    }
    
    return(
        <>
            {(pins !== null && friends !== null) ? 
                <div className={classes.homeContainer}>
                    <div className={classes.navContainer}>
                        <AppBar position="static" style={{backgroundColor: "#083C5A"}}>
                            <Toolbar variant="regular" className={classes.toolBar}>
                                <div className={classes.spacer}></div>
                                <Button variant="h6" color="inherit" className={classes.navElement} onClick={viewMyPins}>
                                    My Pins
                                </Button>
                                <Button id="groups" variant={(!!anchorEl && anchorEl.id === "groups") ? "outlined" : "h6"} color="inherit" className={classes.navElement} endIcon={<KeyboardArrowRightIcon />} onClick={e => setAnchorEl(e.currentTarget)}>
                                    Pin Groups
                                </Button>
                                <Button id="routes" variant={(!!anchorEl && anchorEl.id === "routes") ? "outlined" : "h6"} color="inherit" className={classes.navElement} endIcon={<KeyboardArrowRightIcon />} onClick={e => setAnchorEl(e.currentTarget)}>
                                    Routes
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
                        <PinMap user={user} pins={pins} getMyPins={getMyPins} pinsEditable={pinsEditable} selectedPin={selectedPin} setSelectedPin={setSelectedPin} titleDisplay={titleDisplay}/>
                    </div>
                </div>
            : <h1>Loading...</h1>}
        </>
    )
}

export default HomePage