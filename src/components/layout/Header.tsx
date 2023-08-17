import Link from "next/link"
import Drawer from "./Drawer"

export default function Header() {
    return (
        <header flex justify="between" p="2 md:4">
            <div flex items="center" gap="2">
                <Drawer/>
                <Link href="/">
                    <h1>NextJS Bootstrap</h1>
                </Link>
            </div>
            <nav className="hidden" md="flex gap-4">
                <Link href="/login">login</Link>
                <Link href="/signup">signup</Link>
            </nav>
        </header>
    )
}