export type NewsItem = {
  slug: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  source: string;
  important?: boolean;
  content?: string;
};

/*
 * News articles will be added later from the backend/CMS.
 */
export const latestNews: NewsItem[] = [];

export type AccidentReport = {
  id: string;
  date: string;
  state: string;
  location: string;
  equipment: string;
  title: string;
  details: string;
  type: "TRAPPED" | "FATAL" | "INJURED" | "OTHER";
  fatalities: number;
  injuries: number;
  trapped: number;
  sourceLink: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
};