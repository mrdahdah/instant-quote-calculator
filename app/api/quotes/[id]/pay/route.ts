import { NextResponse } from 'next/server';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  // Placeholder: create PaymentIntent via Stripe here and return client_secret or checkout URL
  return NextResponse.json({ id: params.id, payment: { checkoutUrl: 'https://example.com/checkout' } });
}
