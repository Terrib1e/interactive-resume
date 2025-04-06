// src/types/resume.ts (with schema added)
import * as z from 'zod';

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
  startDate: string;
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
  social: {
    github: string; // GitHub username
    linkedin: string;
    twitter?: string;
  };

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
      location: z.string().optional(),
      period: z.string(),
      achievements: z.array(z.string()),
      technologies: z.array(z.string()).optional(),
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
  certifications: z.array(z.string()).optional(),
  additionalInfo: z.array(z.string()).optional(),
});
