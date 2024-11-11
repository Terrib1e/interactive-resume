// src/components/resume/Skills.tsx

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Skill } from '../../types/resume'
import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  icon: LucideIcon;
}

export const SkillCategory: React.FC<SkillCategoryProps> = ({
  title,
  skills,
  icon: Icon
}) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-1.5"
          >
            <div className="flex justify-between">
              <span className="text-sm font-medium">{skill.name}</span>
              {skill.experience ? (
                <span className="text-sm text-muted-foreground">
                  {skill.experience}
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              )}
            </div>
            {skill.level && <Progress value={skill.level} className="h-2" />}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}