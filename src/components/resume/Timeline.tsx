// src/components/resume/Timeline.tsx
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import type { Experience } from '@/types/resume'

interface TimelineProps {
  experiences: Experience[]
}

export const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.period.split(" to ")[0]).getTime() -
           new Date(a.period.split(" to ")[0]).getTime()
  })

  return (
    <div className="relative container max-w-3xl">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border" />

      {/* Timeline items */}
      <div className="space-y-12">
        {sortedExperiences.map((experience, index) => (
          <FadeIn
            key={index}
            delay={index * 0.2}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <div className={`flex items-center justify-${index % 2 === 0 ? 'end' : 'start'} w-full`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <Card className="relative hover:shadow-lg transition-shadow">
                  {/* Timeline dot */}
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"
                       style={{
                         [index % 2 === 0 ? 'right' : 'left']: '-2rem'
                       }}
                  />

                  <CardContent className="p-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.3 }}
                    >
                      <h3 className="font-bold">{experience.position}</h3>
                      <p className="text-sm text-muted-foreground">{experience.company}</p>
                      <p className="text-sm text-muted-foreground">{experience.period}</p>

                      <div className="mt-2 space-y-1">
                        {experience.achievements.slice(0, 2).map((achievement, i) => (
                          <p key={i} className="text-sm">
                            {achievement}
                          </p>
                        ))}
                      </div>

                      {experience.technologies && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {experience.technologies.slice(0, 3).map((tech, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}