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
