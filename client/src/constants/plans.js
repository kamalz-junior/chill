export const plans = [
  {
    id: "plan_individual",
    name: "Individual",
    description: "Affordable streaming for one user with standard quality",
    price: {
      monthly: 49990,
      currency: "IDR",
    },
    limit: {
      devices: 1,
      resolution: "HD",
      downloads: "Unlimited",
    },
    features: [
      "Ad-supported streaming",
      "Mobile and web access",
      "Basic library access",
    ],
  },
  {
    id: "plan_duo",
    name: "Duo",
    description: "FHD streaming for small households or with friends",
    price: {
      monthly: 79990,
      currency: "IDR",
    },
    limit: {
      devices: 2,
      resolution: "FHD",
      downloads: "Unlimited",
    },
    features: [
      "Add-fre streaming",
      "FHD quality",
      "Offline downloads",
      "Multi-device support",
    ],
  },
  {
    id: "plan_family",
    name: "Family",
    description: "Ultimate 4K experience for families or enthusiasts",
    price: {
      monthly: 159990,
      currency: "IDR",
    },
    limit: {
      devices: 5,
      resolution: "4K",
      downloads: "Unlimited",
    },
    features: [
      "Add-fre streaming",
      "FHD quality",
      "Offline downloads",
      "Multi-device support",
      "Exclusice content access",
    ],
  },
];
