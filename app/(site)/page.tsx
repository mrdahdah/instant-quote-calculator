import Link from 'next/link';

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Get Your Instant Quote</h1>
      <p className="text-gray-600">Answer a few quick questions to see your estimated price and receive a copy via email.</p>
      <Link href="/quote" className="inline-block rounded bg-primary px-4 py-2 text-white hover:opacity-90">
        Start Quote
      </Link>
    </div>
  );
}
