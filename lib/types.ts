// Shared TypeScript types for EHCC static content.

export type EventType = "Hackathon" | "Workshop" | "Guest Speaker" | "Competition" | "Social";

export interface ClubEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // ISO date
  time?: string;
  location: string;
  description: string;
  upcoming: boolean;
  featured?: boolean;
}

export interface GuestSpeaker {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  date: string;
}

export type ProjectCategory = "AI/ML" | "Web Dev" | "Cybersecurity" | "Data Science" | "Other";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  members: string[];
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  grade: string;
  bio?: string;
  interests: string[];
  isLeadership: boolean;
}

export type Branch = {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
};

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Workshop {
  id: string;
  title: string;
  difficulty: Difficulty;
  sessions: number;
  description: string;
  topics: string[];
  icon: string;
}

export interface Resource {
  id: string;
  title: string;
  category: "Tutorial" | "Docs" | "Video" | "Tool";
  topic: string;
  url: string;
  description: string;
}

export interface ConceptCard {
  id: string;
  term: string;
  short: string;
  detail: string;
}

export interface RoadmapPath {
  id: string;
  title: string;
  goal: string;
  color: string;
  steps: { label: string; detail: string }[];
}

export interface Milestone {
  date: string;
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

// Games -------------------------------------------------------------

export interface TriviaQuestion {
  question: string;
  options: string[];
  answer: number; // index into options
  category: string;
}

export interface DebugChallenge {
  language: string;
  prompt: string;
  code: string;
  options: string[];
  answer: number;
  explanation: string;
}
