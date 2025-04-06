// src/components/resume/ModernSkillsCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { motion } from 'framer-motion';
import type { Skill } from '@/types/resume';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  title: string;
  skills: Skill[];
  icon: LucideIcon;
}

export function ModernSkillsCard({ title, skills, icon: Icon }: SkillCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary-500/10 to-transparent">
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary-500" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 grid gap-4">
        {skills.map((skill, index) => (
          <motion.div key={skill.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.3 }} className="relative">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-sm">{skill.name}</span>
              {skill.experience && <span className="text-xs text-muted-foreground">{skill.experience}</span>}
            </div>

            {typeof skill.level === 'number' && (
              <div className="h-2 w-full bg-secondary-100 dark:bg-secondary-900/40 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
