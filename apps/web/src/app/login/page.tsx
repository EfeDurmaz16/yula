'use client'

import { signIn } from '@repo/auth/client'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@repo/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="mb-4 inline-block text-2xl font-bold text-neutral-900">
            YULA
          </Link>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {error && (
              <div className="rounded-lg bg-neutral-100 p-3 text-sm text-neutral-900">{error}</div>
            )}

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <label htmlFor="password" className="text-sm font-medium text-neutral-700">
                  Password
                </label>
                <Link href="#" className="ml-auto inline-block text-sm text-neutral-500 underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-neutral-300"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember" className="text-sm text-neutral-700">
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              onClick={async () => {
                setError('')
                await signIn.email({
                  email,
                  password,
                  rememberMe,
                  fetchOptions: {
                    onRequest: () => setLoading(true),
                    onResponse: () => setLoading(false),
                    onError: (ctx) => setError(ctx.error.message || 'Login failed'),
                    onSuccess: () => router.push('/chat'),
                  },
                })
              }}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-0 border-t-transparent" />
              ) : (
                'Login'
              )}
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-neutral-0 px-2 text-neutral-500">Or continue with</span>
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center justify-between gap-2">
              <Button
                variant="outline"
                className="flex-grow"
                disabled={loading}
                onClick={async () => {
                  await signIn.social({
                    provider: 'google',
                    callbackURL: '/chat',
                    fetchOptions: {
                      onRequest: () => setLoading(true),
                      onResponse: () => setLoading(false),
                    },
                  })
                }}
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 262"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  />
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  />
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  />
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  />
                </svg>
              </Button>

              <Button
                variant="outline"
                className="flex-grow"
                disabled={loading}
                onClick={async () => {
                  await signIn.social({
                    provider: 'github',
                    callbackURL: '/chat',
                    fetchOptions: {
                      onRequest: () => setLoading(true),
                      onResponse: () => setLoading(false),
                    },
                  })
                }}
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  />
                </svg>
              </Button>

              <Button
                variant="outline"
                className="flex-grow"
                disabled={loading}
                onClick={async () => {
                  await signIn.social({
                    provider: 'apple',
                    callbackURL: '/chat',
                    fetchOptions: {
                      onRequest: () => setLoading(true),
                      onResponse: () => setLoading(false),
                    },
                  })
                }}
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M462.595 399.003c-7.743 17.888-16.908 34.353-27.527 49.492c-14.474 20.637-26.326 34.923-35.459 42.855c-14.159 13.021-29.329 19.69-45.573 20.068c-11.662 0-25.726-3.318-42.096-10.05c-16.425-6.7-31.519-10.019-45.32-10.019c-14.475 0-29.999 3.318-46.603 10.019c-16.63 6.731-30.027 10.24-40.27 10.587c-15.578.664-31.105-6.195-46.603-20.606c-9.892-8.628-22.265-23.418-37.088-44.372c-15.903-22.375-28.977-48.322-39.221-77.904c-10.969-31.952-16.469-62.892-16.469-92.846c0-34.313 7.414-63.906 22.265-88.706c11.672-19.92 27.199-35.633 46.631-47.169s40.431-17.414 63.043-17.79c12.373 0 28.599 3.827 48.762 11.349c20.107 7.547 33.017 11.375 38.677 11.375c4.232 0 18.574-4.475 42.887-13.397c22.992-8.274 42.397-11.7 58.293-10.35c43.076 3.477 75.438 20.457 96.961 51.05c-38.525 23.343-57.582 56.037-57.203 97.979c.348 32.669 12.199 59.855 35.491 81.44c10.555 10.019 22.344 17.762 35.459 23.26c-2.844 8.248-5.846 16.149-9.038 23.735zM363.801 10.242c0 25.606-9.355 49.514-28.001 71.643c-22.502 26.307-49.719 41.508-79.234 39.11a80 80 0 0 1-.594-9.703c0-24.582 10.701-50.889 29.704-72.398c9.488-10.89 21.554-19.946 36.187-27.17C336.464 4.608 350.275.672 363.264-.001c.379 3.423.538 6.846.538 10.242z"
                  />
                </svg>
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-neutral-500">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-neutral-900 underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
