export interface DashboardTrafficItem {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
}

export interface DashboardTrafficResponse {
  range: 'day' | 'week' | 'month' | 'year';
  items: DashboardTrafficItem[];
  total: {
    pageViews: number;
    uniqueVisitors: number;
  };
}

export interface DashboardPopularPost {
  id: number;
  title: string;
  views: number;
}

export interface DashboardRecentComment {
  id: number;
  postId: number;
  postTitle: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface DashboardSummaryResponse {
  posts: number;
  comments: number;
  projects: number;
  menus: number;
  traffic: {
    today: {
      pageViews: number;
      uniqueVisitors: number;
    };
    total: {
      pageViews: number;
      uniqueVisitors: number;
    };
  };
}
