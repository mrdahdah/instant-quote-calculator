import '../globals.css';
import React from 'react';
import { getTenantFromHeaders } from '@/lib/tenants/get-tenant';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Tenant-aware theming via CSS variables
  const tenant = await getTenantFromHeaders();
  const style: React.CSSProperties = {
    // @ts-ignore css vars ok
    '--color-primary': tenant.theme?.primary || '#0ea5e9',
    '--color-accent': tenant.theme?.accent || '#22c55e',
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={style} className="min-h-screen">
        <ThemeProvider>
          <header className="border-b bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
            <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
              {tenant.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tenant.logoUrl} alt={tenant.name} className="h-8 w-auto" />
              ) : (
                <div className="font-semibold text-primary">{tenant.name}</div>
              )}
              <div className="ml-auto flex items-center gap-3">
                <div className="text-sm muted">Instant Quote</div>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
