import { pmt, fv } from "financial";

interface MonthlyComparison {
  month: number;
  monthlyMortgagePayment: number;
  principalForTheMonth: number;
  interestForTheMonth: number;
  totalRentAndSavings: number;
  difference: number;
}

function calculateMortgagePayments(
  propertyPrice: number,
  downPaymentPercentage: number,
  interestRateFirstPeriod: number,
  interestRateSubsequent: number,
  mortgageTermYears: number,
  fixedInterestDurationYears: number
): [number, number, number] {
  const loanAmount: number = propertyPrice * (1 - downPaymentPercentage);
  const mortgageTermMonths: number = mortgageTermYears * 12;
  const monthlyInterestFirstPeriod: number = interestRateFirstPeriod / 12;
  const monthlyPaymentFirstPeriod: number = pmt(
    monthlyInterestFirstPeriod,
    mortgageTermMonths,
    -loanAmount
  );

  let monthlyPaymentSubsequent: number = monthlyPaymentFirstPeriod;
  if (fixedInterestDurationYears !== mortgageTermYears) {
    const fixedInterestDurationMonths: number = fixedInterestDurationYears * 12;
    const remainingBalanceAfterFixedPeriod: number = fv(
      monthlyInterestFirstPeriod,
      fixedInterestDurationMonths,
      monthlyPaymentFirstPeriod,
      -loanAmount
    );
    const monthlyInterestSubsequent: number = interestRateSubsequent / 12;
    monthlyPaymentSubsequent = pmt(
      monthlyInterestSubsequent,
      mortgageTermMonths - fixedInterestDurationMonths,
      -remainingBalanceAfterFixedPeriod
    );
  }

  return [monthlyPaymentFirstPeriod, monthlyPaymentSubsequent, loanAmount];
}

function monthByMonthComparison(
  monthlyPaymentFirstPeriod: number,
  monthlyPaymentSubsequent: number,
  monthlyRent: number,
  mortgageTermYears: number,
  loanAmount: number,
  interestRateFirstPeriod: number,
  interestRateSubsequent: number,
  fixedInterestDurationYears: number
): [MonthlyComparison[], number, number, number] {
  const monthlyComparison: MonthlyComparison[] = [];
  let remainingBalance: number = loanAmount;
  let totalPrincipalPaid: number = 0;
  let totalInterestPaid: number = 0;
  let totalRentAndSavingsPaid: number = 0;
  const fixedInterestDurationMonths: number = fixedInterestDurationYears * 12;
  const mortgageTermMonths: number = mortgageTermYears * 12;

  for (let month = 1; month <= mortgageTermMonths; month++) {
    const isFixedPeriod: boolean = month <= fixedInterestDurationMonths;
    const monthlyPayment: number = isFixedPeriod
      ? monthlyPaymentFirstPeriod
      : monthlyPaymentSubsequent;
    const interestRate: number = isFixedPeriod
      ? interestRateFirstPeriod
      : interestRateSubsequent;
    const monthlyInterest: number = interestRate / 12;

    const interestForTheMonth: number = remainingBalance * monthlyInterest;
    const principalForTheMonth: number = monthlyPayment - interestForTheMonth;

    remainingBalance -= principalForTheMonth;
    totalPrincipalPaid += principalForTheMonth;
    totalInterestPaid += interestForTheMonth;
    totalRentAndSavingsPaid += monthlyRent + principalForTheMonth;

    monthlyComparison.push({
      month,
      monthlyMortgagePayment: monthlyPayment,
      principalForTheMonth,
      interestForTheMonth,
      totalRentAndSavings: monthlyRent + principalForTheMonth,
      difference: monthlyPayment - (monthlyRent + principalForTheMonth),
    });
  }

  return [
    monthlyComparison,
    totalPrincipalPaid,
    totalInterestPaid,
    totalRentAndSavingsPaid,
  ];
}

export { calculateMortgagePayments, monthByMonthComparison };
