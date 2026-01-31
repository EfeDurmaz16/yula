import { createAuth } from './config'

export const auth = createAuth()

export const { handler, signIn, signUp, signOut, getSession } = auth
