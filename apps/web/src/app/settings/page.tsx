'use client'

import { signOut, useSession } from '@repo/auth/client'
import { PRICING } from '@repo/types'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  useToast,
} from '@repo/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SettingsPage() {
  const router = useRouter()
  const { addToast } = useToast()
  const { data: session, isPending } = useSession()
  const [isSaving, setIsSaving] = useState(false)
  const [name, setName] = useState(session?.user?.name || '')
  const [email, setEmail] = useState(session?.user?.email || '')

  const handleSave = async () => {
    setIsSaving(true)
    try {
      addToast({ title: 'Settings saved', variant: 'success' })
    } catch {
      addToast({ title: 'Failed to save settings', variant: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login')
        },
      },
    })
  }

  const handleUpgrade = async (tier: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/payment/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ tier, billingCycle: 'monthly' }),
      })
      const data = await response.json()
      if (data.success && data.data.checkoutUrl) {
        window.location.href = data.data.checkoutUrl
      }
    } catch {
      addToast({ title: 'Failed to start checkout', variant: 'error' })
    }
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      </div>
    )
  }

  const user = session?.user
  const currentTier = (user as { tier?: string })?.tier || 'free'
  const tierInfo = PRICING[currentTier as keyof typeof PRICING]

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-neutral-0">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/chat" className="text-lg font-bold text-neutral-900">
              YULA
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/chat" className="text-sm text-neutral-500 hover:text-neutral-900">
                Chat
              </Link>
              <Link href="/memory" className="text-sm text-neutral-500 hover:text-neutral-900">
                Memory
              </Link>
              <Link href="/settings" className="text-sm font-medium text-neutral-900">
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>

        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="name-input"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Name
                </label>
                <Input
                  id="name-input"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email-input"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Email
                </label>
                <Input
                  id="email-input"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} isLoading={isSaving}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>
                Current plan: <span className="font-semibold">{tierInfo.name}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-neutral-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-900">{tierInfo.name} Plan</p>
                    <p className="text-sm text-neutral-500">
                      {tierInfo.limits.messagesPerMonth === -1
                        ? 'Unlimited'
                        : tierInfo.limits.messagesPerMonth.toLocaleString()}{' '}
                      messages/month
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-neutral-900">${tierInfo.monthlyPrice}/mo</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {currentTier === 'ultra' ? (
                <p className="text-sm text-neutral-500">You are on the highest tier</p>
              ) : (
                <Button variant="secondary" onClick={() => handleUpgrade('pro')}>
                  Upgrade Plan
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={handleLogout}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
