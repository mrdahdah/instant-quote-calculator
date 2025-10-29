"use client";
import clsx from 'clsx';

type Step = { label: string };

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <div className="flex items-center gap-6 rounded-lg border bg-white/70 px-4 py-3 text-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
      {steps.map((s, idx) => {
        const stepNum = idx + 1;
        const state = stepNum === current ? 'current' : stepNum < current ? 'done' : 'todo';
        return (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className={clsx(
                'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                state === 'current' && 'bg-primary/90 text-white shadow',
                state === 'done' && 'bg-accent/90 text-white',
                state === 'todo' && 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              )}
            >
              {stepNum}
            </span>
            <span className={clsx('hidden sm:block', state === 'todo' && 'muted')}>{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}


