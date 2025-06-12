// src/components/resume/SkillsRadarChart.tsx
import React from "react";
import { motion } from "framer-motion";
import type { Skills } from "@/types/resume";

interface SkillsRadarChartProps {
  skills: Skills;
  size?: number;
}

export function SkillsRadarChart({
  skills,
  size = 300,
}: SkillsRadarChartProps) {
  // Calculate average skill level for each category
  const categories = [
    { name: "Frontend", skills: skills.frontend, color: "#3B82F6" },
    { name: "Backend", skills: skills.backend, color: "#10B981" },
    { name: "Cloud", skills: skills.cloud || [], color: "#8B5CF6" },
    { name: "Database", skills: skills.databases || [], color: "#F59E0B" },
    { name: "Analytics", skills: skills.analytics || [], color: "#EF4444" },
  ];

  const averageSkills = categories.map((category) => {
    const skillsWithLevels = category.skills.filter(
      (skill) => typeof skill.level === "number"
    );
    const average =
      skillsWithLevels.length > 0
        ? skillsWithLevels.reduce((sum, skill) => sum + (skill.level || 0), 0) /
          skillsWithLevels.length
        : 0;
    return { ...category, average };
  });

  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (2 * Math.PI) / averageSkills.length;

  // Generate pentagon points for background
  const backgroundPoints = averageSkills.map((_, index) => {
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  // Generate data points based on skill levels
  const dataPoints = averageSkills.map((skill, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const skillRadius = (skill.average / 100) * radius;
    return {
      x: center + skillRadius * Math.cos(angle),
      y: center + skillRadius * Math.sin(angle),
      skill,
    };
  });

  // Removed unused variable 'backgroundPath'

  const dataPath =
    dataPoints
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ") + " Z";

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, index) => (
            <polygon
              key={index}
              points={backgroundPoints
                .map(
                  (point) =>
                    `${center + (point.x - center) * scale},${
                      center + (point.y - center) * scale
                    }`
                )
                .join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-muted-foreground/20"
            />
          ))}

          {/* Axis lines */}
          {backgroundPoints.map((point, index) => (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-muted-foreground/30"
            />
          ))}

          {/* Data area */}
          <motion.path
            d={dataPath}
            fill="url(#skillsGradient)"
            stroke="#3B82F6"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Data points */}
          {dataPoints.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={point.skill.color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 1, duration: 0.3 }}
              className="drop-shadow-sm"
            />
          ))}

          {/* Gradient definition */}
          <defs>
            <radialGradient id="skillsGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </radialGradient>
          </defs>
        </svg>

        {/* Category labels */}
        {backgroundPoints.map((point, index) => {
          const skill = averageSkills[index];
          const isTop = point.y < center;
          const isLeft = point.x < center;

          return (
            <div
              key={index}
              className="absolute text-xs font-medium whitespace-nowrap"
              style={{
                left: point.x - (isLeft ? 60 : -10),
                top: point.y - (isTop ? 20 : -10),
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: skill.color }}
                />
                <span>{skill.name}</span>
                <span className="text-muted-foreground">
                  {Math.round(skill.average)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
