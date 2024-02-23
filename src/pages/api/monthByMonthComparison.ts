// pages/api/monthByMonthComparison.ts

import { monthByMonthComparison } from "@/lib/logic";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    monthlyPaymentFirstPeriod,
    monthlyPaymentSubsequent,
    monthlyRent,
    mortgageTermYears,
    loanAmount,
    interestRateFirstPeriod,
    interestRateSubsequent,
    fixedInterestDurationYears,
  } = req.query;

  const result = monthByMonthComparison(
    Number(monthlyPaymentFirstPeriod),
    Number(monthlyPaymentSubsequent),
    Number(monthlyRent),
    Number(mortgageTermYears),
    Number(loanAmount),
    Number(interestRateFirstPeriod) / 100, // Assuming percentage input
    Number(interestRateSubsequent) / 100, // Assuming percentage input
    Number(fixedInterestDurationYears)
  );

  res.status(200).json(result);
}
