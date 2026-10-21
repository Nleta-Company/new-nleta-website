export type NewsItem = {
  slug: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  source: string;
  important?: boolean;
  content: string;
};

export const latestNews: NewsItem[] = [
  {
    slug: "nleta-safety-awareness-programme-2026",
    date: "20 Oct 2026",
    category: "Latest News",
    title: "NLETA Safety Awareness Programme 2026",
    summary:
      "NLETA continues its focus on safety awareness, responsible engineering practices and public information across lift, escalator and related systems.",
    source: "NLETA",
    important: true,
    content:
      "This is temporary demonstration content for frontend testing.\n\nNLETA is using this sample article to demonstrate how a complete news article can be published on the website.\n\nThe final version can contain the complete announcement, background information, key points, applicable dates, supporting information and any official NLETA communication.\n\nThis demo article is intentionally written as sample content and must be replaced with verified NLETA information before publication.",
  },
  {
    slug: "monthly-nleta-activity-summary-october-2026",
    date: "October 2026",
    category: "Monthly News",
    title: "NLETA Monthly Activity Summary – October 2026",
    summary:
      "A sample monthly summary covering NLETA activities, technical initiatives, safety awareness and industry-related developments.",
    source: "NLETA",
    content:
      "This is temporary demonstration content for the monthly news section.\n\nA monthly article can contain a consolidated summary of activities carried out during the month, important developments, programmes, meetings, technical work and public-awareness initiatives.\n\nThe final monthly report will be populated with verified information supplied by NLETA.",
  },
  {
    slug: "lift-escalator-workplace-safety-update",
    date: "15 Oct 2026",
    category: "Safety News",
    title: "Lift, Escalator & Workplace Safety Update",
    summary:
      "Sample safety information demonstrating how NLETA can publish awareness updates, prevention guidance and important safety developments.",
    source: "NLETA",
    important: true,
    content:
      "This is temporary demonstration content for the NLETA safety news section.\n\nThe article can include safety observations, awareness guidance, preventive measures, operational precautions and other verified information related to lifts, escalators and workplaces.\n\nThe final content will be replaced with official and verified NLETA material.",
  },
  {
    slug: "safe-lift-operation-awareness",
    date: "13 Oct 2026",
    category: "Safety News",
    title: "Safe Lift Operation Awareness",
    summary:
      "A sample public-awareness article showing how practical lift safety information can be presented to visitors.",
    source: "NLETA",
    content:
      "This is temporary demonstration content.\n\nA public safety article can explain safe lift operation, appropriate passenger behaviour, emergency awareness and other preventive information.\n\nVerified NLETA guidance and approved safety material can be inserted here later.",
  },
  {
    slug: "engineering-technical-developments-2026",
    date: "10 Oct 2026",
    category: "Engineering News",
    title: "Engineering & Technical Developments",
    summary:
      "Sample engineering news covering technical developments relevant to lifts, escalators and associated systems.",
    source: "NLETA",
    content:
      "This is temporary demonstration content for the NLETA engineering news section.\n\nThe engineering section can publish technical developments, inspection-related information, engineering practices, technology updates and other relevant technical material.\n\nThe final article will use verified NLETA information.",
  },
  {
    slug: "lift-inspection-technical-awareness",
    date: "08 Oct 2026",
    category: "Engineering News",
    title: "Lift Inspection & Technical Awareness",
    summary:
      "A sample technical article demonstrating how inspection and engineering awareness information can be published in detail.",
    source: "NLETA",
    content:
      "This is temporary demonstration content.\n\nA detailed technical article can include the purpose of inspection, important observations, technical considerations and general awareness information.\n\nOfficial technical content will be added after verification.",
  },
  {
    slug: "industry-standards-regulatory-information-2026",
    date: "05 Oct 2026",
    category: "Industry / Regulatory News",
    title: "Industry Standards & Regulatory Information",
    summary:
      "Sample industry and regulatory information demonstrating how standards, policy and regulatory developments can be published.",
    source: "NLETA",
    important: true,
    content:
      "This is temporary demonstration content for the NLETA industry and regulatory news section.\n\nThis type of article can contain verified information about applicable standards, regulations, policy developments, official notices and industry guidance.\n\nNo regulatory claim in this demo should be treated as an official statement.",
  },
  {
    slug: "industry-safety-best-practices-update",
    date: "01 Oct 2026",
    category: "Industry / Regulatory News",
    title: "Industry Safety Best Practices Update",
    summary:
      "A sample industry update demonstrating how important safety practices and sector developments can be communicated.",
    source: "NLETA",
    content:
      "This is temporary demonstration content.\n\nThe final article can provide a structured overview of industry developments, safety practices and relevant official information, together with source details where applicable.\n\nVerified NLETA content will replace this sample text.",
  },
];

export type AccidentMetric = {
  label: string;
  value: string;
  note: string;
  tone: "navy" | "red" | "orange" | "blue" | "gray";
};

export type AccidentYearSummary = {
  year: string;
  totalCases: number;
  fatal: number;
  injured: number;
  trapped: number;
  other: number;
};

export type AccidentReport = {
  id: string;
  date: string;
  state: string;
  location: string;
  equipment: string;
  title: string;
  details: string;
  tag: "TRAPPED" | "FATAL" | "OTHER";
  tagCount: number;
};

export const accidentMetrics: AccidentMetric[] = [
  {
    label: "Total Cases",
    value: "457",
    note: "Temporary demonstration data",
    tone: "navy",
  },
  {
    label: "Fatal Cases",
    value: "240",
    note: "Temporary demonstration data",
    tone: "red",
  },
  {
    label: "Injured Cases",
    value: "450",
    note: "Temporary demonstration data",
    tone: "orange",
  },
  {
    label: "Trapped Cases",
    value: "984",
    note: "Temporary demonstration data",
    tone: "blue",
  },
  {
    label: "Other Cases",
    value: "3",
    note: "Temporary demonstration data",
    tone: "gray",
  },
];

export const accidentYearSummaries: AccidentYearSummary[] = [
  {
    year: "2026",
    totalCases: 231,
    fatal: 97,
    injured: 175,
    trapped: 532,
    other: 3,
  },
  {
    year: "2025",
    totalCases: 112,
    fatal: 50,
    injured: 120,
    trapped: 274,
    other: 0,
  },
  {
    year: "2024",
    totalCases: 36,
    fatal: 13,
    injured: 67,
    trapped: 48,
    other: 0,
  },
  {
    year: "2023",
    totalCases: 31,
    fatal: 30,
    injured: 38,
    trapped: 42,
    other: 0,
  },
];

export const accidentReports: AccidentReport[] = [
  {
    id: "ACC-2026-001",
    date: "06/10/2026",
    state: "Uttar Pradesh",
    location: "Sample Residential Building",
    equipment: "Passenger Lift",
    title: "फ्लैट में फंसे यात्रियों को सुरक्षित बाहर निकाला गया",
    details:
      "Temporary demonstration report showing how a trapped-person case can be displayed with date, state, equipment and status.",
    tag: "TRAPPED",
    tagCount: 7,
  },
  {
    id: "ACC-2026-002",
    date: "06/10/2026",
    state: "Uttar Pradesh",
    location: "Sample Commercial Building",
    equipment: "Passenger Lift",
    title: "लिफ्ट में फंसे लोगों को सुरक्षित बाहर निकाला गया",
    details:
      "Temporary demonstration report for testing a trapped case with a longer incident description.",
    tag: "TRAPPED",
    tagCount: 13,
  },
  {
    id: "ACC-2026-003",
    date: "01/10/2026",
    state: "Delhi",
    location: "Sample Residential Complex",
    equipment: "Passenger Lift",
    title: "लिफ्ट खराब होने के बाद यात्रियों को सुरक्षित निकाला गया",
    details:
      "Temporary demonstration report for a trapped passenger case.",
    tag: "TRAPPED",
    tagCount: 6,
  },
  {
    id: "ACC-2026-004",
    date: "01/10/2026",
    state: "Kerala",
    location: "Sample Apartment Complex",
    equipment: "Passenger Lift",
    title: "Eight trapped in lift at residential complex",
    details:
      "Temporary demonstration report for a lift power-outage case.",
    tag: "TRAPPED",
    tagCount: 5,
  },
  {
    id: "ACC-2026-005",
    date: "01/10/2026",
    state: "Uttar Pradesh",
    location: "Sample Residential Building",
    equipment: "Lift",
    title: "लिफ्ट खराब होने से यात्री फंसे",
    details:
      "Temporary demonstration report showing a trapped passenger incident.",
    tag: "TRAPPED",
    tagCount: 8,
  },
  {
    id: "ACC-2026-006",
    date: "30/09/2026",
    state: "Gujarat",
    location: "Ahmedabad Sample Site",
    equipment: "Lift",
    title: "Lift-related fatal incident reported at sample site",
    details:
      "Temporary demonstration record showing how a fatal incident is highlighted.",
    tag: "FATAL",
    tagCount: 1,
  },
  {
    id: "ACC-2026-007",
    date: "30/09/2026",
    state: "Uttar Pradesh",
    location: "Sample Residential Complex",
    equipment: "Lift",
    title: "लिफ्ट में फंसे यात्रियों को सुरक्षित बाहर निकाला गया",
    details:
      "Temporary demonstration record for a trapped passenger incident.",
    tag: "TRAPPED",
    tagCount: 1,
  },
  {
    id: "ACC-2026-008",
    date: "29/09/2026",
    state: "Kerala",
    location: "Sample Residential Building",
    equipment: "Lift",
    title: "Young person dies after lift crash in sample report",
    details:
      "Temporary demonstration record for testing the fatal incident card layout.",
    tag: "FATAL",
    tagCount: 1,
  },
  {
    id: "ACC-2026-009",
    date: "25/09/2026",
    state: "Maharashtra",
    location: "Sample Office Complex",
    equipment: "Escalator",
    title: "Escalator incident recorded for demonstration",
    details:
      "Temporary demonstration report showing an other-category case.",
    tag: "OTHER",
    tagCount: 1,
  },
  {
    id: "ACC-2026-010",
    date: "20/09/2026",
    state: "Rajasthan",
    location: "Sample Shopping Centre",
    equipment: "Passenger Lift",
    title: "Passengers temporarily trapped in lift",
    details:
      "Temporary demonstration report for state filtering and card display.",
    tag: "TRAPPED",
    tagCount: 4,
  },
  {
    id: "ACC-2026-011",
    date: "15/09/2026",
    state: "Madhya Pradesh",
    location: "Sample Commercial Complex",
    equipment: "Passenger Lift",
    title: "Lift incident reported at sample commercial complex",
    details:
      "Temporary demonstration report for the accident records section.",
    tag: "TRAPPED",
    tagCount: 2,
  },
  {
    id: "ACC-2026-012",
    date: "10/09/2026",
    state: "Karnataka",
    location: "Sample Residential Building",
    equipment: "Passenger Lift",
    title: "Sample lift safety incident record",
    details:
      "Temporary demonstration record for testing the public accident report grid.",
    tag: "OTHER",
    tagCount: 1,
  },
];

export const accidentStates = [
  "All States",
  ...Array.from(new Set(accidentReports.map((report) => report.state))).sort(),
];

export const accidentFields = [
  "Date",
  "Location",
  "Equipment",
  "Fatalities",
  "Injuries",
  "Incident Details",
  "Investigation Status",
  "Report Status",
] as const;
