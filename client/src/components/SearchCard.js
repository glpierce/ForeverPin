import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
    container: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      border: "solid",
      borderWidth: 1,
      borderColor: "#a9a9a9",
      alignItems: "center"
    },
    identifiers: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft: 15
    },
    element: {
        marginRight: 15
    },
    actions: {
        height: 50,
        marginRight: 10,
        display: "flex",
        alignItems: "center",
    }
  }))

function SearchCard({ user, resetToggle, setResetToggle}) {
    const classes = useStyles();
    const [requestSent, setRequestSent] = useState(false)

    function handleRequest() {
        const postObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({friend_id: user.id})
        }
        fetch("/friendships", postObj)
        .then(resp => {
            if(resp.ok) {setRequestSent(true)}
        })
    }

    return(
        <div className={classes.container}>
            <div className={classes.identifiers}>
                <h2 className={classes.element}>{user.user_name}</h2>
                <h6 className={classes.element}>({user.email})</h6>
            </div>
            <div className={classes.actions}>
                {!!requestSent ?
                    <h4>Request sent!</h4>
                    :
                    <Button
                        variant="outlined" 
                        style={{textTransform: "none", color: "#083C5A", borderColor: "#083C5A"}}
                        onClick={handleRequest}
                    >
                        Send Request
                    </Button>
                }
            </div>
        </div>
    )
}

export default SearchCard