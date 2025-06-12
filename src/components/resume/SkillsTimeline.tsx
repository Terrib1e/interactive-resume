// src/components/resume/SkillsTimeline.tsx
import { motion } from "framer-motion";
import { Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui/badge";

interface SkillJourney {
  skill: string;
  startYear: number;
  currentLevel: number;
  milestones: {
    year: number;
    level: number;
    achievement: string;
  }[];
}

interface SkillsTimelineProps {
  skillsJourney: SkillJourney[];
}

export function SkillsTimeline({ skillsJourney }: SkillsTimelineProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          Skills Development Journey
        </h3>
        <p className="text-sm text-muted-foreground">
          Tracking my growth in key technologies over time
        </p>
      </div>

      <div className="grid gap-4">
        {skillsJourney.map((journey, index) => (
          <motion.div
            key={journey.skill}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{journey.skill}</span>
                  <Badge variant="outline" className="text-xs">
                    {currentYear - journey.startYear}+ years
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Progress bar */}
                <div className="relative">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${journey.currentLevel}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    Current Level: {journey.currentLevel}%
                  </span>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  {journey.milestones.map((milestone, mIndex) => (
                    <motion.div
                      key={mIndex}
                      className="flex items-start gap-3 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + mIndex * 0.05 + 1 }}
                    >
                      <div className="flex items-center gap-1 text-muted-foreground min-w-0">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs">{milestone.year}</span>
                      </div>
                      <div className="flex-1">
                        <span className="text-foreground">
                          {milestone.achievement}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          Level: {milestone.level}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
