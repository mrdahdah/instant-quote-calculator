"use client";
import { AnimatedNumber } from '@/components/animated-number';
import { calculateBreakdown, QuoteSelections, TenantRules } from '@/lib/pricing/calculate';

export function QuoteSummary({ selections, rules }: { selections: QuoteSelections; rules: TenantRules }) {
  const b = calculateBreakdown(selections, rules);
  return (
    <aside className="card sticky top-4 p-4">
      <div className="mb-3 text-sm muted">Your estimate</div>
      <div className="text-3xl font-bold"><AnimatedNumber value={b.total} prefix="$" /></div>
      <div className="mt-4 space-y-2 text-sm">
        <SummaryRow label="Base" value={`$${Math.round(b.base)}`} />
        <SummaryRow label={`Urgency ×${b.urgencyMultiplier}`} value="" />
        <SummaryRow label="Distance" value={`$${Math.round(b.distanceCost)}`} />
        {b.extrasTotal > 0 && <SummaryRow label="Extras" value={`$${Math.round(b.extrasTotal)}`} />}
        <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
        <SummaryRow label="Margin" value={`$${Math.round(b.marginAdded)}`} />
      </div>
      <button className="mt-6 w-full rounded-md bg-primary py-2 text-white hover:opacity-90">Continue</button>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}


