import { NextAuthOptions} from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'

export const authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  providers:[
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'eliashead.costa@gmail.com'},
        password: { label: 'Password', type: 'password'},
        username: { label: 'Name', type: 'text', placeholder: 'Elias Costa'}
      },
      async authorize(credentials, req): Promise<any> {
        console.log('authorize', credentials)
        const user = { email: 'eliashead.costa@gmail.com', password: '123456', name: 'Elias Head'}

        return user
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === 'development'
}