export interface User {
  id: string;
  username: string;
  name: string;
  avatar?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: 'News' | 'Notice' | 'Research' | 'Topic';
  summary?: string;
  image?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export enum AuthState {
  GUEST,
  LOGGED_IN
}