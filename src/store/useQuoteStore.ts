import { create } from 'zustand';
import type { TenantRules } from '@/lib/pricing/calculate';

type State = {
  rules: TenantRules;
  total: number;
  setTotal: (n: number) => void;
};

export const useQuoteStore = create<State>((set) => ({
  rules: {
    basePrices: { wiring: 80, lighting: 50, fuseRepair: 100, inspection: 120 },
    urgencyMultiplier: { same_day: 1.5, '24h': 1.2, flexible: 1 },
    distance: { perKm: 1.5, freeKm: 5 },
    marginPct: 0.1,
    currency: 'USD',
  },
  total: 0,
  setTotal: (n) => set({ total: n })
}));
