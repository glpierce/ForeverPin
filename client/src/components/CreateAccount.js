import React, { useState } from 'react'
import { FormControl, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';

function CreateAccount({ setUser }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [emailInUse, setEmailInUse] = useState(false)
    const [usernameInUse, setUsernameInUse] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        checkEmailAndUsername()
    }

    function checkEmailAndUsername() {
        const payload = {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, username: username})
        }
        fetch("/accountCheck", payload)
        .then((r) => {
            if (r.ok) {
                setEmailInUse(false)
                setUsernameInUse(false)
                createAccount()
            } else {
                if (r.json().error === "email already exists") {
                setEmailInUse(true)
                }
                if (r.json().error === "username already exists") {
                    setUsernameInUse(true)
                }
            resetPasswordFields()
            }
        })
    }

    function createAccount() {
        if (password === passwordConfirmation) {
          const payload = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              email: email,
              user_name: username,
              password: password,
            }),
          }
          fetch("/users", payload)
          .then((r) => {
            if (r.ok) {
                r.json().then((userResp) => setUser(userResp));
            } else {
                r.json().then((err) => console.log(err.errors)); //finish error handling
            }
          });
        } else {
          resetPasswordFields()
          setPasswordMatch(false)
        }
    }

    function resetPasswordFields() {
        setPassword("")
        setPasswordConfirmation("")
    }


    return (
        <div>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
          >
            <FormControl>
              <TextField
                required
                id="first-name"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                required
                id="last-name"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                required
                id="user-email"
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailInUse ? <p>There is already an account associated with this email</p> : <></>}
              <TextField
                required
                id="user-username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameInUse ? <p>This username is already taken</p> : <></>}
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                required
                id="confirm"
                label="Confirm Password"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              {passwordMatch ? <></> : <p>Passwords must match</p>}
              <br />
              <Button variant="outlined" onClick={handleSubmit}>Sign Up!</Button>
            </FormControl>
          </Box>
        </div>
      )
}

export default CreateAccount