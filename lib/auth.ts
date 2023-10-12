import { NextAuthOptions} from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { db as prisma } from '@/lib/db'
import bcrypt from 'bcrypt'

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
        if(!credentials?.email || !credentials?.password) throw new Error('Dados de login necessarios')

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        })

        console.log("USER", user)

        if(!user || !user.hashedPassword) {
          throw new Error('Usuário não resgistrado por credenciais')
        }
        
        const matchPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

        if(!matchPassword) throw new Error('senha incorreta')

        return user 
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/login'
  }
}