"use client"
import Link from "next/link"
import Drawer from "./Drawer"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Header() {

    const { data, status } = useSession()

    return (
        <header flex justify="between" p="2 md:4">
            <div flex items="center" gap="2 md:0" relative z-1>
                <Drawer />
                <Link href="/" relative z-1>
                    <h1>NextJS Bootstrap</h1>
                </Link>
            </div>
            <nav className="hidden" md="flex gap-4" relative z-1>
                {status === "loading" && <div className="i-svg-spinners:180-ring-with-bg" />}
                {status === "unauthenticated" && (
                    <>
                        <Link href="/login">login</Link>
                        <Link href="/signup">signup</Link>
                    </>
                )}
                {status === "authenticated" && (
                    <>
                        <Link href="/api/auth/signout">signout</Link>
                        <Link href="/profile">profile</Link>
                        <Image
                            src={data?.user?.image as string}
                            alt={data?.user?.name as string}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </>
                )}
            </nav>
        </header>
    )
}