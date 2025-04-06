// src/lib/resume-utils.ts
import { format } from 'date-fns';

// Format dates consistently across the resume
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, 'MMM yyyy');
  } catch (e) {
    // If it's already formatted or invalid, return as is
    return dateString;
  }
}

// Generate initials from name
export function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

// Determine skill level descriptors
export function getSkillLevelText(level: number): string {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  if (level >= 40) return 'Basic';
  return 'Beginner';
}
