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
                
                console.log(credentials)

                return null
            }
        })
    ],
    adapter: MongoDBAdapter(clientPromise) as Adapter,
}

export default authOptions;