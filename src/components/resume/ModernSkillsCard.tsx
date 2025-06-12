// src/components/resume/ModernSkillsCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { Skill } from "@/types/resume";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface SkillCardProps {
  title: string;
  skills: Skill[];
  icon: LucideIcon;
  variant?: "detailed" | "compact";
  className?: string;
}

export function ModernSkillsCard({
  title,
  skills,
  icon: Icon,
  variant = "detailed",
  className = "",
}: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "compact") {
    return (
      <Card className={`overflow-hidden card-enhanced ${className}`}>
        <CardHeader className="pb-3 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <Icon
              className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400"
              aria-hidden="true"
            />
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 pb-4">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors"
                >
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`overflow-hidden card-enhanced group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10 border-b border-primary-100 dark:border-primary-800/30">
        <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary-600 dark:text-primary-400"
              aria-hidden="true"
            />
          </motion.div>
          <span className="font-semibold">{title}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {skills.length} skill{skills.length !== 1 ? "s" : ""}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 pb-6 space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="group/skill"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="font-medium text-sm sm:text-base text-foreground truncate">
                  {skill.name}
                </span>
                {skill.experience && (
                  <Badge
                    variant="outline"
                    className="text-xs px-1.5 py-0.5 shrink-0"
                  >
                    {skill.experience}
                  </Badge>
                )}
              </div>
              {typeof skill.level === "number" && (
                <span className="text-xs font-medium text-muted-foreground ml-2 shrink-0">
                  {skill.level}%
                </span>
              )}
            </div>

            {typeof skill.level === "number" && (
              <div className="relative">
                <div className="h-2 w-full bg-secondary-200 dark:bg-secondary-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{
                      duration: 1.2,
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.5,
                        delay: 1.5 + index * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
