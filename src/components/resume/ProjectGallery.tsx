// src/components/resume/ProjectGallery.tsx
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScaleIn } from "@/components/animations/scale-in"
import { ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '../../types/resume'

interface ProjectGalleryProps {
  projects: Project[]
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ScaleIn key={project.title} delay={index * 0.1}>
            <Card
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedProject(project)}
            >
              {project.image && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScaleIn>
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>{selectedProject.period}</DialogDescription>
            </DialogHeader>

            {selectedProject.image && (
              <div className="relative h-64 overflow-hidden rounded-lg">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <div className="space-y-4">
              <p className="text-muted-foreground">
                {selectedProject.description}
              </p>

              <div>
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedProject.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm text-muted-foreground"
                    >
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedProject.link && (
                <div className="flex gap-2 pt-4">
                  <Button asChild>
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </a>
                  </Button>
                  {selectedProject.link.includes('github') && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}