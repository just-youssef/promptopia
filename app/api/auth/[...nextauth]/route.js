import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import { connectToDB } from "utils/database";
import User from "models/user";


const handler = NextAuth({
    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code
        logo: "/assets/images/logo.svg", // Absolute URL to image
        buttonText: "" // Hex color code
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        async session({ session }) {
        // store the user id from MongoDB to session
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
        session.user.name = sessionUser.username.toString();

        return session;
        },
        async signIn({ user }) {
            try {
                await connectToDB();
                // check if user exists
                const userExists = await User.findOne({
                    email: user.email
                })
                //create new user
                if (!userExists) {
                    await User.create({
                        email: user.email,
                        username: user.name.replaceAll(' ', '').toLowerCase(),
                        image: user.image,
                    });
                }

                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };