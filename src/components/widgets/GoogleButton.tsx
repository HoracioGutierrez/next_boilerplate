"use client"

import { signIn } from "next-auth/react"

type Props = {}

export default function GoogleButton({ }: Props) {
    return (
        <button
            type="submit"
            className="flex w-full items-center gap-2 mt-2 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={() => signIn()}
        >
            <div i-carbon="logo-google" />
            Sign Up with Google
        </button>
    )
}