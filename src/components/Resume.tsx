/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
// In src/components/Resume.tsx, update the imports:
import {
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Database,
  Cloud,
  BarChart,
  Terminal,
  MapPin,
  Mail
} from 'lucide-react'
import { resumeData } from '@/data/resumeData'
import { motion } from 'framer-motion'

const Resume = () => {
  interface SkillCategoryProps {
    title: string;
    skills: { name: string; experience?: string; level?: number }[];
    icon: React.ComponentType<{ className?: string }>;
  }

  const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, icon: Icon }) => (
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
                <span className="text-sm text-muted-foreground">{skill.experience}</span>
              ) : (
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              )}
            </div>
            <Progress value={skill.level} className="h-2" />
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )

  interface Experience {
    position: string;
    company: string;
    location?: string;
    period: string;
    achievements: string[];
  }

  const ExperienceCard: React.FC<{ experience: Experience }> = ({ experience }) => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{experience.position}</CardTitle>
            <CardDescription className="text-base">
              {experience.company} • {experience.location}
            </CardDescription>
            <CardDescription className="text-sm">
              {experience.period}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {experience.achievements.map((achievement, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              {achievement}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">{resumeData.profile.name}</h1>
                <p className="text-xl text-muted-foreground">{resumeData.profile.title}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a href={`mailto:${resumeData.profile.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    {resumeData.profile.email}
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  {resumeData.profile.location}
                </Button>
              </div>

              <p className="text-center max-w-3xl mx-auto text-muted-foreground">
                {resumeData.profile.bio}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="experience" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="experience">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Code className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="education">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </TabsTrigger>
            <TabsTrigger value="certifications">
              <Award className="w-4 h-4 mr-2" />
              Certifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="mt-6 space-y-6">
            {resumeData.experience.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} />
            ))}
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCategory
                title="Frontend"
                skills={resumeData.skills.frontend}
                icon={Terminal}
              />
              <SkillCategory
                title="Backend"
                skills={resumeData.skills.backend}
                icon={Code}
              />
              <SkillCategory
                title="Cloud & DevOps"
                skills={resumeData.skills.cloud}
                icon={Cloud}
              />
              <SkillCategory
                title="Databases"
                skills={resumeData.skills.databases}
                icon={Database}
              />
              <SkillCategory
                title="Analytics & Tools"
                skills={resumeData.skills.analytics}
                icon={BarChart}
              />
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-6 space-y-6">
            {resumeData.education.map((edu, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{edu.school}</CardTitle>
                  <CardDescription>{edu.degree}</CardDescription>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {edu.location}
                  </CardDescription>
                  <CardDescription>{edu.period}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="certifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Certifications & Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Additional Information</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {resumeData.additionalInfo.map((info, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Resume