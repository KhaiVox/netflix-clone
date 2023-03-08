import React, { useState } from 'react'
import NavBar from '../components/NavBar'

export default function Netflix() {
    const [isScrolled, setIsScrolled] = useState(false)

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.scroll = null)
    }
    return (
        <div>
            <NavBar isScrolled={isScrolled} />
        </div>
    )
}