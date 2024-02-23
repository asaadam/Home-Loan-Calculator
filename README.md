This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Mortgage Calculations API Documentation

## Overview

This API provides two main functionalities related to mortgage calculations:

1. **Calculate Mortgage Payments**: Calculates the initial monthly mortgage payment, subsequent monthly payment, and total loan amount based on input parameters.
2. **Month-by-Month Comparison**: Provides a detailed month-by-month comparison of mortgage payments, interest, principal, and savings over the term of the mortgage.

## API Endpoints

### 1. Calculate Mortgage Payments

- **URL**: `/api/calculateMortgagePayments`
- **Method**: `GET`
- **Query Parameters**:

  | Parameter                    | Type   | Description                                                        | Example |
  | ---------------------------- | ------ | ------------------------------------------------------------------ | ------- |
  | `propertyPrice`              | Number | The total price of the property.                                   | 300000  |
  | `downPaymentPercentage`      | Number | The percentage of the down payment relative to the property price. | 20      |
  | `interestRateFirstPeriod`    | Number | The annual interest rate for the initial period (percentage).      | 3.5     |
  | `interestRateSubsequent`     | Number | The annual interest rate for the subsequent period (percentage).   | 4.0     |
  | `mortgageTermYears`          | Number | The total term of the mortgage in years.                           | 30      |
  | `fixedInterestDurationYears` | Number | The number of years the initial interest rate is fixed.            | 5       |

- **Success Response**:

  - **Code**: 200
  - **Content**: `[ monthlyPaymentFirstPeriod, monthlyPaymentSubsequent, loanAmount ]`
  - **Example**: `[1027.85, 1100.65, 240000]`

- **Error Response**:
  - **Code**: 400 BAD REQUEST
  - **Content**: `{ error: "Invalid parameters" }`

### 2. Month-by-Month Comparison

- **URL**: `/api/monthByMonthComparison`
- **Method**: `GET`
- **Query Parameters**:

  | Parameter                    | Type   | Description                                                        | Example |
  | ---------------------------- | ------ | ------------------------------------------------------------------ | ------- |
  | `monthlyPaymentFirstPeriod`  | Number | The monthly mortgage payment during the initial fixed-rate period. | 1027.85 |
  | `monthlyPaymentSubsequent`   | Number | The monthly mortgage payment after the initial period ends.        | 1100.65 |
  | `monthlyRent`                | Number | The monthly rent for comparison purposes.                          | 800     |
  | `mortgageTermYears`          | Number | The total term of the mortgage in years.                           | 30      |
  | `loanAmount`                 | Number | The initial amount of the loan after down payment.                 | 240000  |
  | `interestRateFirstPeriod`    | Number | The annual interest rate for the initial period (percentage).      | 3.5     |
  | `interestRateSubsequent`     | Number | The annual interest rate for the subsequent period (percentage).   | 4.0     |
  | `fixedInterestDurationYears` | Number | The number of years the initial interest rate is fixed.            | 5       |

- **Success Response**:

  - **Code**: 200
  - **Content**: `[{ month, monthlyMortgagePayment, principalForTheMonth, interestForTheMonth, totalRentAndSavings, difference }, ..., totalPrincipalPaid, totalInterestPaid, totalRentAndSavingsPaid]`
  - **Example**: `[{ month: 1, monthlyMortgagePayment: 1027.85, principalForTheMonth: 400, interestForTheMonth: 627.85, totalRentAndSavings: 1200, difference: -172.15 }, ..., 240000, 300000, 360000]`

- **Error Response**:
  - **Code**: 400 BAD REQUEST
  - **Content**: `{ error: "Invalid parameters" }`

## Notes

- All monetary values are in USD.
- The interest rates (`interestRateFirstPeriod` and `interestRateSubsequent`) should be provided as percentages (e.g., `3.5` for 3.5%).
- The `downPaymentPercentage` is also expected as a percentage of the property price.
- Ensure that all query parameters are properly URL-encoded when making requests.
