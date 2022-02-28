import React, {useEffect, useState} from "react"

function HomePage({ user }) {
    useEffect(() => {
        console.log(user)
    },[])
    
    return(
        <h3>This is the home page</h3>
    )
}

export default HomePage