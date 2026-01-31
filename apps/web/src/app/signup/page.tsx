'use client'

import { signUp } from '@repo/auth/client'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@repo/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignUp = async () => {
    setError('')

    if (password !== passwordConfirmation) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    await signUp.email({
      email,
      password,
      name: `${firstName} ${lastName}`.trim(),
      fetchOptions: {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onError: (ctx) => setError(ctx.error.message || 'Signup failed'),
        onSuccess: () => router.push('/chat'),
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="mb-4 inline-block text-2xl font-bold text-neutral-900">
            YULA
          </Link>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {error && (
              <div className="rounded-lg bg-neutral-100 p-3 text-sm text-neutral-900">{error}</div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="first-name" className="text-sm font-medium text-neutral-700">
                  First name
                </label>
                <Input
                  id="first-name"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="Max"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="last-name" className="text-sm font-medium text-neutral-700">
                  Last name
                </label>
                <Input
                  id="last-name"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Robinson"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
            </div>

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
              <label htmlFor="password" className="text-sm font-medium text-neutral-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="password_confirmation"
                className="text-sm font-medium text-neutral-700"
              >
                Confirm Password
              </label>
              <Input
                id="password_confirmation"
                name="passwordConfirmation"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading} onClick={handleSignUp}>
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-0 border-t-transparent" />
              ) : (
                'Create your account'
              )}
            </Button>

            <p className="text-center text-xs text-neutral-500">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-neutral-900">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-neutral-900">
                Privacy Policy
              </Link>
            </p>

            <div className="text-center text-sm text-neutral-500">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-neutral-900 underline">
                Sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
