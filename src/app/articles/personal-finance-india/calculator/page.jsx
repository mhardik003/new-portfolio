import { SalaryCalculators } from '@/components/SalaryCalculators'

export const metadata = {
  title: 'Salary calculators',
  description:
    'Work out in-hand pay from a CTC, compare the old and new tax regimes at your own numbers, project an EPF corpus, and check gratuity, all at FY 2026-27 rates.',
}

export default function CalculatorPage() {
  return (
    <>
      <h1>Salary calculators</h1>
      <p>
        <em>
          The previous chapter works one salary through by hand. This one does
          it with your numbers.
        </em>
      </p>
      <p>
        Everything here applies the FY 2026-27 rules set out in{' '}
        <a href="/articles/personal-finance-india/tax-regimes">
          Old regime vs new regime
        </a>{' '}
        and{' '}
        <a href="/articles/personal-finance-india/epf-eps-form-11">
          EPF, EPS, Form 11 and gratuity
        </a>
        : the seven-slab new regime with its ₹60,000 rebate and marginal relief,
        the four-slab old regime, surcharge with marginal relief, and 4% cess.
        Nothing is sent anywhere; it all runs in your browser.
      </p>

      <SalaryCalculators />

      <h2>What the first calculator is doing</h2>
      <p>
        It splits your CTC the way an Indian payroll does, then taxes the result
        twice (once under each regime) and reports the monthly credit to your
        bank account under both.
      </p>
      <ul>
        <li>
          <strong>Basic</strong> defaults to 50% of CTC, the floor the Labour
          Codes have required since 21 November 2025.
        </li>
        <li>
          <strong>
            Employer PF, gratuity provision, employer NPS and insurance premiums
          </strong>{' '}
          are subtracted from CTC before the special allowance is worked out,
          because none of them reach your bank account.
        </li>
        <li>
          <strong>Employer NPS</strong> is excluded from taxable salary in both
          regimes, up to 14% of Basic, under Section 124(2).
        </li>
        <li>
          <strong>HRA exemption</strong> is the least of actual HRA, rent minus
          10% of Basic, and 50% or 40% of Basic. It applies only in the old
          regime.
        </li>
        <li>
          <strong>Break-even</strong> is solved numerically: the deduction total
          at which the old regime produces exactly the new regime&apos;s tax.
          Claim more than that and the old regime wins.
        </li>
      </ul>

      <h2>What it deliberately does not model</h2>
      <p>
        Variable pay and joining bonuses, which are taxable in the year received
        and distort a monthly figure. Capital gains, including RSU sales, which
        are taxed separately and may trigger advance tax. Perquisites valued
        under the Rules, such as an employer-provided car or accommodation. And
        any state&apos;s professional tax other than the figure you enter.
      </p>
      <p>
        Treat the output as an estimate accurate to the rules, not a payslip.
        Where a number matters, check it against{' '}
        <a href="/articles/personal-finance-india/numbers">the numbers page</a>{' '}
        and your own Form 130.
      </p>
    </>
  )
}
