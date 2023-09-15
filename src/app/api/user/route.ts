import clientPromise from "@/auth/adapter";
import { NextResponse } from "next/server";
import { hash } from 'bcryptjs'
import { profileFormSchema } from "@/utils/yupSchemas";

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
    const { email, password, name, username } = await request.json()

    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })

    const user = await db.collection('users').findOne({ email })
    if (user) return NextResponse.json({ error: 'User already exists' }, { status: 400 })

    const hashedPassword = await hash(password, 12)

    try {

        const newUser = await db.collection('users').insertOne({ email, password: hashedPassword, name, username })
        return NextResponse.json({ user: { _id: newUser.insertedId, email } })

    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}

export async function PUT(request: Request) {

    const client = await clientPromise;
    const db = client.db();
    const { email, password, name, username , image } = await request.json()

    const validationResult = await profileFormSchema.safeParseAsync({ email, password, name, username })

    let zodErrors = {}

    if (!validationResult.success) {
        validationResult.error.issues.forEach(issue => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })

        return NextResponse.json({ success: false, errors: zodErrors }, { status: 400 })
    }

    try {

        let hashedPassword
        
        if (password) {
            hashedPassword = await hash(password, 12)
        }
        
        const newUser = await db.collection('users').findOneAndUpdate({ email }, { $set: { name, username, email, password: hashedPassword , image } }, { returnDocument: 'after' })
        return NextResponse.json({ success: true, newUser : newUser.value }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }

}