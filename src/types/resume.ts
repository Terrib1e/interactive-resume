/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/index.ts

export interface Profile {
    avatar: string | undefined;
    links: any;
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    bio: string;
  }

  export interface Skill {
    name: string;
    level?: number;
    experience?: string;
  }

  export interface Experience {
    company: string;
    position: string;
    location?: string;
    period: string;
    achievements: string[];
    technologies?: string[];
  }

  export interface Education {
    school: string;
    degree: string;
    location: string;
    period: string;
    achievements?: string[];
    gpa?: number;
  }

  export interface Project {
    startDate:string;
    endDate: string;
    title: string;
    description: string;
    period: string;
    technologies: string[];
    highlights: string[];
    link?: string;
    image?: string;
  }

  export interface ResumeData {
    profile: Profile;
    experience: Experience[];
    skills: {
      frontend: Skill[];
      backend: Skill[];
      cloud: Skill[];
      databases: Skill[];
      analytics: Skill[];
    };
    education: Education[];
    certifications: string[];
    additionalInfo: string[];
  }