// src/components/resume/Experience.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Experience as ExperienceType } from '../../types/resume';

interface ExperienceProps {
  experience: ExperienceType;
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <Card className="mb-6 overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-dark-card dark:border-dark-border border-l-4 border-l-primary-500 dark:border-l-dark-accent">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary-500 dark:text-dark-accent" />
              {experience.position}
            </CardTitle>
            <CardDescription className="text-base mt-1 flex items-center flex-wrap gap-1">
              <span className="font-medium text-primary-700 dark:text-dark-highlight">{experience.company}</span>
              {experience.location && (
                <span className="flex items-center text-muted-foreground">
                  <span className="mx-1">•</span>
                  <MapPin className="h-3 w-3 mr-1" />
                  {experience.location}
                </span>
              )}
            </CardDescription>
            <CardDescription className="text-sm flex items-center mt-1 text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {experience.period}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mt-2">
          {experience.achievements.map((achievement: string, i: number) => (
            <motion.li key={i} className="pl-6 relative text-sm text-foreground dark:text-dark-text" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <span className="absolute left-0 top-2 w-3 h-3 bg-primary-200 dark:bg-dark-muted rounded-full"></span>
              <span className="absolute left-1.5 top-2 w-1 h-1 bg-primary-500 dark:bg-dark-accent rounded-full"></span>
              {achievement}
            </motion.li>
          ))}
        </ul>

        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-dark-border">
            {experience.technologies.map((tech: string, i: number) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-primary-100 text-primary-800 dark:bg-dark-muted/30 dark:text-dark-highlight hover:bg-primary-200 dark:hover:bg-dark-muted/50 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
