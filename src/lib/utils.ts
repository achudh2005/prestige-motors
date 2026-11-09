export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatMileage(miles: number): string {
  return `${formatNumber(miles)} miles`;
}

export function calculateMonthlyPayment(
  principal: number,
  annualInterestRatePercent: number = 5.99,
  termMonths: number = 60,
  downPayment: number = 0
): number {
  const loanAmount = Math.max(0, principal - downPayment);
  if (loanAmount === 0) return 0;
  const monthlyRate = annualInterestRatePercent / 100 / 12;
  if (monthlyRate === 0) return loanAmount / termMonths;
  const monthly = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
  return Math.round(monthly);
}
