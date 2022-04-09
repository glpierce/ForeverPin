import React, { useState } from "react"
import { FormControl, TextField, Button, Select, MenuItem, stepIconClasses } from '@mui/material';
import PinMarkerRed from "../assets/PinMarkerRed.png"
import PinMarkerBlack from "../assets/PinMarkerBlack.png"
import PinMarkerBlue from "../assets/PinMarkerBlue.png"
import PinMarkerGreen from "../assets/PinMarkerGreen.png"
import PinMarkerOrange from "../assets/PinMarkerOrange.png"
import PinMarkerPurple from "../assets/PinMarkerPurple.png"
import PinMarkerWhite from "../assets/PinMarkerWhite.png"
import PinMarkerYellow from "../assets/PinMarkerYellow.png"

function EditGroup({ setPins, createGroupToggle, editedGroup, setEditedGroup, homePageReset, setHomePageReset, setSelectedGroup }) {
    const [noTitle, setNoTitle] = useState(false)
    
    function handleSaveGroup() {
        !editedGroup.title ? setNoTitle(true) : setNoTitle(false)
        if (!!editedGroup.title) {
            const payload = {
                method: (!!createGroupToggle ? "POST" : "PATCH"),
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...editedGroup})
            }
            fetch((!!createGroupToggle ? "/pin_groups" : `/pin_groups/${editedGroup.id}`), payload)
            .then(resp => {
                if (resp.ok) {
                    setPins(null)
                    setSelectedGroup({})
                    setEditedGroup({})
                    setHomePageReset(!homePageReset)
                }
            }) 
        }
    }

    function handleDeleteGroup() {
        fetch(`/pin_groups/${editedGroup.id}`, {method: "DELETE"})
        .then(resp => {
            if (resp.ok) {
                setPins(null)
                setSelectedGroup({})
                setEditedGroup({})
                setHomePageReset(!homePageReset)
            }
        })
    }
    
    return(
        <div>
            {!!createGroupToggle ? <h2>Create New Group</h2> : <h2>Edit Group</h2>}
            <FormControl>
                    <TextField
                        required
                        id="group-title"
                        label="Title"
                        style={{width: 400}}
                        value={editedGroup.title}
                        onChange={(e) => setEditedGroup({...editedGroup, title: e.target.value})}
                    />
                    {!!noTitle ? <p style={{color: "red"}}>Groups require a title.</p> : null}
                    <br/>
                    <TextField
                        id="group-description"
                        label="Description"
                        multiline
                        minRows={3}
                        style={{width: 500}}
                        value={editedGroup.description}
                        onChange={(e) => setEditedGroup({...editedGroup, description: e.target.value})}
                    />
                    <br/>
                    <Select
                        required
                        label="Marker Color"
                        style={{height: 55, width: 300}}
                        value={editedGroup.marker_color}
                        onChange={e => setEditedGroup({...editedGroup, marker_color: e.target.value})}
                    >
                        <MenuItem value={0}><img src={PinMarkerRed} alt="Pin Icon"/>Red</MenuItem>
                        <MenuItem value={1}><img src={PinMarkerBlack} alt="Pin Icon"/>Black</MenuItem>
                        <MenuItem value={2}><img src={PinMarkerBlue} alt="Pin Icon"/>Blue</MenuItem>
                        <MenuItem value={3}><img src={PinMarkerGreen} alt="Pin Icon"/>Green</MenuItem>
                        <MenuItem value={4}><img src={PinMarkerOrange} alt="Pin Icon"/>Orange</MenuItem>
                        <MenuItem value={5}><img src={PinMarkerPurple} alt="Pin Icon"/>Purple</MenuItem>
                        <MenuItem value={6}><img src={PinMarkerWhite} alt="Pin Icon"/>White</MenuItem>
                        <MenuItem value={7}><img src={PinMarkerYellow} alt="Pin Icon"/>Yellow</MenuItem>
                        
                    </Select>
                    <br />
                    <br/>
                    <Button variant="outlined" color="success" style={{textTransform: "none"}} onClick={handleSaveGroup}>Save</Button>
                    <br/>
                    {!!createGroupToggle ? null : <Button variant="outlined" color="error" style={{textTransform: "none"}} onClick={handleDeleteGroup}>Delete</Button>}
                </FormControl>
        </div>
    )
}

export default EditGroup