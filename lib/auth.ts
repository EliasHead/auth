import { NextAuthOptions} from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

export const authOptions : NextAuthOptions = {
  providers:[
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'head'},
        password: { label: 'Password', type: 'password'},
        username: { label: 'Name', type: 'text', placeholder: 'Elias Costa'}
      },
      async authorize(credentials, req): Promise<any> {
        
      }
    })
  ]
}