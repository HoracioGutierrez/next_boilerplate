"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { AnimationEventHandler, useState } from "react"
import { Drawer as VaulDrawer } from "vaul"

export default function Drawer() {

    const [open, setOpen] = useState(false)
    const { data: session } = useSession()

    const handleOpen: AnimationEventHandler<HTMLDivElement> & ((open: boolean) => void) = (event) => {
        setOpen(!open)
    };

    return (
        <VaulDrawer.Root shouldScaleBackground>
            <VaulDrawer.Trigger asChild>
                <button className={open ? "i-carbon-close" : "i-carbon-menu"} md="hidden"/>
            </VaulDrawer.Trigger>
            <VaulDrawer.Portal>
                <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
                <VaulDrawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[50%] fixed bottom-0 left-0 right-0" onAnimationEnd={handleOpen}>
                    <div className="p-4 bg-white rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                        <div className="max-w-md mx-auto">
                            <VaulDrawer.Title className="font-medium mb-4 text-black">
                                NextJS Bootstrap
                            </VaulDrawer.Title>
                            <nav sm="flex gap-4 flex-col text-gray-500" relative z-1>
                                {!session && (
                                    <>
                                        <Link href="/login">login</Link>
                                        <Link href="/signup">signup</Link>
                                    </>
                                )}
                                {(session && session.user) && (
                                    <>
                                        <Link href="/">home</Link>
                                        <Link href="/api/auth/signout">signout</Link>
                                        <Link href="/profile">profile</Link>
                                        <Image
                                            src={session.user.image as string || "https://api.dicebear.com/6.x/initials/svg?seed=" + session.user.email}
                                            alt={session.user.name as string || session.user.email as string}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                    <div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
                        <div className="flex gap-6 justify-end max-w-md mx-auto">
                            <a
                                className="text-xs text-zinc-600 flex items-center gap-0.25"
                                href="https://github.com/HoracioGutierrez/next_boilerplate"
                                target="_blank"
                            >
                                GitHub
                                <svg
                                    fill="none"
                                    height="16"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    aria-hidden="true"
                                    className="w-3 h-3 ml-1"
                                >
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14L21 3"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </VaulDrawer.Content>
            </VaulDrawer.Portal>
        </VaulDrawer.Root>
    )
}