/**
 * Single source of truth for Indian income tax, FY 2026-27 (Tax Year 2026-27).
 *
 * Every widget in the book imports its arithmetic from here — the salary
 * calculators and the tax-regime slider on the landing page both call these
 * functions rather than carrying slabs of their own. That rule exists because
 * it was broken once: the slider shipped with a private copy of the slab table
 * that was two Budgets out of date (3/6/9/12/15L slabs, ₹7,00,000 rebate), so
 * it overstated new-regime tax by up to ₹1.2 lakh and pushed readers toward the
 * old regime — the opposite of what the chapters say.
 *
 * If the Budget changes, change it here and nowhere else. Do not re-declare a
 * slab, a surcharge band, a rebate or a standard deduction in a component.
 */

/* ----------------------------------------------------------------- tax core */
/* FY 2026-27 (Tax Year 2026-27). Rules mirror the Tax regimes chapter. */

export const NEW_SLABS = [
  [400000, 0],
  [800000, 0.05],
  [1200000, 0.1],
  [1600000, 0.15],
  [2000000, 0.2],
  [2400000, 0.25],
  [Infinity, 0.3],
]

export const OLD_SLABS = [
  [250000, 0],
  [500000, 0.05],
  [1000000, 0.2],
  [Infinity, 0.3],
]

export const SURCHARGE_BANDS = [5000000, 10000000, 20000000, 50000000]
export const SURCHARGE_NEW = [0.1, 0.15, 0.25, 0.25]
export const SURCHARGE_OLD = [0.1, 0.15, 0.25, 0.37]

export const STD_DEDUCTION = { new: 75000, old: 50000 }

export function slabTax(income, slabs) {
  let tax = 0
  let floor = 0
  for (const [cap, rate] of slabs) {
    if (income <= floor) break
    tax += (Math.min(income, cap) - floor) * rate
    floor = cap
  }
  return tax
}

/** Slab tax after the section 156 rebate and its marginal relief. */
export function taxAfterRebate(income, regime) {
  let tax = slabTax(income, regime === 'new' ? NEW_SLABS : OLD_SLABS)

  if (regime === 'new') {
    if (income <= 1200000) return Math.max(0, tax - 60000)
    // Marginal relief: tax cannot exceed the amount by which income tops ₹12L.
    return Math.min(tax, income - 1200000)
  }

  if (income <= 500000) return Math.max(0, tax - 12500)
  return tax
}

/** Tax before cess, including surcharge and surcharge marginal relief. */
export function taxBeforeCess(
  income,
  regime,
  band = SURCHARGE_BANDS.length - 1,
) {
  const base = taxAfterRebate(income, regime)
  const rates = regime === 'new' ? SURCHARGE_NEW : SURCHARGE_OLD

  for (let i = band; i >= 0; i--) {
    const threshold = SURCHARGE_BANDS[i]
    if (income > threshold) {
      let surcharge = base * rates[i]
      // At the threshold itself the lower band applies, so recursion terminates.
      const atThreshold = taxBeforeCess(threshold, regime, i - 1)
      const ceiling = atThreshold + (income - threshold)
      if (base + surcharge > ceiling) surcharge = Math.max(0, ceiling - base)
      return base + surcharge
    }
  }
  return base
}

export function totalTax(income, regime) {
  const beforeCess = taxBeforeCess(Math.max(0, income), regime)
  return beforeCess * 1.04
}

/** Deductions needed under the old regime to match the new regime's tax. */
export function breakEvenDeductions(gross) {
  const target = taxBeforeCess(Math.max(0, gross - STD_DEDUCTION.new), 'new')
  let lo = 0
  let hi = gross
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (taxBeforeCess(Math.max(0, gross - mid), 'old') > target) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}
