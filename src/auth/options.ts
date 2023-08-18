import { AuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './adapter';
import { Adapter } from 'next-auth/adapters';

const authOptions: AuthOptions = {
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    callbacks : {
        signIn: async ({user, account, profile}) => {
            console.log({user})
            console.log({account})
            console.log({profile})
            return true
        },
        jwt: async ({token, user, account, profile, isNewUser}) => {
            console.log({token})
            console.log({isNewUser})
            return token
        }
    },
    events : {
        createUser : async (message) => {
            console.log({message})
        }
    }
}

export default authOptions;