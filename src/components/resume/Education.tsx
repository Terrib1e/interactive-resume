import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, MapPin } from 'lucide-react'
import type { Education as EducationType } from '@/types/resume'

interface EducationProps {
  data: EducationType[]
}

export const Education: React.FC<EducationProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {data.map((education, index) => (
        <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <CardTitle>{education.school}</CardTitle>
                </div>
                <CardDescription className="text-base mt-1">
                  {education.degree} in {education.field}
                </CardDescription>
                <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{education.location}</span>
                </div>
                <CardDescription className="mt-1">
                  {formatDate(education.startDate)} - {formatDate(education.endDate)}
                </CardDescription>
              </div>
              {education.gpa && (
                <Badge variant="secondary" className="whitespace-nowrap">
                  GPA: {education.gpa}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {education.achievements.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold">Achievements & Activities</h4>
                </div>
                <ul className="list-disc list-inside space-y-2">
                  {education.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}