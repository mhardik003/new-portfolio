'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Recharts primitives take colours as props, not classes, so none of them can
// see the `dark` class on `<html>`. Left alone they default to a light-theme
// palette — a white tooltip, #666 axes, #ccc grid — on top of a zinc-900 page.
// The site palette is zinc + teal; the amber line is the one deliberate
// departure, because two neutral lines would be indistinguishable.
const palette = {
  light: {
    grid: '#e4e4e7', // zinc-200
    axis: '#71717a', // zinc-500
    legend: '#3f3f46', // zinc-700
    tooltipBg: '#ffffff',
    tooltipBorder: '#e4e4e7', // zinc-200
    tooltipText: '#18181b', // zinc-900
    equity: '#0d9488', // teal-600
    deposit: '#d97706', // amber-600
    invested: '#a1a1aa', // zinc-400
  },
  dark: {
    grid: '#3f3f46', // zinc-700
    axis: '#a1a1aa', // zinc-400
    legend: '#d4d4d8', // zinc-300
    tooltipBg: '#18181b', // zinc-900
    tooltipBorder: '#3f3f46', // zinc-700
    tooltipText: '#f4f4f5', // zinc-100
    equity: '#2dd4bf', // teal-400
    deposit: '#fbbf24', // amber-400
    invested: '#71717a', // zinc-500
  },
}

export function InteractiveCompoundChart() {
  const [monthlyContribution, setMonthlyContribution] = useState(10000)
  const [years, setYears] = useState(20)

  // `resolvedTheme` is undefined until the client has read the stored theme, so
  // reading it during the first render would flip colours after hydration and
  // trip a mismatch. Render the light palette until mounted, which is what the
  // server emitted anyway.
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const c = mounted && resolvedTheme === 'dark' ? palette.dark : palette.light

  // Generate data points
  const generateData = () => {
    let data = []
    let bankDeposit = 0 // 7% approximate
    let equityFund = 0 // 12% approximate

    for (let i = 0; i <= years; i++) {
      if (i > 0) {
        bankDeposit = 0
        equityFund = 0
        // Simple compounding for monthly contributions for the i-th year
        const months = i * 12
        for (let m = 0; m < months; m++) {
          bankDeposit = (bankDeposit + monthlyContribution) * (1 + 0.07 / 12)
          equityFund = (equityFund + monthlyContribution) * (1 + 0.12 / 12)
        }
      }
      data.push({
        year: i,
        'Bank Deposit (7%)': Math.round(bankDeposit),
        'Equity Fund (12%)': Math.round(equityFund),
        'Total Invested': monthlyContribution * 12 * i,
      })
    }
    return data
  }

  const data = generateData()

  return (
    <div className="not-prose my-8 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-6 dark:border-zinc-700/40 dark:bg-zinc-800/30">
      <h3 className="mb-4 text-xl font-bold text-zinc-800 dark:text-zinc-100">
        The Cost of Delayed Investing
      </h3>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Monthly Contribution: ₹{monthlyContribution.toLocaleString('en-IN')}
          </label>
          <input
            type="range"
            min="5000"
            max="100000"
            step="5000"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full accent-teal-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Time Horizon: {years} Years
          </label>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-teal-500"
          />
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
            <XAxis
              dataKey="year"
              stroke={c.axis}
              tick={{ fill: c.axis, fontSize: 12 }}
              label={{
                value: 'Years',
                position: 'insideBottomRight',
                offset: -10,
                fill: c.axis,
              }}
            />
            <YAxis
              stroke={c.axis}
              tick={{ fill: c.axis, fontSize: 12 }}
              tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
              width={80}
            />
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              labelFormatter={(label) => `Year ${label}`}
              contentStyle={{
                backgroundColor: c.tooltipBg,
                border: `1px solid ${c.tooltipBorder}`,
                borderRadius: '0.5rem',
                color: c.tooltipText,
              }}
              labelStyle={{ color: c.tooltipText }}
              itemStyle={{ color: c.tooltipText }}
              cursor={{ stroke: c.axis, strokeDasharray: '3 3' }}
            />
            <Legend wrapperStyle={{ color: c.legend, fontSize: 13 }} />
            <Line
              type="monotone"
              dataKey="Equity Fund (12%)"
              stroke={c.equity}
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Bank Deposit (7%)"
              stroke={c.deposit}
              strokeWidth={3}
              dot={false}
            />
            {/* Contributed capital. It was already being computed into every
                datum and then never drawn; it is the baseline that makes the
                other two lines legible as *growth* rather than as savings. */}
            <Line
              type="monotone"
              dataKey="Total Invested"
              stroke={c.invested}
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        Over {years} years, the 5% difference in return creates a gap of{' '}
        <strong className="font-semibold text-teal-600 dark:text-teal-400">
          ₹
          {(
            data[years]['Equity Fund (12%)'] - data[years]['Bank Deposit (7%)']
          ).toLocaleString('en-IN')}
        </strong>
        . Modest return differences compound exponentially over time.
      </p>
    </div>
  )
}
