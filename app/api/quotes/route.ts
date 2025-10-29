import { NextResponse } from 'next/server';
import { QuoteInputSchema } from '@/lib/validation';
import { calculateQuote } from '@/lib/pricing/calculate';
import { getTenantFromHeaders } from '@/lib/tenants/get-tenant';
import { buildQuotePdf } from '@/lib/pdf/generate';

export async function POST(req: Request) {
  try {
    const tenant = await getTenantFromHeaders();
    const body = await req.json();
    const parsed = QuoteInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid input', issues: parsed.error.flatten() }, { status: 400 });
    }
    const input = parsed.data;
    const total = calculateQuote(input.selections, tenant.rules);

    // Placeholder: generate a simple PDF buffer and pretend to upload
    const pdfBytes = await buildQuotePdf({ tenant, quote: { ...input, total_price: total, currency: tenant.rules.currency || 'USD' } });
    const pdfUrl = 'about:blank'; // In production: upload to Supabase/S3 and return signed URL

    // TODO: save to DB (Supabase) and send email via Resend/SendGrid
    return NextResponse.json({ id: 'local-dev-id', total, currency: tenant.rules.currency || 'USD', pdfUrl });
  } catch (e: any) {
    return NextResponse.json({ message: e.message || 'Server error' }, { status: 500 });
  }
}
