export interface PricingTier {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  limits: string;
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    priceNote: "forever",
    features: [
      "Overall score & grade",
      "Pass/fail verdict",
      "Critical issue flag",
      "Issue count by severity",
      "5 requests per day",
    ],
    limits: "5 requests/day",
    cta: "Get Free Key",
    ctaHref: "#",
  },
  {
    name: "Pro",
    price: "$29",
    priceNote: "/mo",
    features: [
      "Everything in Free",
      "Detailed issues with recommendations",
      "Guideline URLs for each issue",
      "Full category breakdowns",
      "Score per category",
      "500 requests per day",
    ],
    limits: "500 requests/day",
    cta: "Start Free Trial",
    ctaHref: "#",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$79",
    priceNote: "/mo",
    features: [
      "Everything in Pro",
      "2,000 requests per day",
      "Webhook notifications",
      "Team API key management",
      "Priority support",
      "Dedicated account manager",
    ],
    limits: "2,000 requests/day",
    cta: "Contact Sales",
    ctaHref: "mailto:team@devcheck.app",
  },
];
