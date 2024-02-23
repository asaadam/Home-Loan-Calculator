// pages/api/calculateMortgagePayments.ts

import { calculateMortgagePayments } from "@/lib/logic";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    propertyPrice,
    downPaymentPercentage,
    interestRateFirstPeriod,
    interestRateSubsequent,
    mortgageTermYears,
    fixedInterestDurationYears,
  } = req.query;

  const result = calculateMortgagePayments(
    Number(propertyPrice),
    Number(downPaymentPercentage) / 100, // Assuming percentage input
    Number(interestRateFirstPeriod) / 100, // Assuming percentage input
    Number(interestRateSubsequent) / 100, // Assuming percentage input
    Number(mortgageTermYears),
    Number(fixedInterestDurationYears)
  );

  res.status(200).json(result);
}
