// src/types/resume.ts (with schema added)
import * as z from 'zod';

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  links: {
    website?: string;
    github: string;
    linkedin: string;
  };
}

export interface Experience {
  technologies: boolean;
  skills: boolean;
  company: string;
  position: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level?: number;
  experience?: string;
}

export interface Skills {
  frontend: Skill[];
  backend: Skill[];
  cloud?: Skill[];
  databases?: Skill[];
  analytics?: Skill[];
}

export interface Education {
  school: string;
  location: string;
  degree: string;
  period: string;
  institution: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
  gpa?: number;
}

export interface Project {
  image?: string;
  period: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  impact?: string;
  demoUrl?: string;
  role?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  skills?: string[];
}

export interface ResumeData {
  profile: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    bio: string;
    avatar: string;
    links: {
      github: string;
      linkedin: string;
      website?: string;
    };
  };
  experience: Experience[];
  skills: {
    frontend: Skill[];
    backend: Skill[];
    cloud?: Skill[];
    databases?: Skill[];
    analytics?: Skill[];
  };
  education: Education[];
  certifications: Certification[];
  additionalInfo: string[];
  projects: Project[];
}

// Zod schema for form validation
export const resumeSchema = z.object({
  profile: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    title: z.string().min(2, 'Title must be at least 2 characters'),
    location: z.string(),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string(),
    bio: z.string().min(10, 'Bio must be at least 10 characters'),
    avatar: z.string().optional(),
    links: z
      .object({
        github: z.string().optional(),
        linkedin: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
  }),
  experience: z.array(
    z.object({
      company: z.string().min(2, 'Company name must be at least 2 characters'),
      position: z.string().min(2, 'Position must be at least 2 characters'),
      location: z.string(),
      period: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      current: z.boolean(),
      description: z.string(),
      achievements: z.array(z.string()),
    }),
  ),
  skills: z.object({
    frontend: z.array(
      z.object({
        name: z.string(),
        level: z.number().min(0).max(100).optional(),
        experience: z.string().optional(),
      }),
    ),
    backend: z.array(
      z.object({
        name: z.string(),
        level: z.number().min(0).max(100).optional(),
        experience: z.string().optional(),
      }),
    ),
    cloud: z
      .array(
        z.object({
          name: z.string(),
          level: z.number().min(0).max(100).optional(),
          experience: z.string().optional(),
        }),
      )
      .optional(),
    databases: z
      .array(
        z.object({
          name: z.string(),
          level: z.number().min(0).max(100).optional(),
          experience: z.string().optional(),
        }),
      )
      .optional(),
    analytics: z
      .array(
        z.object({
          name: z.string(),
          level: z.number().min(0).max(100).optional(),
          experience: z.string().optional(),
        }),
      )
      .optional(),
  }),
  education: z.array(
    z.object({
      school: z.string().min(2, 'School name must be at least 2 characters'),
      degree: z.string().min(2, 'Degree must be at least 2 characters'),
      location: z.string(),
      period: z.string(),
      achievements: z.array(z.string()).optional(),
      gpa: z.number().min(0).max(4).optional(),
    }),
  ),
  projects: z
    .array(
      z.object({
        title: z.string().min(2, 'Project title must be at least 2 characters'),
        description: z.string(),
        period: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        technologies: z.array(z.string()),
        highlights: z.array(z.string()),
        link: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .optional(),
  certifications: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      issuer: z.string(),
      date: z.string(),
      credentialUrl: z.string(),
      skills: z.array(z.string()).optional(),
    })
  ).optional(),
  additionalInfo: z.array(z.string()).optional(),
});
