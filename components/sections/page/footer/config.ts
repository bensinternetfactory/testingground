export interface FooterLinkItem {
  label: string;
  href?: string;
}

export interface FooterColumn {
  id: string;
  heading: string;
  links: FooterLinkItem[];
}

export interface FooterContactLink {
  label: string;
  href: string;
}

export interface FooterLogo {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FooterConfig {
  logo: FooterLogo;
  columns: FooterColumn[];
  badges: string[];
  contacts: FooterContactLink[];
  legalLinks: FooterLinkItem[];
  companyName: string;
}

export const FOOTER_CONFIG: FooterConfig = {
  logo: {
    href: "/",
    src: "/brand-assets/logo/towloans-light-logo.svg",
    alt: "TowLoans",
    width: 191,
    height: 28,
  },
  columns: [
    {
      id: "financing",
      heading: "Financing",
      links: [
        { label: "Rollback", href: "/rollback-financing" },
        { label: "Wrecker", href: "/wrecker-financing" },
        { label: "Rotator", href: "/rotator-financing" },
        { label: "Used Trucks", href: "/used-tow-truck-financing" },
      ],
    },
    {
      id: "leasing",
      heading: "Leasing",
      links: [
        { label: "Tow Truck Leasing", href: "/tow-truck-leasing" },
        {
          label: "Lease vs Loan",
          href: "/resources/tow-truck-lease-vs-loan",
        },
      ],
    },
    {
      id: "programs",
      heading: "Programs",
      links: [
        { label: "Fleet Expansion", href: "/fleet-financing" },
        { label: "Zero Down", href: "/zero-down-tow-truck-financing" },
        {
          label: "Deferred Pay",
          href: "/deferred-payment-tow-truck-financing",
        },
        { label: "Private Party", href: "/" },
      ],
    },
    {
      id: "resources",
      heading: "Resources",
      links: [
        { label: "Calculator", href: "/tow-truck-calculator" },
        {
          label: "Cost Guide",
          href: "/resources/how-much-does-a-tow-truck-cost",
        },
        {
          label: "ROI + Payment Calculator",
          href: "/tow-truck-calculator?angle=roi",
        },
        {
          label: "Lease vs Loan",
          href: "/resources/tow-truck-lease-vs-loan",
        },
        {
          label: "Financing Companies",
          href: "/resources/tow-truck-financing-companies",
        },
      ],
    },
  ],
  badges: ["BBB Accredited", "SSL Secured", "Trusted by 340+ Operators"],
  contacts: [
    { label: "(888) 555-0199", href: "tel:+18885550199" },
    { label: "info@towloans.com", href: "mailto:info@towloans.com" },
  ],
  legalLinks: [{ label: "Privacy" }, { label: "Terms" }],
  companyName: "TowLoans",
};
