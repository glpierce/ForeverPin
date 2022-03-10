import React, { useState } from "react"
import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    headerContainer: {
      height: 55,
      display: "flex",
      flexDirection: "row",
      width: "calc(100vw - 25px)"
    },
    titleContainer: {
      flexGrow: 1,
      flexBasis: "33%",
      display: "flex",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center"
    },
    menuContainer: {
        flexGrow: 1,
        flexBasis: "33%",
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "right",
        alignItems: "center"
    },
    placeholder: {
      flexGrow: 1,
      flexBasis: "33%",
      display: "flex",
      flexWrap: "nowrap",
    }
  }))

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
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

function Header({ user, setUser }) {
    const classes = useStyles()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function pageChange(e, route) {
        handleClose()
        history.push(route)
    }

    function logOut() {
        handleClose()
        fetch("/logout", {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          }
        })
        .then((r) => {
          if (r.ok) {
            setUser({})
            history.push("/")
          }
        })
    }

    function renderAccountMenu() {
        return(
            <>
                <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    style={{textTransform: 'none', backgroundColor: "#083C5A"}}
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    {user.user_name}
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={(e) => pageChange(e, "/")} disableRipple>
                        Home
                    </MenuItem>
                    <MenuItem onClick={(e) => pageChange(e, "/my_account")} disableRipple>
                        My Account
                    </MenuItem>
                    <MenuItem onClick={(e) => pageChange(e, "/friends")} disableRipple>
                        Friends
                    </MenuItem>
                    <MenuItem onClick={(e) => logOut()} disableRipple>
                        Log out
                    </MenuItem>
                </StyledMenu>
            </>
        )
    }

    return(
        <div className={classes.headerContainer}>
          <div className={classes.placeholder}>
          </div>
          <div className={classes.titleContainer}>
              <h1 style={{margin: 0}}>ForeverPin</h1>
          </div>
          <div className={classes.menuContainer}>
              {!!Object.keys(user).length ? renderAccountMenu() : <></>}
          </div>
        </div>
    )
}

export default Header