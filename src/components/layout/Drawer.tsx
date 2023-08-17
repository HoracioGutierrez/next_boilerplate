"use client"
import Link from "next/link";
import { useState } from "react";

export default function Drawer() {
    
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(!open)
    }

    const closeDrawer = () => {
        setOpen(false)
    }

    return (
        <div id="drawer">
            <button i-carbon="menu" md="hidden" onClick={toggleOpen} className="cursor-pointer" z-1 relative/>
            <div id="overlay" fixed top-0 left-0 w-full h-full z-0 transition-all duration-300 className={open ? "z-4 bg-[rgba(0,0,0,0.3)]" : ""} onClick={closeDrawer}/>
            <nav flex flex-col fixed transition-all duration-300 top-0 w="2/3" className={open ? "left-0" : "-left-full"} bg-white z-5 h-full p-2>
                <Link href="/login" onClick={toggleOpen}>login</Link>
                <Link href="/signup" onClick={toggleOpen}>signup</Link>
            </nav>
        </div>
    )
}