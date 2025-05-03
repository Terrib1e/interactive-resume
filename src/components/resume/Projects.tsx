import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar } from 'lucide-react'
import type { Project } from '@/types/resume'

interface ProjectsProps {
  data: Project[]
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((project, index) => (
        <Card key={index} className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {project.title}
                  {project.link && (
                    <Button variant="ghost" size="sm" className="p-0" asChild>
                      <a
                        href={`https://${project.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(project.startDate || '')}
                    {project.endDate && ` - ${formatDate(project.endDate)}`}
                  </span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>

            {project.highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech, i) => (
                <Badge key={i} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            {project.image && (
              <div className="mt-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-md w-full h-48 object-cover"
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}