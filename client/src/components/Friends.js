import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import FriendCard from "./FriendCard"

const useStyles = makeStyles((theme) => ({
    friendContainer: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-evenly",
      marginTop: 25
    },
    module: {
        width: 450,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        marginLeft: 8,
        marginRight: 8
    },
    results: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        border: "solid",
        minHeight: 50
    }
  }))

function Friends({ user }) {
    const classes = useStyles();
    const [requests, setRequests] = useState([])
    const [friends, setFriends] = useState([])
    const [resetToggle, setResetToggle] = useState(true)

    useEffect(() => {
        getRequests()
        getFriends()
    },[resetToggle])

    function getRequests() {
        fetch(`/requests`)
        .then(r => r.json())
        .then(data => setRequests(data))
    }

    function getFriends() {
        fetch(`/friends`)
        .then(r => r.json())
        .then(data => setFriends(data))
    }

    function renderCards(request) {
        const requestCards = (!!request ? requests : friends).map(friend => <FriendCard 
                                                                                friend={friend} 
                                                                                request={request} 
                                                                                resetToggle={resetToggle} 
                                                                                setResetToggle={setResetToggle}/>)
        return(requestCards)
    }

    return(
        <div className={classes.friendContainer}>
            <div className={classes.module}>
                <h3>Friend Requests</h3>
                <div className={classes.results}>
                    {!!requests.length ? renderCards(true) : <p>No pending friend requests...</p>}
                </div>
            </div>
            <div className={classes.module}>
                <h3>Find Friends</h3>
                <div className={classes.results}>
                    
                </div>
            </div>
            <div className={classes.module}>
                <h3>My Friends</h3>
                <div className={classes.results}>
                    {!!friends.length ? renderCards(false) : <p>No friends yet...</p>}
                </div>
            </div>
        </div>
    )
}

export default Friends