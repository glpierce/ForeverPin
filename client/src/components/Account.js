import React, { useState } from "react";
import { FormControl, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    accountDiv: {
        display: "flex",
        justifyContent: "center"
    },
    userContainer: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        maxWidth: 275,
        minWidth: 275
    },
    fieldContainer: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "left",
        marginTop: 10,
        alignItems: "center",
        maxHeight: 22
    },
    fieldTitle: {
        marginLeft: 10
    },
    fieldValue: {
        marginLeft: 15
    }
}))

function Account({ user, setUser }) {
    const classes = useStyles();
    const [editToggle, setEditToggle] = useState(false)
    const [userData, setUserData] = useState({...user})
    const [usernameInUse, setUsernameInUse] = useState(false)
    const [emailInUse, setEmailInUse] = useState(false)

    function checkEmailAndUsername() {
        const postObj = {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({email: userData.email, username: userData.user_name})
        }
        fetch("/updateCheck", postObj)
        .then(resp => {
            if (resp.ok) {
                setEmailInUse(false)
                setUsernameInUse(false)
                handleSave()
            } else {
                return(resp.json())
                //resetPasswordFields()
            }
        })
        .then(errors => {
            if (!!errors) {
                if (errors.includes("email already exists")) {
                    setEmailInUse(true)
                } else {
                    setEmailInUse(false)
                }
                if (errors.includes("username already exists")) {
                    setUsernameInUse(true)
                } else {
                    setUsernameInUse(false)
                }
            }
        })
    }

    function handleSave() {
        const patchObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...userData})
        }
        fetch(`/users/${userData.id}`, patchObj)
        .then(resp => {
            if (resp.ok) {
                return(resp.json())
            } //error handling
        })
        .then(data => {
            setUser(data)
            setEditToggle(false)
        })
    }

    function renderUser() {
        return(
            <div className={classes.userContainer}>
                <div className={classes.fieldContainer}>
                    <h4 className={classes.fieldTitle}>Username:</h4>
                    <p className={classes.fieldValue}>{userData.user_name}</p>
                </div>
                <div className={classes.fieldContainer}>
                    <h4 className={classes.fieldTitle}>Email:</h4>
                    <p className={classes.fieldValue}>{userData.email}</p>
                </div>
                <div className={classes.fieldContainer}>
                    <h4 className={classes.fieldTitle}>First Name:</h4>
                    <p className={classes.fieldValue}>{userData.first_name}</p>
                </div>
                <div className={classes.fieldContainer}>
                    <h4 className={classes.fieldTitle}>Last Name:</h4>
                    <p className={classes.fieldValue}>{userData.last_name}</p>
                </div>
                <br></br>
                <Button variant="outlined" style={{color: "#083C5A", borderColor: "#083C5A", textTransform: 'none'}} onClick={e => setEditToggle(true)}>Edit Info</Button>
            </div>
        )
    }

    function renderForm() {
        return(
            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}>
                <FormControl>
                    <TextField
                        required
                        id="user-username"
                        label="Username"
                        value={userData.user_name}
                        onChange={(e) => setUserData({...userData, user_name: e.target.value})}
                    />
                    {usernameInUse ? <p>This username is already taken</p> : <></>}
                    <TextField
                        required
                        id="user-email"
                        label="E-mail"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                    />
                    {emailInUse ? <p>There is already an account associated with this email</p> : <></>}
                    <TextField
                        required
                        id="first-name"
                        label="First Name"
                        value={userData.first_name}
                        onChange={(e) => setUserData({...userData, first_name: e.target.value})}
                    />
                    <TextField
                        required
                        id="last-name"
                        label="Last Name"
                        value={userData.last_name}
                        onChange={(e) => setUserData({...userData, last_name: e.target.value})}
                    />
                    <br />
                    <Button variant="outlined" color="success" style={{textTransform: "none"}} onClick={checkEmailAndUsername}>Save</Button>
                </FormControl>
            </Box>
        )
    }

    return(
        <div>
            <h2>My Account</h2>
            <div className={classes.accountDiv}>
                {!!editToggle ? renderForm() : renderUser()}
            </div>
        </div>
    )
}

export default Account