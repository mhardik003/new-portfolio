'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { STD_DEDUCTION, breakEvenDeductions, totalTax } from '@/lib/tax'

// Every slab, rebate and surcharge number lives in @/lib/tax. This component
// deliberately declares none of its own — an earlier copy did, and it drifted
// two Budgets behind the chapters it sits next to.

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

const lakhs = (n) => `₹${(n / 100000).toFixed(1)}L`

export function TaxRegimeSlider() {
  // Gross salary, not CTC: employer PF and the gratuity provision sit inside
  // CTC but are not salary income, so feeding CTC in here would overstate tax.
  const [gross, setGross] = useState(1500000)
  const [deductions, setDeductions] = useState(200000)

  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === 'dark'

  const { newTax, oldTax, better, gap, breakEven } = useMemo(() => {
    const newTax = Math.round(
      totalTax(Math.max(0, gross - STD_DEDUCTION.new), 'new'),
    )
    const oldTax = Math.round(
      totalTax(Math.max(0, gross - STD_DEDUCTION.old - deductions), 'old'),
    )

    return {
      newTax,
      oldTax,
      better: oldTax === newTax ? 'tie' : oldTax > newTax ? 'new' : 'old',
      gap: Math.abs(oldTax - newTax),
      // The solver returns total old-regime deductions; the slider asks only
      // for the declared ones, so net off the standard deduction.
      breakEven: breakEvenDeductions(gross) - STD_DEDUCTION.old,
    }
  }, [gross, deductions])

  const data = [
    { name: 'Old regime', Tax: oldTax, 'After tax': gross - oldTax },
    { name: 'New regime', Tax: newTax, 'After tax': gross - newTax },
  ]

  const axis = isDark ? '#a1a1aa' : '#52525b'
  const grid = isDark ? '#3f3f46' : '#e4e4e7'
  const taxFill = isDark ? '#fb7185' : '#e11d48'
  const keepFill = isDark ? '#2dd4bf' : '#0d9488'

  return (
    <div className="not-prose my-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <h3 className="mb-1 text-xl font-bold text-zinc-800 dark:text-zinc-100">
        Tax Regime Break-even Explorer
      </h3>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        FY 2026-27 slabs. Standard deduction is applied for you —{' '}
        {inr(STD_DEDUCTION.new)} in the new regime, {inr(STD_DEDUCTION.old)} in
        the old.
      </p>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="tax-gross"
            className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-100"
          >
            Gross salary (annual):{' '}
            <span className="tabular-nums">{lakhs(gross)}</span>
          </label>
          <input
            id="tax-gross"
            type="range"
            min="700000"
            max="5000000"
            step="100000"
            value={gross}
            onChange={(e) => setGross(Number(e.target.value))}
            className="w-full accent-teal-500"
          />
        </div>
        <div>
          <label
            htmlFor="tax-deductions"
            className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-100"
          >
            Old-regime deductions (80C, HRA, 80D…):{' '}
            <span className="tabular-nums">{lakhs(deductions)}</span>
          </label>
          <input
            id="tax-deductions"
            type="range"
            min="0"
            max="1500000"
            step="50000"
            value={deductions}
            onChange={(e) => setDeductions(Number(e.target.value))}
            className="w-full accent-teal-500"
          />
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={grid}
              vertical={false}
            />
            <XAxis dataKey="name" stroke={axis} tick={{ fill: axis }} />
            <YAxis
              stroke={axis}
              tick={{ fill: axis }}
              tickFormatter={(val) => `₹${+(val / 100000).toFixed(1)}L`}
            />
            <Tooltip
              formatter={(value) => inr(value)}
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: isDark ? '#18181b' : '#ffffff',
                border: `1px solid ${grid}`,
                borderRadius: '0.5rem',
                color: isDark ? '#f4f4f5' : '#18181b',
              }}
              // Items keep their series colour, which is already theme-aware;
              // only the label defaults to a hardcoded #666.
              labelStyle={{ color: isDark ? '#f4f4f5' : '#18181b' }}
              wrapperStyle={{ outline: 'none' }}
            />
            <Legend wrapperStyle={{ color: axis }} />
            <Bar
              dataKey="Tax"
              fill={taxFill}
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            />
            <Bar
              dataKey="After tax"
              fill={keepFill}
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 rounded-lg bg-zinc-50 p-4 text-center dark:bg-zinc-800/50">
        <p className="text-lg text-zinc-700 dark:text-zinc-300">
          At {lakhs(gross)} gross with {lakhs(deductions)} of declared
          deductions,{' '}
          {better === 'tie' ? (
            <>
              both regimes cost exactly the same —
              <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                {' '}
                {inr(newTax)}
              </span>{' '}
              either way.
            </>
          ) : (
            <>
              the{' '}
              <strong>{better === 'new' ? 'new regime' : 'old regime'}</strong>{' '}
              saves you
              <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                {' '}
                {inr(gap)}
              </span>{' '}
              in tax.
            </>
          )}
        </p>
        {breakEven > 0 && (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            The old regime only catches up past roughly{' '}
            {inr(Math.round(breakEven / 1000) * 1000)} of declared deductions at
            this salary.
          </p>
        )}
      </div>
    </div>
  )
}
