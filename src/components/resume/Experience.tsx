// src/components/resume/Experience.tsx

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Experience as ExperienceType } from '../../types/resume'

interface ExperienceProps {
  experience: ExperienceType;
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{experience.position}</CardTitle>
            <CardDescription className="text-base">
              {experience.company} {experience.location && `• ${experience.location}`}
            </CardDescription>
            <CardDescription className="text-sm">
              {experience.period}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {experience.achievements.map((achievement: string, i: number) => (
            <li key={i} className="text-sm text-muted-foreground">
              {achievement}
            </li>
          ))}
        </ul>

        {experience.technologies && (
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.technologies.map((tech: string, i: number) => (
              <Badge key={i} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}