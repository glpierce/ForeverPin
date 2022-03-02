import React from "react"
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
    },
    reject: {
        marginLeft: 5
    }
  }))

function FriendCard({ friend, request, resetToggle, setResetToggle }) {
    const classes = useStyles();

    function handleAction(e, acceptFriend) {
        if (!!acceptFriend) {
            addFriend()
        } else {
            removeFriend()
        }
    }

    function addFriend() {
        const postObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({confirmed: true})
        }
        fetch(`/friendships/${friend.id}`, postObj)
        .then(r => r.ok ? setResetToggle(!resetToggle) : null)
    }

    function removeFriend() {
        const deleteObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(`/friendships/${friend.id}`, deleteObj)
        .then(r => r.ok ? setResetToggle(!resetToggle) : null)
    }

    return(
        <div className={classes.container}>
            <div className={classes.identifiers}>
                <h2 className={classes.element}>{friend.user_name}</h2>
                <h6 className={classes.element}>({friend.email})</h6>
            </div>
            <div className={classes.actions}>
                <Button
                    variant="outlined" 
                    color={!!request ? "success" : "error"}
                    onClick={e => handleAction(e, !!request)}
                >
                    {!!request ? "Accept" : "Unfriend"}
                </Button>
                {!!request ? <div className={classes.reject}><Button variant="outlined" color="error" onClick={e => handleAction(e, false)}>Reject</Button></div> : <></>}
            </div>
        </div>
    )
}

export default FriendCard