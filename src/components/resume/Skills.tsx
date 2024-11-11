import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { Skill } from '@/types/resume'

interface SkillsProps {
  data: Skill[]
}

export const Skills: React.FC<SkillsProps> = ({ data }) => {
  const technicalSkills = data.filter(skill => skill.category === 'technical')
  const softSkills = data.filter(skill => skill.category === 'soft')
  const languageSkills = data.filter(skill => skill.category === 'language')

  const SkillBar = ({ skill }: { skill: Skill }) => (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <Progress value={skill.level} className="h-2" />
    </motion.div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Technical Skills */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technicalSkills.map((skill, index) => (
            <SkillBar key={index} skill={skill} />
          ))}
        </CardContent>
      </Card>

      {/* Language Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {languageSkills.map((skill, index) => (
            <SkillBar key={index} skill={skill} />
          ))}
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Soft Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {skill.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}