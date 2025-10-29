export type QuoteSelections = {
  serviceType: 'wiring'|'lighting'|'fuseRepair'|'inspection';
  urgency: 'same_day'|'24h'|'flexible';
  distanceKm: number;
  extras?: Array<{ id: string; price: number }>;
};

export type TenantRules = {
  basePrices: Record<string, number>;
  urgencyMultiplier: Record<string, number>;
  distance: { perKm: number; freeKm: number };
  marginPct: number;
  currency: string;
};

export function calculateQuote(input: QuoteSelections, rules: TenantRules) {
  let price = rules.basePrices[input.serviceType] ?? 80;
  const urg = rules.urgencyMultiplier[input.urgency] ?? 1;
  price *= urg;
  const billable = Math.max(0, input.distanceKm - (rules.distance.freeKm ?? 0));
  price += billable * (rules.distance.perKm ?? 0);
  if (input.extras?.length) price += input.extras.reduce((s, e) => s + (e.price || 0), 0);
  price *= 1 + (rules.marginPct ?? 0);
  return Math.round(price);
}

export type QuoteBreakdown = {
  base: number;
  urgencyMultiplier: number;
  distanceCost: number;
  extrasTotal: number;
  marginAdded: number;
  subtotalBeforeMargin: number;
  total: number;
};

export function calculateBreakdown(input: QuoteSelections, rules: TenantRules): QuoteBreakdown {
  const base = rules.basePrices[input.serviceType] ?? 80;
  const urgencyMultiplier = rules.urgencyMultiplier[input.urgency] ?? 1;
  const billableKm = Math.max(0, input.distanceKm - (rules.distance.freeKm ?? 0));
  const distanceCost = billableKm * (rules.distance.perKm ?? 0);
  const extrasTotal = input.extras?.reduce((s, e) => s + (e.price || 0), 0) ?? 0;
  const subtotalBeforeMargin = base * urgencyMultiplier + distanceCost + extrasTotal;
  const marginAdded = subtotalBeforeMargin * (rules.marginPct ?? 0);
  const total = Math.round(subtotalBeforeMargin + marginAdded);
  return { base, urgencyMultiplier, distanceCost, extrasTotal, marginAdded, subtotalBeforeMargin, total };
}
