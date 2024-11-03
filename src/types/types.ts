export type Activity = {
  id: string;
  timeSpent: number;
  sessionCount: number;
  title: string;
  url: string;
  faviconUrl: string;
  hourlyTimeSpent: { [key: string]: number };
};

export type ActivityDataMessageRequest = {
  currUrl: string;
  title: string;
  faviconUrl: string;
};

export type MessageRequest = any & {
  type: "activityData" | "incrementSessionCount" | "incrementTimeSpent";
};
