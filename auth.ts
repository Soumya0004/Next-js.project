import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { autherByGithub } from "@/sanity/lib/queries"; // make sure this is the correct path

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
   GitHub
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const { name, email, image } = user;
      const { id, login, bio } = profile;

      try {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(autherByGithub, {
            id, // GitHub ID as number
          });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id, // store GitHub numeric ID
            name,
            username: login,
            email,
            image,
            bio: bio || "",
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn Error:", error);
        return false;
      }
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(autherByGithub, {
              id: profile.id,
            });

          token.id = user?._id;
        } catch (err) {
          console.error("JWT Callback Error:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.id = token.id;
      }
      return session;
    },
  },
});
