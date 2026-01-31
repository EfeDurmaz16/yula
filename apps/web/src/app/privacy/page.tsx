import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold text-neutral-900">Privacy Policy</h1>
      <p className="mb-8 text-neutral-500">Last updated: January 2025</p>
      <div className="prose prose-neutral">
        <p>
          Privacy policy coming soon. YULA takes your privacy seriously. Your data is encrypted and
          never shared with third parties.
        </p>
      </div>
      <Link href="/signup" className="mt-8 inline-block text-sm text-neutral-500 underline">
        Back to signup
      </Link>
    </div>
  )
}
