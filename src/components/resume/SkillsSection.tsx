// src/components/resume/SkillsSection.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModernSkillsCard } from "./ModernSkillsCard";
import { SkillsRadarChart } from "./SkillsRadarChart";
import { SkillsMatrix } from "./SkillsMatrix";
import { SkillsPlayground } from "./SkillsPlayground";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Server,
  Cloud,
  Database,
  BarChart,
  Grid3X3,
  List,
  Filter,
  TrendingUp,
  Target,
  Activity,
  Gamepad2,
} from "lucide-react";
import type { Skills } from "@/types/resume";

interface SkillsSectionProps {
  skills: Skills;
  className?: string;
}

type ViewMode =
  | "grid"
  | "compact"
  | "category"
  | "radar"
  | "matrix"
  | "playground";

const skillCategories = [
  {
    key: "frontend",
    label: "Frontend",
    icon: Code,
    color: "from-blue-500 to-blue-600",
  },
  {
    key: "backend",
    label: "Backend",
    icon: Server,
    color: "from-green-500 to-green-600",
  },
  {
    key: "cloud",
    label: "Cloud",
    icon: Cloud,
    color: "from-purple-500 to-purple-600",
  },
  {
    key: "databases",
    label: "Databases",
    icon: Database,
    color: "from-orange-500 to-orange-600",
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: BarChart,
    color: "from-pink-500 to-pink-600",
  },
] as const;

export function SkillsSection({ skills, className = "" }: SkillsSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get all skills with their categories for filtering
  const allSkillsWithCategories = skillCategories.flatMap(
    (category) =>
      skills[category.key as keyof Skills]?.map((skill) => ({
        ...skill,
        category: category.key,
        categoryLabel: category.label,
        categoryIcon: category.icon,
        categoryColor: category.color,
      })) || []
  );

  // Sort skills by level (highest first) for trending view
  const topSkills = allSkillsWithCategories
    .filter((skill) => typeof skill.level === "number")
    .sort((a, b) => (b.level as number) - (a.level as number))
    .slice(0, 12);

  const filteredCategories =
    selectedCategory === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.key === selectedCategory);

  return (
    <div className={`space-y-6 ${className}`}>
      {" "}
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter
            className="w-4 h-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="text-sm font-medium">View:</span>
          <div className="flex gap-1 flex-wrap">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8"
              aria-label="Grid view"
            >
              <Grid3X3 className="w-3 h-3" />
            </Button>
            <Button
              variant={viewMode === "compact" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("compact")}
              className="h-8"
              aria-label="Compact view"
            >
              <List className="w-3 h-3" />
            </Button>
            <Button
              variant={viewMode === "category" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("category")}
              className="h-8"
              aria-label="Category tabs view"
            >
              <TrendingUp className="w-3 h-3" />
            </Button>
            <Button
              variant={viewMode === "radar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("radar")}
              className="h-8"
              aria-label="Radar chart view"
            >
              <Target className="w-3 h-3" />
            </Button>
            <Button
              variant={viewMode === "matrix" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("matrix")}
              className="h-8"
              aria-label="Skills matrix view"
            >
              <Activity className="w-3 h-3" />
            </Button>
            <Button
              variant={viewMode === "playground" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("playground")}
              className="h-8"
              aria-label="Interactive playground"
            >
              <Gamepad2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {(viewMode === "grid" || viewMode === "compact") && (
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === "all" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900"
              onClick={() => setSelectedCategory("all")}
            >
              All Skills
            </Badge>
            {skillCategories.map((category) => (
              <Badge
                key={category.key}
                variant={
                  selectedCategory === category.key ? "default" : "outline"
                }
                className="cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900"
                onClick={() => setSelectedCategory(category.key)}
              >
                <category.icon className="w-3 h-3 mr-1" aria-hidden="true" />
                {category.label}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {viewMode === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
          >
            {filteredCategories.map((category) => {
              const categorySkills = skills[category.key as keyof Skills];
              if (!categorySkills || categorySkills.length === 0) return null;

              return (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <ModernSkillsCard
                    title={category.label}
                    skills={categorySkills}
                    icon={category.icon}
                    variant="detailed"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {viewMode === "compact" && (
          <motion.div
            key="compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-4"
          >
            {filteredCategories.map((category) => {
              const categorySkills = skills[category.key as keyof Skills];
              if (!categorySkills || categorySkills.length === 0) return null;

              return (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <ModernSkillsCard
                    title={category.label}
                    skills={categorySkills}
                    icon={category.icon}
                    variant="compact"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {viewMode === "category" && (
          <motion.div
            key="category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs defaultValue={skillCategories[0].key} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-6">
                {skillCategories.map((category) => {
                  const categorySkills = skills[category.key as keyof Skills];
                  if (!categorySkills || categorySkills.length === 0)
                    return null;

                  return (
                    <TabsTrigger
                      key={category.key}
                      value={category.key}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <category.icon
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        aria-hidden="true"
                      />
                      <span className="hidden sm:inline">{category.label}</span>
                      <span className="sm:hidden">
                        {category.label.slice(0, 4)}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {skillCategories.map((category) => {
                const categorySkills = skills[category.key as keyof Skills];
                if (!categorySkills || categorySkills.length === 0) return null;

                return (
                  <TabsContent
                    key={category.key}
                    value={category.key}
                    className="mt-0"
                  >
                    <div className="max-w-2xl mx-auto">
                      <ModernSkillsCard
                        title={`${category.label} Skills`}
                        skills={categorySkills}
                        icon={category.icon}
                        variant="detailed"
                        className="border-0 shadow-none bg-transparent"
                      />
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </motion.div>
        )}

        {viewMode === "radar" && (
          <motion.div
            key="radar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <SkillsRadarChart skills={skills} size={400} />
          </motion.div>
        )}

        {viewMode === "matrix" && (
          <motion.div
            key="matrix"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SkillsMatrix skills={skills} />
          </motion.div>
        )}

        {viewMode === "playground" && (
          <motion.div
            key="playground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SkillsPlayground skills={skills} />
          </motion.div>
        )}
      </AnimatePresence>{" "}
      {/* Top Skills Summary (visible for traditional views) */}
      {(viewMode === "grid" ||
        viewMode === "compact" ||
        viewMode === "category") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10 rounded-lg border border-primary-200 dark:border-primary-800"
        >
          <h3 className="text-sm font-semibold text-primary-800 dark:text-primary-200 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" aria-hidden="true" />
            Top Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {topSkills.slice(0, 8).map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-white/80 dark:bg-gray-800/80 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700"
                >
                  {skill.name}{" "}
                  {typeof skill.level === "number" && `(${skill.level}%)`}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
