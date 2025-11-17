export interface Project {
  id: number;
  title: string;
  language: string;
  description: string;
  image: string;
  link?: string;
  year: number;
  pinned?: boolean;
}

export interface ProjectsData {
  projects: Project[];
}