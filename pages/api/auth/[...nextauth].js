import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        // this is only for demontrating the issue
        if (
          credentials.username === 'admin' &&
          credentials.password === 'admin'
        ) {
          return {
            email: 'admin@app.com',
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
});
