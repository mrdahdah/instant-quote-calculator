import Link from 'next/link';

export default function Page() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/15 via-white to-accent/10 p-8 shadow-sm dark:from-primary/10 dark:via-gray-900 dark:to-accent/10">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <h1 className="text-4xl font-bold tracking-tight">Get Your Instant Quote</h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-600 dark:text-gray-300">Answer a few quick questions to see your estimated price and receive a copy via email.</p>
        <div className="mt-6 flex items-center gap-3">
          <Link href="/quote" className="inline-block rounded-md bg-primary px-5 py-2.5 text-white shadow hover:opacity-90">Start Quote</Link>
          <Link href="/quote" className="inline-block rounded-md border px-5 py-2.5 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">See how pricing works</Link>
        </div>
      </section>
    </div>
  );
}
