import { AuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './adapter';
import { Adapter } from 'next-auth/adapters';

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (credentials && credentials.email) {
                    try {
                        const user = await fetch("http://localhost:3000/api/user?email=" + encodeURI(credentials.email))
                        const userJson = await user.json()
                        if (userJson.error) return null
                        return userJson
                    } catch (error) {
                        return null
                    }
                }

                return null
            }
        })
    ],
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    session : {
        strategy: 'jwt',
    }
}

export default authOptions;