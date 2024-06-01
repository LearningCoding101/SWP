import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ShowFooter = ({ children2 }) => {
    const location = useLocation();
    const [showFoot, setShowFoot] = useState(false);
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgotpassword') {
            setShowFoot(false)
        } else {
            setShowFoot(true)
        }
    }, [location])


    return (
        <div>{showFoot && children2}</div>
    )
}

export default ShowFooter