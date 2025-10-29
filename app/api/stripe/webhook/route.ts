import { NextResponse } from 'next/server';

export async function POST() {
  // Placeholder: verify Stripe signature and update quote status
  return NextResponse.json({ received: true });
}
