import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Experience as ExperienceType } from '@/types/resume'

interface ExperienceProps {
  data: ExperienceType[]
}

export const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {data.map((experience, index) => (
        <Card key={index} className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{experience.position}</CardTitle>
                <CardDescription className="text-base">
                  {experience.company} • {experience.location}
                </CardDescription>
                <CardDescription className="text-sm">
                  {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {experience.description}
            </p>

            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="text-sm">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {experience.technologies.map((tech, i) => (
                <Badge key={i} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}