/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/index.ts

import { ReactNode } from "react";

export interface Profile {
    website: string | number | readonly string[] | undefined;
    summary: string | number | readonly string[] | undefined;
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
    startDate: string | number | readonly string[] | undefined;
    current: any;
    endDate: string | number | readonly string[] | undefined;
    description: string | number | readonly string[] | undefined;
    company: string;
    position: string;
    location?: string;
    period: string;
    achievements: string[];
    technologies?: string[];
  }

export interface Education {
    school: ReactNode;
    location: ReactNode;
    period: ReactNode;
    gpa: any;
    achievements: boolean;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
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
    projects: Project[];
    profile: Profile;
      experience: Experience[];
      website: "", // Add empty website property
      summary: "",
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

export interface ResumePreviewProps {
    data: ResumeData;
    template?: string;
}