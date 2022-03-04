import React, {useEffect, useState} from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import { styled, alpha } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
    homeContainer: {
        display: "flex",
        flexDirection: "row"
    },
    navContainer: {
        display: "flex",
        justifyContent: "center",
        width: 225
    },
    toolBar: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "92vh",
    },
    navElement: {
        width: 225
    },
    spacer: {
        height: "20vh"
    }
}))

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 410,
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
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
    const [groups, setGroups] = useState([])
    const [routes, setRoutes] = useState([])
    const [friends, setFriends] = useState([])

    useEffect(() => {
        getMyPins()
        getGroups()
        getRoutes()
        getFriends()
    },[])

    function getMyPins() {

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

    }

    function getGroupPins() {

    }

    function getRoute() {

    }

    function getFriendPins() {

    }

    function renderMenuItems() {
        if (anchorEl.id === "groups") {
            return(!!groups.length ? groups.map(group => <MenuItem onClick={e => getGroupPins()} disableRipple>{group.title}</MenuItem>) : <MenuItem disableRipple>No groups yet...</MenuItem>)
        }
        if (anchorEl.id === "routes") {
            return(!!routes.length ? routes.map(route => <MenuItem onClick={e => getRoute()} disableRipple>{route.title}</MenuItem>) : <MenuItem disableRipple>No routes yet...</MenuItem>)
        }
        if (anchorEl.id === "friends") {
            return(!!friends.length ? friends.map(friend => <MenuItem onClick={e => getFriendPins()} disableRipple>{friend.user_name}</MenuItem>) : <MenuItem disableRipple>No friends yet...</MenuItem>)
        }
    }
    
    return(
        <div className={classes.homeContainer}>
            <div className={classes.navContainer}>
                <AppBar position="static">
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
            <div>

            </div>
        </div>
    )
}

export default HomePage