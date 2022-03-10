import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import FriendCard from "./FriendCard"
import SearchCard from "./SearchCard"
const ariaLabel = { 'aria-label': 'description' };

const useStyles = makeStyles((theme) => ({
    friendContainer: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-evenly",
      marginTop: 25,
      alignItems: "flex-start"
    },
    module: {
        width: 450,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        marginLeft: 8,
        marginRight: 8
    },
    searchContainer: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        border: "solid",
        height: 50
    },
    results: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        border: "solid",
        minHeight: 50,
        borderWidth: 3,
    },
    actions: {
        height: 50,
        marginRight: 10,
        display: "flex",
        alignItems: "center",
    },
    searchBar: {
        minWidth: 220,
        marginLeft: 15
    }
  }))

function Friends({ user }) {
    const classes = useStyles();
    const [requests, setRequests] = useState([])
    const [friends, setFriends] = useState([])
    const [resetToggle, setResetToggle] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [queryPersist, setQueryPersist] = useState("")
    const [resultToggle, setResultToggle] = useState(false)

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
        const requestCards = (!!request ? requests : friends).map(friend => {
            return(
                <FriendCard 
                    friend={friend} 
                    request={request} 
                    resetToggle={resetToggle} 
                    setResetToggle={setResetToggle}
                />
            )
        })
        return(requestCards)
    }

    function renderResults() {
        const resultCards = searchResults.map(user => {
            return(
                <SearchCard
                    user={user}
                    resetToggle={resetToggle} 
                    setResetToggle={setResetToggle}
                />
            )
        })
        return(
            <>
            <h4>Search results for "{queryPersist}"</h4>
            {resultCards}
            </>
        )
    }

    function handleSearch(e) {
        e.preventDefault()
        setQueryPersist(searchQuery)
        const postObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query: searchQuery})
        }
        fetch("/userSearch", postObj)
        .then(resp => resp.json())
        .then(data => {
            setSearchResults(data)
            setResultToggle(true)
        })
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
                    <div className={classes.searchContainer}>
                        <Input 
                            inputProps={ariaLabel} 
                            placeholder="Search by email / username"
                            value={searchQuery}
                            className={classes.searchBar}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <div className={classes.actions}>
                            <Button 
                                variant="outlined" 
                                style={{color: "#083C5A", borderColor: "#083C5A", textTransform: "none"}} 
                                type="submit"
                                onClick={(e) => handleSearch(e)}
                            >Search</Button>
                        </div>
                    </div>
                    {!!resultToggle ? (!!searchResults.length ? renderResults() : <p>No results for "{queryPersist}"</p>) : null}
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