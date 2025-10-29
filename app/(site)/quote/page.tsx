"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuoteInputSchema, type QuoteInput } from '@/lib/validation';
import { useQuoteStore } from '@/store/useQuoteStore';
import { calculateQuote } from '@/lib/pricing/calculate';
import { useEffect, useState } from 'react';
import { AnimatedNumber } from '@/components/animated-number';

const serviceOptions = [
  { value: 'wiring', label: 'Wiring' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'fuseRepair', label: 'Fuse Repair' },
  { value: 'inspection', label: 'Inspection' },
];

const urgencyOptions = [
  { value: 'same_day', label: 'Same Day' },
  { value: '24h', label: 'Within 24h' },
  { value: 'flexible', label: 'Flexible' },
];

export default function QuotePage() {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<QuoteInput>({
    resolver: zodResolver(QuoteInputSchema),
    defaultValues: {
      name: '', email: '', phone: '',
      selections: { serviceType: 'wiring', urgency: 'flexible', distanceKm: 0 }
    }
  });
  const selections = watch('selections');
  const { rules, total, setTotal } = useQuoteStore();
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  useEffect(() => {
    const next = calculateQuote(selections, rules);
    setTotal(next);
  }, [selections, rules, setTotal]);

  const onSubmit = async (data: QuoteInput) => {
    setSubmitting(true);
    setServerMsg(null);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed');
      setServerMsg('Quote submitted successfully. Check your email.');
    } catch (e: any) {
      setServerMsg(e.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Instant Quote</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-sm text-gray-700">Service</span>
            <select className="mt-1 w-full rounded border px-3 py-2" {...register('selections.serviceType')}>
              {serviceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-700">Urgency</span>
            <select className="mt-1 w-full rounded border px-3 py-2" {...register('selections.urgency')}>
              {urgencyOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-700">Distance (km)</span>
            <input type="number" step="1" min={0} className="mt-1 w-full rounded border px-3 py-2" {...register('selections.distanceKm', { valueAsNumber: true })} />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-sm text-gray-700">Name</span>
            <input className="mt-1 w-full rounded border px-3 py-2" {...register('name')} />
            {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
          </label>
          <label className="block">
            <span className="text-sm text-gray-700">Email</span>
            <input className="mt-1 w-full rounded border px-3 py-2" {...register('email')} />
            {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
          </label>
          <label className="block">
            <span className="text-sm text-gray-700">Phone</span>
            <input className="mt-1 w-full rounded border px-3 py-2" {...register('phone')} />
            {errors.phone && <span className="text-xs text-red-600">{errors.phone.message}</span>}
          </label>
        </div>

        <div className="flex items-center justify-between card p-4">
          <div>
            <div className="text-sm muted">Estimated total</div>
            <AnimatedNumber className="text-2xl font-semibold" value={total} prefix="$" />
          </div>
          <button type="submit" disabled={submitting} className="rounded bg-primary px-4 py-2 text-white hover:opacity-90 disabled:opacity-60">
            {submitting ? 'Submitting...' : 'Get My Quote'}
          </button>
        </div>

        {serverMsg && <div className="text-sm text-gray-700">{serverMsg}</div>}
      </form>
    </div>
  );
}
