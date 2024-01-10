import User from "@models/User"
import { connectToDB } from "@utils/Database"
import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.CLIENT_SECRET_ID,
        }),

    ],

    callbacks: {
        //Handling the user session
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            })

            session.user.id = sessionUser._id.toString()

            return session;
        },

        //The signing process
        async signIn({ profile }) {
            try {
                await connectToDB()
                const userExist = await User.findOne({ email: profile.email })

                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
            } catch (err) {
                console.log(err);

                return false;
            }

        }
    }
})

export { handler as GET, handler as POST }