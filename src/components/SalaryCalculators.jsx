'use client'

import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { STD_DEDUCTION, breakEvenDeductions, totalTax } from '@/lib/tax'

/* ------------------------------------------------------------------ helpers */

const inr = (n) =>
  '₹' + Math.round(Number.isFinite(n) ? n : 0).toLocaleString('en-IN')

const pct = (n) => `${(n * 100).toFixed(1)}%`

function Field({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
        {label}
      </span>
      {children}
      {hint && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</span>
      )}
    </label>
  )
}

const inputClass =
  'w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 tabular-nums shadow-sm outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'

function NumberField({ label, hint, value, onChange, min = 0, max, step = 1 }) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="number"
        inputMode="numeric"
        className={inputClass}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const next = e.target.value === '' ? 0 : Number(e.target.value)
          onChange(Number.isFinite(next) ? next : 0)
        }}
      />
    </Field>
  )
}

function SelectField({ label, hint, value, onChange, options }) {
  return (
    <Field label={label} hint={hint}>
      <select
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

function Row({ label, value, strong, muted, indent }) {
  return (
    <div
      className={clsx(
        'flex items-baseline justify-between gap-4 py-1.5',
        indent && 'pl-4',
      )}
    >
      <span
        className={clsx(
          'text-sm',
          strong
            ? 'font-semibold text-zinc-800 dark:text-zinc-100'
            : muted
              ? 'text-zinc-500 dark:text-zinc-400'
              : 'text-zinc-600 dark:text-zinc-300',
        )}
      >
        {label}
      </span>
      <span
        className={clsx(
          'shrink-0 text-sm tabular-nums',
          strong
            ? 'font-semibold text-zinc-900 dark:text-zinc-50'
            : 'text-zinc-700 dark:text-zinc-300',
        )}
      >
        {value}
      </span>
    </div>
  )
}

function Panel({ title, children, tone = 'default' }) {
  return (
    <div
      className={clsx(
        'rounded-xl border p-4',
        tone === 'accent'
          ? 'border-teal-500/30 bg-teal-50/50 dark:border-teal-400/20 dark:bg-teal-400/5'
          : 'border-zinc-200 dark:border-zinc-700/60',
      )}
    >
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        {title}
      </h3>
      {children}
    </div>
  )
}

function Note({ label = 'Note', children }) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700/60">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
        {children}
      </p>
    </div>
  )
}

/* --------------------------------------------------- 1. salary → in-hand */

function SalaryBreakdown() {
  const [ctc, setCtc] = useState(1800000)
  const [basicPct, setBasicPct] = useState(50)
  const [hraPct, setHraPct] = useState(40)
  const [employerPf, setEmployerPf] = useState('full')
  const [npsPct, setNpsPct] = useState(0)
  const [benefits, setBenefits] = useState(12000)
  const [gratuityInCtc, setGratuityInCtc] = useState('yes')
  const [profTax, setProfTax] = useState(2400)
  const [city, setCity] = useState('metro')
  const [rent, setRent] = useState(30000)
  const [d80c, setD80c] = useState(150000)
  const [d80d, setD80d] = useState(25000)
  const [dNps, setDNps] = useState(50000)
  const [dHome, setDHome] = useState(0)

  const r = useMemo(() => {
    const basic = (ctc * basicPct) / 100
    const hra = (basic * hraPct) / 100
    const employerPfAmt =
      employerPf === 'full' ? basic * 0.12 : 15000 * 0.12 * 12
    const gratuity = gratuityInCtc === 'yes' ? basic * 0.0481 : 0
    const employerNps = (basic * Math.min(npsPct, 14)) / 100
    const special =
      ctc - basic - hra - employerPfAmt - gratuity - employerNps - benefits

    const gross = basic + hra + special
    const employeePf = basic * 0.12

    // New regime — HRA fully taxable, no Chapter VI-A beyond employer NPS.
    const newTaxable = Math.max(0, gross - STD_DEDUCTION.new)
    const newTax = totalTax(newTaxable, 'new')

    // Old regime — HRA exemption is the least of three.
    const annualRent = rent * 12
    const hraExempt = Math.max(
      0,
      Math.min(
        hra,
        annualRent - 0.1 * basic,
        (basic * (city === 'metro' ? 50 : 40)) / 100,
      ),
    )
    const oldDeductions =
      STD_DEDUCTION.old +
      hraExempt +
      Math.min(d80c, 150000) +
      Math.min(d80d, 100000) +
      Math.min(dNps, 50000) +
      Math.min(dHome, 200000) +
      profTax
    const oldTaxable = Math.max(0, gross - oldDeductions)
    const oldTax = totalTax(oldTaxable, 'old')

    const inHand = (tax) => (gross - employeePf - tax - profTax) / 12
    const better = newTax <= oldTax ? 'new' : 'old'

    return {
      basic,
      hra,
      special,
      gross,
      employerPfAmt,
      employeePf,
      gratuity,
      employerNps,
      newTaxable,
      newTax,
      hraExempt,
      oldDeductions,
      oldTaxable,
      oldTax,
      newInHand: inHand(newTax),
      oldInHand: inHand(oldTax),
      better,
      saving: Math.abs(newTax - oldTax),
      breakEven: breakEvenDeductions(gross),
      valid: special >= 0,
    }
  }, [
    ctc,
    basicPct,
    hraPct,
    employerPf,
    npsPct,
    benefits,
    gratuityInCtc,
    profTax,
    city,
    rent,
    d80c,
    d80d,
    dNps,
    dHome,
  ])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Panel title="Your offer">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Annual CTC"
              hint="As written in the offer letter"
              value={ctc}
              onChange={setCtc}
              step={50000}
            />
            <NumberField
              label="Basic as % of CTC"
              hint="Labour Codes require at least 50%"
              value={basicPct}
              onChange={setBasicPct}
              min={20}
              max={100}
            />
            <NumberField
              label="HRA as % of Basic"
              value={hraPct}
              onChange={setHraPct}
              min={0}
              max={100}
            />
            <SelectField
              label="Employer PF"
              hint="Ask HR; worth ₹86,400/yr at a ₹75k Basic"
              value={employerPf}
              onChange={setEmployerPf}
              options={[
                { value: 'full', label: '12% of full Basic' },
                { value: 'ceiling', label: 'Capped at ₹15,000 wage' },
              ]}
            />
            <NumberField
              label="Employer NPS, % of Basic"
              hint="Max 14%. The only deduction left in the new regime"
              value={npsPct}
              onChange={setNpsPct}
              min={0}
              max={14}
            />
            <NumberField
              label="Insurance etc. in CTC"
              hint="Group health, term life, accident premiums"
              value={benefits}
              onChange={setBenefits}
              step={1000}
            />
            <SelectField
              label="Gratuity shown in CTC"
              value={gratuityInCtc}
              onChange={setGratuityInCtc}
              options={[
                { value: 'yes', label: 'Yes (4.81% of Basic)' },
                { value: 'no', label: 'No' },
              ]}
            />
            <NumberField
              label="Professional tax / year"
              hint="State-specific; ₹2,400 in Karnataka"
              value={profTax}
              onChange={setProfTax}
              step={100}
            />
          </div>
        </Panel>

        <Panel title="Only affects the old regime">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Monthly rent paid"
              value={rent}
              onChange={setRent}
              step={1000}
            />
            <SelectField
              label="City, for HRA"
              hint="50%: Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune, Ahmedabad"
              value={city}
              onChange={setCity}
              options={[
                { value: 'metro', label: 'One of the 8 (50%)' },
                { value: 'other', label: 'Anywhere else (40%)' },
              ]}
            />
            <NumberField
              label="Section 123 (80C)"
              hint={`Max ₹1,50,000. Your EPF alone is ${inr(r.employeePf)}`}
              value={d80c}
              onChange={setD80c}
              step={10000}
            />
            <NumberField
              label="Section 126 (80D)"
              hint="Health insurance. Max ₹1,00,000"
              value={d80d}
              onChange={setD80d}
              step={5000}
            />
            <NumberField
              label="Section 124(1B): NPS"
              hint="Your own contribution. Max ₹50,000"
              value={dNps}
              onChange={setDNps}
              step={5000}
            />
            <NumberField
              label="Home loan interest"
              hint="Self-occupied. Max ₹2,00,000"
              value={dHome}
              onChange={setDHome}
              step={10000}
            />
          </div>
        </Panel>
      </div>

      <div className="flex flex-col gap-4">
        {!r.valid && (
          <Note>
            These percentages add up to more than the CTC, so the special
            allowance has gone negative. Lower the Basic or HRA percentage.
          </Note>
        )}

        <Panel title="Where the CTC goes" tone="accent">
          <Row label="Basic" value={inr(r.basic)} />
          <Row label="HRA" value={inr(r.hra)} />
          <Row label="Special allowance" value={inr(r.special)} />
          <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
          <Row label="Gross salary" value={inr(r.gross)} strong />
          <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
          <Row label="Employer PF" value={inr(r.employerPfAmt)} muted />
          {r.employerNps > 0 && (
            <Row label="Employer NPS" value={inr(r.employerNps)} muted />
          )}
          {r.gratuity > 0 && (
            <Row label="Gratuity provision" value={inr(r.gratuity)} muted />
          )}
          <Row label="Insurance premiums" value={inr(benefits)} muted />
          <Row
            label="Never reaches your bank"
            value={inr(r.employerPfAmt + r.employerNps + r.gratuity + benefits)}
            muted
          />
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2">
          <Panel
            title={r.better === 'new' ? 'New regime: cheaper' : 'New regime'}
          >
            <Row label="Taxable income" value={inr(r.newTaxable)} />
            <Row label="Tax + cess" value={inr(r.newTax)} />
            <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
            <Row label="Monthly in-hand" value={inr(r.newInHand)} strong />
          </Panel>
          <Panel
            title={r.better === 'old' ? 'Old regime: cheaper' : 'Old regime'}
          >
            <Row label="HRA exempt" value={inr(r.hraExempt)} muted />
            <Row label="Total deductions" value={inr(r.oldDeductions)} muted />
            <Row label="Taxable income" value={inr(r.oldTaxable)} />
            <Row label="Tax + cess" value={inr(r.oldTax)} />
            <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
            <Row label="Monthly in-hand" value={inr(r.oldInHand)} strong />
          </Panel>
        </div>

        <Panel title="Verdict">
          <Row
            label={`${r.better === 'new' ? 'New' : 'Old'} regime saves`}
            value={inr(r.saving)}
            strong
          />
          <Row
            label="Deductions needed for the old regime to win"
            value={inr(r.breakEven)}
            muted
          />
          <Row label="You currently claim" value={inr(r.oldDeductions)} muted />
          <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
          <Row
            label="In-hand as a share of CTC"
            value={pct((r.newInHand * 12) / (ctc || 1))}
          />
          <Row
            label="Your EPF contribution"
            value={`${inr(r.employeePf)} / yr`}
            muted
          />
        </Panel>

        {r.employeePf > 250000 && (
          <Note>
            Your own PF contribution is above ₹2,50,000, so interest on the
            excess is taxable as income from other sources.
          </Note>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------- 2. EPF and VPF */

function EpfProjection() {
  const [basicMonthly, setBasicMonthly] = useState(75000)
  const [vpfPct, setVpfPct] = useState(0)
  const [employerPf, setEmployerPf] = useState('full')
  const [balance, setBalance] = useState(0)
  const [years, setYears] = useState(30)
  const [servedYears, setServedYears] = useState(0)
  const [rate, setRate] = useState(8.25)
  const [hike, setHike] = useState(6)

  const r = useMemo(() => {
    const i = rate / 100
    let corpus = balance
    let contributed = 0
    let basic = basicMonthly
    let firstYearEmployee = 0

    for (let y = 0; y < years; y++) {
      const employee = basic * 12 * ((12 + vpfPct) / 100)
      const employerTotal =
        employerPf === 'full' ? basic * 12 * 0.12 : 15000 * 12 * 0.12
      const eps = Math.min(employerTotal, 15000 * 12 * 0.0833)
      const employerToEpf = employerTotal - eps
      const yearly = employee + employerToEpf
      if (y === 0) firstYearEmployee = employee
      corpus = (corpus + yearly) * (1 + i)
      contributed += yearly
      basic *= 1 + hike / 100
    }

    // EPS: pensionable salary is capped at ₹15,000, service of 20 years or more
    // earns a 2-year bonus, and 10 years of service is the minimum to qualify.
    const service = servedYears + years
    const pensionableService = service >= 20 ? service + 2 : service
    const epsPension = service >= 10 ? (15000 * pensionableService) / 70 : 0

    return {
      corpus,
      contributed,
      interest: corpus - contributed - balance,
      firstYearEmployee,
      service,
      pensionableService,
      epsPension,
      epsQualifies: service >= 10,
      taxableFlag: firstYearEmployee > 250000,
    }
  }, [
    basicMonthly,
    vpfPct,
    employerPf,
    balance,
    years,
    servedYears,
    rate,
    hike,
  ])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel title="Your provident fund">
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Monthly Basic + DA"
            value={basicMonthly}
            onChange={setBasicMonthly}
            step={1000}
          />
          <NumberField
            label="VPF, extra % of Basic"
            hint="On top of the mandatory 12%. Never employer-matched"
            value={vpfPct}
            onChange={setVpfPct}
            min={0}
            max={88}
          />
          <SelectField
            label="Employer contributes"
            value={employerPf}
            onChange={setEmployerPf}
            options={[
              { value: 'full', label: '12% of full Basic' },
              { value: 'ceiling', label: 'Capped at ₹15,000 wage' },
            ]}
          />
          <NumberField
            label="Current EPF balance"
            value={balance}
            onChange={setBalance}
            step={50000}
          />
          <NumberField
            label="Years to retirement"
            value={years}
            onChange={setYears}
            min={1}
            max={45}
          />
          <NumberField
            label="EPF years already served"
            hint="Counts toward the EPS pension below"
            value={servedYears}
            onChange={setServedYears}
            min={0}
            max={45}
          />
          <NumberField
            label="Interest rate %"
            hint="8.25% declared for FY 2025-26"
            value={rate}
            onChange={setRate}
            step={0.05}
          />
          <NumberField
            label="Annual salary growth %"
            value={hike}
            onChange={setHike}
            min={0}
            max={30}
          />
        </div>
      </Panel>

      <div className="flex flex-col gap-4">
        <Panel title="At retirement" tone="accent">
          <Row label="EPF corpus" value={inr(r.corpus)} strong />
          <Row label="Total contributed" value={inr(r.contributed)} muted />
          <Row label="Interest earned" value={inr(r.interest)} muted />
          <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
          <Row
            label="Total EPS service"
            value={`${r.service} yrs${r.service >= 20 ? ' (+2 bonus)' : ''}`}
            muted
          />
          <Row
            label="EPS pension, per month"
            value={r.epsQualifies ? inr(r.epsPension) : 'Not eligible'}
            muted
          />
        </Panel>

        <Note label="Why the pension looks small">
          EPS takes 8.33% of wages capped at ₹15,000, so at most ₹1,250 a month
          goes in regardless of what you earn. The pension is{' '}
          {r.epsQualifies
            ? 'pensionable salary × service ÷ 70, on a ₹15,000 pensionable salary'
            : 'nil below 10 years of service; you withdraw the EPS corpus instead'}
          . Neither VPF nor a Para 26(6) declaration increases it.
        </Note>

        {r.taxableFlag && (
          <Note>
            Your own contribution in year one is {inr(r.firstYearEmployee)},
            above the ₹2,50,000 threshold. Interest on the excess is taxable,
            and EPFO deducts TDS at 10% where PAN is seeded.
          </Note>
        )}
      </div>
    </div>
  )
}

/* --------------------------------------------------------- 3. gratuity */

function Gratuity() {
  const [basicMonthly, setBasicMonthly] = useState(75000)
  const [years, setYears] = useState(6)
  const [months, setMonths] = useState(0)

  const r = useMemo(() => {
    const counted = months > 6 ? years + 1 : years
    const amount = (basicMonthly * 15 * counted) / 26
    return {
      counted,
      amount,
      eligible: years >= 5,
      exempt: Math.min(amount, 2000000),
      taxable: Math.max(0, amount - 2000000),
    }
  }, [basicMonthly, years, months])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel title="At the time you leave">
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Last drawn Basic + DA, monthly"
            value={basicMonthly}
            onChange={setBasicMonthly}
            step={1000}
          />
          <NumberField
            label="Completed years"
            value={years}
            onChange={setYears}
            min={0}
            max={45}
          />
          <NumberField
            label="Additional months"
            hint="More than 6 rounds the year up"
            value={months}
            onChange={setMonths}
            min={0}
            max={11}
          />
        </div>
      </Panel>

      <div className="flex flex-col gap-4">
        <Panel title="Gratuity payable" tone="accent">
          <Row label="Years counted" value={String(r.counted)} muted />
          <Row
            label="Formula"
            value={`${inr(basicMonthly)} × 15/26 × ${r.counted}`}
            muted
          />
          <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
          <Row
            label={r.eligible ? 'Amount' : 'Amount if you qualified'}
            value={inr(r.amount)}
            strong
          />
          <Row label="Exempt from tax" value={inr(r.exempt)} muted />
          {r.taxable > 0 && (
            <Row label="Taxable" value={inr(r.taxable)} muted />
          )}
        </Panel>

        {!r.eligible && (
          <Note>
            Gratuity needs 5 years of continuous service with the same employer,
            so at {years} year{years === 1 ? '' : 's'} nothing is payable. The
            requirement is waived on death or permanent disablement, and the
            Social Security Code reduces it to one year for fixed-term
            employees.
          </Note>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- shell */

const TABS = [
  { id: 'salary', label: 'CTC to in-hand', Component: SalaryBreakdown },
  { id: 'epf', label: 'EPF & VPF', Component: EpfProjection },
  { id: 'gratuity', label: 'Gratuity', Component: Gratuity },
]

export function SalaryCalculators() {
  const [tab, setTab] = useState('salary')

  return (
    <div className="not-prose">
      <div
        role="tablist"
        aria-label="Calculators"
        className="mb-6 flex flex-wrap gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-700"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={clsx(
              'rounded-full px-4 py-1.5 text-sm font-medium transition',
              // Dark ink on the teal chip: white on teal-500 measures 2.49,
              // below the 4.5 needed for body text. zinc-900 gives 7.33 and
              // keeps the site's accent colour unchanged.
              tab === t.id
                ? 'bg-teal-500 text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Every panel stays mounted so switching tabs never discards what you
          have typed into another one. */}
      {TABS.map(({ id, Component }) => (
        <div
          key={id}
          id={`panel-${id}`}
          role="tabpanel"
          aria-labelledby={`tab-${id}`}
          hidden={tab !== id}
          className={clsx(tab !== id && 'hidden')}
        >
          <Component />
        </div>
      ))}

      <p className="mt-8 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        FY 2026-27 rates. Slabs, the ₹60,000 rebate and its marginal relief,
        surcharge with marginal relief, and 4% cess are all applied. Estimates
        only; your payslip is the authority.
      </p>
    </div>
  )
}
