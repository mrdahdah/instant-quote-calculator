import { headers } from 'next/headers';
import type { TenantRules } from '@/lib/pricing/calculate';

type Tenant = {
  name: string;
  logoUrl?: string;
  theme?: { primary?: string; accent?: string };
  rules: TenantRules;
};

const DEFAULT_RULES: TenantRules = {
  basePrices: { wiring: 80, lighting: 50, fuseRepair: 100, inspection: 120 },
  urgencyMultiplier: { same_day: 1.5, '24h': 1.2, flexible: 1 },
  distance: { perKm: 1.5, freeKm: 5 },
  marginPct: 0.1,
  currency: 'USD',
};

const TENANT_MAP: Record<string, Tenant> = {
  'electrician.local': { name: 'SmartElectrics', theme: { primary: '#0ea5e9', accent: '#22c55e' }, rules: DEFAULT_RULES },
};

export async function getTenantFromHeaders(): Promise<Tenant> {
  const hdrs = await headers();
  const host = hdrs.get('x-tenant-host') || hdrs.get('host') || '';
  return TENANT_MAP[host] || { name: 'Instant Quotes', rules: DEFAULT_RULES };
}

export type { Tenant };
