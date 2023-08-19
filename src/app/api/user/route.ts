import clientPromise from "@/auth/adapter";
import { NextResponse } from "next/server";
import { hash } from 'bcryptjs'

export async function GET(request: Request) {
    const client = await clientPromise;
    const db = client.db();
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    const user = await db.collection('users').findOne({ email })

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json(user)

}

export async function POST(request: Request) {
    const client = await clientPromise;
    const db = client.db();
    const { email, password } = await request.json()

    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })

    const user = await db.collection('users').findOne({ email })
    if (user) return NextResponse.json({ error: 'User already exists' }, { status: 400 })

    const hashedPassword = await hash(password, 12)

    try {

        const newUser = await db.collection('users').insertOne({ email, password: hashedPassword })
        return NextResponse.json({ user: { _id: newUser.insertedId, email } })

    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}
