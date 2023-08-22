"use client"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"

type Props = {
    children: React.ReactNode
}

export default function CustomSessionProvider({ children }: Props) {
    return (
        <SessionProvider>
            {children}
            <Toaster position="top-right" closeButton richColors/>
        </SessionProvider>
    )
}