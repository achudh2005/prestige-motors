export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface FinanceResult {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  loanAmount: number;
  amortizationSchedule: AmortizationRow[];
}

export function calculateDetailedFinance(
  vehiclePrice: number,
  downPayment: number,
  tradeInAllowance: number,
  termMonths: number,
  annualInterestRatePercent: number
): FinanceResult {
  const loanAmount = Math.max(0, vehiclePrice - downPayment - tradeInAllowance);
  if (loanAmount === 0 || termMonths === 0) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalCost: vehiclePrice,
      loanAmount: 0,
      amortizationSchedule: []
    };
  }

  const monthlyRate = annualInterestRatePercent / 100 / 12;
  let monthlyPayment = 0;

  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / termMonths;
  } else {
    monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
  }

  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;
  let totalInterest = 0;

  for (let m = 1; m <= termMonths; m++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance = Math.max(0, balance - principal);
    totalInterest += interest;

    if (m <= 12 || m % 12 === 0 || m === termMonths) {
      schedule.push({
        month: m,
        payment: Math.round(monthlyPayment),
        principal: Math.round(principal),
        interest: Math.round(interest),
        balance: Math.round(balance)
      });
    }
  }

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(vehiclePrice + totalInterest),
    loanAmount: Math.round(loanAmount),
    amortizationSchedule: schedule
  };
}

export function estimateTradeInValue(
  make: string,
  model: string,
  year: number,
  mileage: number,
  condition: 'excellent' | 'very_good' | 'good' | 'fair'
): { low: number; high: number; baseReference: number } {
  // Approximate luxury vehicle depreciation curve
  const currentYear = new Date().getFullYear();
  const age = Math.max(0, currentYear - year);

  // Baseline luxury benchmark MSRP
  let estimatedOriginalMsrp = 220000;
  const lowerMake = make.toLowerCase();
  if (lowerMake.includes('ferrari') || lowerMake.includes('rolls-royce')) {
    estimatedOriginalMsrp = 380000;
  } else if (lowerMake.includes('bentley') || lowerMake.includes('aston')) {
    estimatedOriginalMsrp = 280000;
  } else if (lowerMake.includes('porsche')) {
    estimatedOriginalMsrp = 200000;
  }

  // Age depreciation (typically 12% per year)
  let depreciated = estimatedOriginalMsrp * Math.pow(0.88, age);

  // Mileage adjustment (standard 6,000 miles/yr for exotics)
  const expectedMileage = age * 6000;
  const mileageDiff = mileage - expectedMileage;
  const mileagePenalty = (mileageDiff / 1000) * 1200;
  depreciated = Math.max(50000, depreciated - mileagePenalty);

  // Condition multipliers
  const conditionMultipliers = {
    excellent: 1.08,
    very_good: 1.0,
    good: 0.92,
    fair: 0.82
  };

  const adjusted = depreciated * conditionMultipliers[condition];
  const low = Math.round((adjusted * 0.94) / 500) * 500;
  const high = Math.round((adjusted * 1.05) / 500) * 500;

  return {
    low: Math.max(25000, low),
    high: Math.max(30000, high),
    baseReference: Math.round(adjusted)
  };
}
