import { cardClasses } from "@mui/material"
import React, { useState, useRef } from "react"
import ReactMapGL, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl"
import PinMarker from "../assets/PinMarker.png"
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'moment'
import { FormControl, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import DatePicker from '@mui/lab/DatePicker';


const useStyles = makeStyles((theme) => ({
    popupContainer: {
        display: "flex",
        flexDirection: "column",
        minWidth: 220
    },
    popupHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    details: {
        margin: 0,
    },
    mapHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pinFunctionality: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 8
    }
}))

function PinMap({ user, pins, getMyPins, pinsEditable, selectedPin, setSelectedPin, titleDisplay }) {
    const classes = useStyles();
    const [editPin, setEditPin] = useState(false)
    const [editedPin, setEditedPin] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [createdPin, setCreatedPin] = useState({})
    const [viewState, setViewState] = useState({
        latitude: 1.0,
        longitude: 1.0,
        zoom: 1.45,
    })

    function round(num, places) {
        const factorOfTen = Math.pow(10, places);
        return Math.round(num * factorOfTen)/factorOfTen;
    }

    function handleCreatePin(e) {
        e.preventDefault()
        const postObj = {
            method: "POST",
            headers: {
                "COntent-Type": "application/json"
            },
            body: JSON.stringify({...createdPin})
        }
        fetch("/pins", postObj)
        .then(resp => {
            if (resp.ok) {
                setCreatedPin({})
                getMyPins()
            }
        })
    }

    function handleSavePin(e) {
        e.preventDefault()
        const patchObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...editedPin})
        }
        fetch(`/pins/${editedPin.id}`, patchObj)
        .then(resp => {
            if (resp.ok) {
                setEditPin(false)
                setSelectedPin(null)
                getMyPins()
            }
        })
    }

    function addPin(friendPin) {
        const postObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...selectedPin, user_id: user.id})
        }
        fetch("/pins", postObj)
        .then(resp => {
            if (resp.ok) {
                if (!!friendPin) {
                    setSelectedPin(null)
                } else {
                    setSelectedPin(null)
                    getMyPins()
                }
            }
        })
    }

    function searchLocation() {
        fetch(`http://dev.virtualearth.net/REST/v1/Locations?query=${searchQuery}&maxResults=1&key=${process.env.REACT_APP_BING_TOKEN}`)
        .then(resp => resp.json())
        .then(data => {
            setSelectedPin(null)
            const cleanData = data.resourceSets[0].resources[0]
            setCreatedPin({latitude: cleanData.point.coordinates[0], longitude: cleanData.point.coordinates[1], title: "", description: "", address: cleanData.address.formattedAddress, visit_date: new Date()})
            setViewState({latitude: cleanData.point.coordinates[0], longitude: cleanData.point.coordinates[1], zoom: 14})
            setSearchQuery("")
        })
    }

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            getAddressFromCoords({latitude: position.coords.latitude, longitude: position.coords.longitude})
        }, (error) => {
            alert(`${error.message}. No pin for you!`)
        })
    }

    function getAddressFromCoords(coords) {
        fetch(`http://dev.virtualearth.net/REST/v1/locationrecog/${coords.latitude},${coords.longitude}?key=${process.env.REACT_APP_BING_TOKEN}&includeEntityTypes=address&output=json`)
        .then(resp => resp.json())
        .then(data => {
            const cleanData = data.resourceSets[0].resources[0]
            setViewState({latitude: coords.latitude, longitude: coords.longitude, zoom: 14})
            setCreatedPin({latitude: coords.latitude, longitude: coords.longitude, title: "", description: "", address: (!!cleanData.addressOfLocation.length ? cleanData.addressOfLocation[0].formattedAddress : ""), visit_date: new Date()})
        })
    }

    function renderPinFunctionality() {
        return(
            <div className={classes.pinFunctionality}>
                <TextField
                    size="small"
                    style={{width: 400}}
                    id="search"
                    label="Seach by address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outlined" style={{height: 40}} onClick={e => (!!searchQuery.length ? searchLocation() : null)}>Search</Button>
                <Button variant="outlined" style={{height: 40}} onClick={e => getCurrentLocation()}>Current Location</Button>
                <Button variant="outlined" style={{height: 40}}>New Pin</Button>
            </div>
        )
    }

    function renderPins() {
        const pinMarkers = pins.map(pin => {
            return(
                <Marker
                    key={pin.id}
                    latitude={parseFloat(pin.latitude)}
                    longitude={parseFloat(pin.longitude)}
                >
                    <button className="marker-btn" onClick={e => setSelectedPin(pin)}>
                        <img src={PinMarker} alt="Pin Icon"/>
                    </button>
                </Marker>
            )
        })
        return(pinMarkers)
    }

    function renderPopup() {
        return(
            <Popup latitude={parseFloat(selectedPin.latitude)} longitude={parseFloat(selectedPin.longitude)} closeButton={false} closeOnClick={false}>
                {renderPopupContents()}
            </Popup>
        )
    }

    function renderPopupContents() {
        if (!!editPin) {
            return(renderPinEditForm())
        } else {
            return(
                <div className={classes.popupContainer}>
                    <div className={classes.popupHeader}>
                        <button onClick={e => setSelectedPin(null)} style={{height: '20px'}}>X</button>
                        <p className={classes.details}>({round(selectedPin.latitude, 3)}, {round(selectedPin.longitude, 5)})</p>
                    </div>
                    <h2 style={{marginBottom: 0}}>{selectedPin.title}</h2>
                    <div>
                        <p style={{marginBottom: 10, marginTop: 0}}>{Moment(selectedPin.visit_date).format('MM/DD/YYYY')}</p>
                        <p className={classes.details}>{selectedPin.address}</p>
                    </div>
                    <br/>
                    <p className={classes.details}>{selectedPin.description}</p>
                    <br/>
                    <button onClick={e => {
                            if (!!pinsEditable) {
                                setEditPin(true)
                                setEditedPin({...selectedPin})
                            } else {
                                addPin(true)
                            }
                        }}
                    >{!!pinsEditable ? "Edit pin" : "Add to my pins"}</button>
                </div>
            )
        }
    }

    function renderPinEditForm() {
        return(
            <div className={classes.popupContainer}>
                <div className={classes.popupHeader}>
                    <button style={{height: '20px', width: '25px'}} onClick={e => {
                        setSelectedPin(null)
                        setEditPin(false)
                        }}
                    >X</button>
                    <p className={classes.details}>({round(editedPin.latitude, 3)}, {round(editedPin.longitude, 3)})</p>
                </div>
                <Box
                    component="form"
                    sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <FormControl>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            id="title"
                            label="Title"
                            value={editedPin.title}
                            onChange={(e) => setEditedPin({...editedPin, title: e.target.value})}
                        />
                        <TextField
                            required
                            multiline
                            minRows={2}
                            fullWidth
                            size="small"
                            id="description"
                            label="Description"
                            value={editedPin.description}
                            onChange={(e) => setEditedPin({...editedPin, description: e.target.value})}
                        />
                        <TextField
                            required
                            fullWidth
                            size="small"
                            id="address"
                            label="Address"
                            value={editedPin.address}
                            onChange={(e) => setEditedPin({...editedPin, address: e.target.value})}
                        />
                        <DatePicker
                            required
                            size="small"
                            label="Visit Date"
                            maxDate={new Date()}
                            value={editedPin.visit_date}
                            onChange={e => setEditedPin({...editedPin, visit_date: e})}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Button variant="outlined" onClick={e => handleSavePin(e)}>Save</Button>
                    </FormControl>
                </Box>
            </div>
        )
    }

    function renderCreatedPinForm() {
        return(
            <Popup latitude={createdPin.latitude} longitude={createdPin.longitude} closeButton={false} closeOnClick={false}>
                <div className={classes.popupContainer}>
                    <div className={classes.popupHeader}>
                        <button onClick={e => setCreatedPin({})} style={{height: '20px'}}>X</button>
                        <p className={classes.details}>({round(createdPin.latitude, 3)}, {round(createdPin.longitude, 3)})</p>
                    </div>
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                    >
                        <FormControl>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                id="title"
                                label="Title"
                                value={createdPin.title}
                                onChange={(e) => setCreatedPin({...createdPin, title: e.target.value})}
                            />
                            <TextField
                                required
                                multiline
                                minRows={2}
                                fullWidth
                                size="small"
                                id="description"
                                label="Description"
                                value={createdPin.description}
                                onChange={(e) => setCreatedPin({...createdPin, description: e.target.value})}
                            />
                            <TextField
                                required
                                fullWidth
                                size="small"
                                id="address"
                                label="Address"
                                value={createdPin.address}
                                onChange={(e) => setCreatedPin({...createdPin, address: e.target.value})}
                            />
                            <DatePicker
                                required
                                size="small"
                                label="Visit Date"
                                maxDate={new Date()}
                                value={new Date()}
                                onChange={e => setCreatedPin({...createdPin, visit_date: e})}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <Button variant="outlined" onClick={e => handleCreatePin(e)}>Save</Button>
                        </FormControl>
                    </Box>
                </div>
            </Popup>
        )
    }

    function renderSearchResult() {
        return(
            <>
                <Marker
                    key={"search result"}
                    latitude={createdPin.latitude}
                    longitude={createdPin.longitude}
                    closeButton={false} closeOnClick={false}
                >
                    <img src={PinMarker} alt="Pin Icon"/>
                </Marker>
                {renderCreatedPinForm()}
            </>
        )
    }

    return(
        <>
            <div className={classes.mapHeader}>
                <h2 style={{marginLeft: 10, marginBottom: 8}}>{titleDisplay}</h2>
                {!!pinsEditable ? renderPinFunctionality() : null}
            </div>
            <ReactMapGL {...viewState} onMove={evt => setViewState(evt.viewState)} mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} style={{width: "83vw", height: "88vh"}} mapStyle="mapbox://styles/glpierce174/cl0h3s1v8004t15m6qw98t5oj">
                {!!pins.length ? renderPins() : null}
                {!!Object.keys(createdPin).length ? renderSearchResult() : null}
                {!!selectedPin ? renderPopup() : null}
                <GeolocateControl position={"bottom-right"}/>
                <NavigationControl position={"bottom-right"}/>
            </ReactMapGL>
        </>
    )
}

export default PinMap