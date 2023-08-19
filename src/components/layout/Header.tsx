import Link from "next/link"
import Drawer from "./Drawer"
import Image from "next/image"
import { getServerSession } from "next-auth"
import authOptions from "@/auth/options"

export default async function Header() {

    const session = await getServerSession(authOptions)

    return (
        <header flex justify="between" p="2 md:4">
            <div flex items="center" gap="2 md:0" relative z-1>
                <Drawer />
                <Link href="/" relative z-1>
                    <h1>NextJS Bootstrap</h1>
                </Link>
            </div>
            <nav className="hidden" md="flex gap-4" relative z-1>
                {!session && (
                    <>
                        <Link href="/login">login</Link>
                        <Link href="/signup">signup</Link>
                    </>
                )}
                {(session && session.user) && (
                    <>
                        <Link href="/api/auth/signout">signout</Link>
                        <Link href="/profile">profile</Link>
                        <Image
                            src={session.user.image as string}
                            alt={session.user.name as string}
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