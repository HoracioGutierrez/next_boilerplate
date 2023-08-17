"use client"
import Link from "next/link";
import { useState } from "react";

export default function Drawer() {
    
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(!open)
    }

    return (
        <div id="drawer">
            <button i-carbon="menu" md="hidden" onClick={toggleOpen}/>
            <div id="overlay" fixed top-0 left-0 className={open ? "w-full h-full z-4" : ""} onClick={toggleOpen}/>
            <nav flex flex-col fixed transition-all duration-300 top-0 w="2/3" className={open ? "left-0 shadow-2xl" : "-left-full"} bg-white z-5 h-full p-2>
                <Link href="/login" onClick={toggleOpen}>login</Link>
                <Link href="/signup" onClick={toggleOpen}>signup</Link>
            </nav>
        </div>
    )
}