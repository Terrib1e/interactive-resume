// src/components/resume/SkillsMatrix.tsx
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import type { Skills } from "@/types/resume";

interface SkillsMatrixProps {
  skills: Skills;
  className?: string;
}

export function SkillsMatrix({ skills, className = "" }: SkillsMatrixProps) {
  // Combine all skills with categories
  const allSkills = [
    ...skills.frontend.map((skill) => ({
      ...skill,
      category: "Frontend",
      color: "bg-blue-500",
    })),
    ...skills.backend.map((skill) => ({
      ...skill,
      category: "Backend",
      color: "bg-green-500",
    })),
    ...(skills.cloud || []).map((skill) => ({
      ...skill,
      category: "Cloud",
      color: "bg-purple-500",
    })),
    ...(skills.databases || []).map((skill) => ({
      ...skill,
      category: "Database",
      color: "bg-orange-500",
    })),
    ...(skills.analytics || []).map((skill) => ({
      ...skill,
      category: "Analytics",
      color: "bg-pink-500",
    })),
  ].sort((a, b) => (b.level || 0) - (a.level || 0));

  const getIntensity = (level: number | undefined) => {
    if (!level) return "opacity-20";
    if (level >= 90) return "opacity-100";
    if (level >= 80) return "opacity-80";
    if (level >= 70) return "opacity-60";
    if (level >= 60) return "opacity-50";
    return "opacity-30";
  };

  const getSize = (level: number | undefined) => {
    if (!level) return "w-8 h-8";
    if (level >= 90) return "w-16 h-16";
    if (level >= 80) return "w-14 h-14";
    if (level >= 70) return "w-12 h-12";
    if (level >= 60) return "w-10 h-10";
    return "w-8 h-8";
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg">Skills Proficiency Matrix</CardTitle>
        <p className="text-sm text-muted-foreground">
          Size and intensity represent skill level
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 justify-center">
          {allSkills.map((skill, index) => (
            <motion.div
              key={`${skill.category}-${skill.name}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
                type: "spring",
                stiffness: 300,
              }}
              className="relative group cursor-pointer"
            >
              <div
                className={`
                  ${getSize(skill.level)} 
                  ${skill.color} 
                  ${getIntensity(skill.level)}
                  rounded-lg flex items-center justify-center text-white text-xs font-medium
                  hover:scale-110 transition-all duration-200 shadow-lg
                  hover:shadow-xl
                `}
              >
                <span className="text-center leading-tight px-1">
                  {skill.name.split(" ")[0]}
                </span>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                  <div className="font-medium">{skill.name}</div>
                  <div className="text-gray-300">{skill.category}</div>
                  <div className="text-blue-300">Level: {skill.level}%</div>
                  {skill.experience && (
                    <div className="text-green-300">{skill.experience}</div>
                  )}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex flex-wrap gap-3 justify-center text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Cloud</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>Database</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded"></div>
              <span>Analytics</span>
            </div>
          </div>
          <div className="mt-2 text-center text-xs text-muted-foreground">
            Size indicates proficiency level • Hover for details
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
