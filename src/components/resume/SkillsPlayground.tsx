// src/components/resume/SkillsPlayground.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shuffle, Star, Zap, Target } from "lucide-react";
import type { Skills, Skill } from "@/types/resume";

interface SkillsPlaygroundProps {
  skills: Skills;
}

export function SkillsPlayground({ skills }: SkillsPlaygroundProps) {
  const [selectedSkill, setSelectedSkill] = useState<
    (Skill & { category: string }) | null
  >(null);
  const [showRandomSkill, setShowRandomSkill] = useState(false);

  // Combine all skills with categories
  const allSkills = [
    ...skills.frontend.map((skill) => ({ ...skill, category: "Frontend" })),
    ...skills.backend.map((skill) => ({ ...skill, category: "Backend" })),
    ...(skills.cloud || []).map((skill) => ({ ...skill, category: "Cloud" })),
    ...(skills.databases || []).map((skill) => ({
      ...skill,
      category: "Database",
    })),
    ...(skills.analytics || []).map((skill) => ({
      ...skill,
      category: "Analytics",
    })),
  ];

  const topSkills = allSkills
    .filter((skill) => (skill.level || 0) >= 85)
    .sort((a, b) => (b.level || 0) - (a.level || 0));

  const handleRandomSkill = () => {
    const randomSkill = allSkills[Math.floor(Math.random() * allSkills.length)];
    setSelectedSkill(randomSkill);
    setShowRandomSkill(true);
    setTimeout(() => setShowRandomSkill(false), 3000);
  };

  const getSkillDescription = (skill: Skill & { category: string }) => {
    const descriptions: Record<string, string> = {
      JavaScript: "Dynamic, versatile language powering modern web development",
      Java: "Enterprise-grade, object-oriented programming language",
      Python: "Powerful language for data science, AI, and backend development",
      React: "Component-based library for building interactive user interfaces",
      Angular: "Full-featured framework for scalable web applications",
      AWS: "Leading cloud platform for scalable, reliable infrastructure",
      Docker: "Containerization platform for consistent deployments",
      SQL: "Standard language for database querying and management",
      "Spring Boot": "Java framework for rapid application development",
      "Node.js": "JavaScript runtime for server-side development",
    };

    return (
      descriptions[skill.name] || `Professional expertise in ${skill.name}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Skills Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Top Skills Spotlight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {topSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer"
                onClick={() => setSelectedSkill(skill)}
              >
                <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600 mb-1">
                      {skill.level}%
                    </div>
                    <div className="text-sm font-medium">{skill.name}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {skill.category}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Random Skill Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shuffle className="w-5 h-5 text-blue-500" />
            Skill Explorer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <Button
              onClick={handleRandomSkill}
              className="flex items-center gap-2"
              size="lg"
            >
              <Shuffle className="w-4 h-4" />
              Discover a Random Skill
            </Button>

            <AnimatePresence>
              {showRandomSkill && selectedSkill && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border"
                >
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {selectedSkill.name}
                  </div>
                  <div className="text-lg text-muted-foreground mb-3">
                    {selectedSkill.category} • {selectedSkill.level}%
                    proficiency
                  </div>
                  <div className="text-sm">
                    {getSkillDescription(selectedSkill)}
                  </div>
                  {selectedSkill.experience && (
                    <Badge variant="secondary" className="mt-2">
                      {selectedSkill.experience}
                    </Badge>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && !showRandomSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-background rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedSkill.name}
                  </h3>
                  <Badge variant="outline" className="mb-3">
                    {selectedSkill.category}
                  </Badge>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {selectedSkill.level}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Proficiency Level
                  </div>
                </div>

                {selectedSkill.experience && (
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{selectedSkill.experience}</span>
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  {getSkillDescription(selectedSkill)}
                </div>

                <Button
                  onClick={() => setSelectedSkill(null)}
                  variant="outline"
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
