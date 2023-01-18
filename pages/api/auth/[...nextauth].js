import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "f8c9dd", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "#f8c9dd" // Hex color code
      },
      pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signin',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)