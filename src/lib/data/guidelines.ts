export interface GuidelineReference {
  section: string;
  title: string;
  url: string;
}

export const GUIDELINES: Record<string, GuidelineReference> = {
  "2.1": {
    section: "2.1",
    title: "App Completeness",
    url: "https://developer.apple.com/app-store/review/guidelines/#performance",
  },
  "2.3": {
    section: "2.3",
    title: "Accurate Metadata",
    url: "https://developer.apple.com/app-store/review/guidelines/#performance",
  },
  "2.5": {
    section: "2.5",
    title: "Software Requirements",
    url: "https://developer.apple.com/app-store/review/guidelines/#performance",
  },
  "3.1": {
    section: "3.1",
    title: "In-App Purchase",
    url: "https://developer.apple.com/app-store/review/guidelines/#business",
  },
  "4.1": {
    section: "4.1",
    title: "Copycats",
    url: "https://developer.apple.com/app-store/review/guidelines/#design",
  },
  "4.2": {
    section: "4.2",
    title: "Minimum Functionality",
    url: "https://developer.apple.com/app-store/review/guidelines/#design",
  },
  "4.3": {
    section: "4.3",
    title: "Spam",
    url: "https://developer.apple.com/app-store/review/guidelines/#design",
  },
  "5.1.1": {
    section: "5.1.1",
    title: "Data Collection and Storage",
    url: "https://developer.apple.com/app-store/review/guidelines/#legal",
  },
  "5.1.2": {
    section: "5.1.2",
    title: "Data Use and Sharing",
    url: "https://developer.apple.com/app-store/review/guidelines/#legal",
  },
  "5.2": {
    section: "5.2",
    title: "Intellectual Property",
    url: "https://developer.apple.com/app-store/review/guidelines/#legal",
  },
  "1.2": {
    section: "1.2",
    title: "User Generated Content",
    url: "https://developer.apple.com/app-store/review/guidelines/#safety",
  },
};

export const REQUIRED_REASON_APIS: Record<string, string> = {
  "NSPrivacyAccessedAPICategoryFileTimestamp":
    "File timestamp APIs — must declare a valid reason",
  "NSPrivacyAccessedAPICategorySystemBootTime":
    "System boot time APIs — must declare a valid reason",
  "NSPrivacyAccessedAPICategoryDiskSpace":
    "Disk space APIs — must declare a valid reason",
  "NSPrivacyAccessedAPICategoryActiveKeyboards":
    "Active keyboards APIs — must declare a valid reason",
  "NSPrivacyAccessedAPICategoryUserDefaults":
    "UserDefaults APIs — must declare a valid reason",
};

export const VALID_SCREENSHOT_DIMENSIONS: Record<string, { width: number; height: number }[]> = {
  "iPhone 6.7\"": [
    { width: 1290, height: 2796 },
    { width: 2796, height: 1290 },
  ],
  "iPhone 6.5\"": [
    { width: 1242, height: 2688 },
    { width: 2688, height: 1242 },
    { width: 1284, height: 2778 },
    { width: 2778, height: 1284 },
  ],
  "iPhone 5.5\"": [
    { width: 1242, height: 2208 },
    { width: 2208, height: 1242 },
  ],
  "iPad Pro 12.9\"": [
    { width: 2048, height: 2732 },
    { width: 2732, height: 2048 },
  ],
  "iPad Pro 11\"": [
    { width: 1668, height: 2388 },
    { width: 2388, height: 1668 },
  ],
};

export const APP_CATEGORIES = [
  "Books",
  "Business",
  "Developer Tools",
  "Education",
  "Entertainment",
  "Finance",
  "Food & Drink",
  "Games",
  "Graphics & Design",
  "Health & Fitness",
  "Lifestyle",
  "Magazines & Newspapers",
  "Medical",
  "Music",
  "Navigation",
  "News",
  "Photo & Video",
  "Productivity",
  "Reference",
  "Shopping",
  "Social Networking",
  "Sports",
  "Travel",
  "Utilities",
  "Weather",
] as const;

export const AGE_RATINGS = ["4+", "9+", "12+", "17+"] as const;
