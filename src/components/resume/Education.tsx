// src/components/resume/Education.tsx

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin } from 'lucide-react'
import type { Education as EducationType } from '../../types/resume'

interface EducationProps {
  education: EducationType;
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{education.school}</CardTitle>
        <CardDescription>{education.degree}</CardDescription>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {education.location}
        </CardDescription>
        <CardDescription>{education.period}</CardDescription>

        {education.achievements && Array.isArray(education.achievements) && education.achievements.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Achievements</h4>
            <ul className="list-disc list-inside space-y-1">
              {education.achievements.map((achievement: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardHeader>
    </Card>
  )
}