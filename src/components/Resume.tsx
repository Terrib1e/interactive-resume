// src/components/Resume.tsx
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  GraduationCap,
  Code,
  MessageSquare,
  FolderGit2
} from 'lucide-react'
import { Timeline } from './resume/Timeline'
import { ProjectGallery } from './resume/ProjectGallery'
import { ContactForm } from './contact/ContactForm'
import { SkillCategory } from './resume/Skills'
import { Education } from './resume/Education'
import { Profile } from './resume/Profile'
import { FadeIn } from './animations/fade-in'
import type { ResumeData } from '@/types/resume'
import { Experience } from './resume/Experience'

interface ResumeProps {
  data: ResumeData
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <FadeIn>
          <Profile data={data.profile} />
        </FadeIn>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
                <TabsTrigger value="experience">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="timeline">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="skills">
                  <Code className="w-4 h-4 mr-2" />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="education">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="projects">
                  <FolderGit2 className="w-4 h-4 mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact
                </TabsTrigger>
              </TabsList>

              <TabsContent value="experience" className="mt-6">
                <div className="space-y-6">
                  {data.experience.map((exp, index) => (
                    <FadeIn key={index} delay={index * 0.1}>
                      <Experience experience={exp} />
                    </FadeIn>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <Timeline experiences={data.experience} />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SkillCategory
                    title="Frontend"
                    skills={data.skills.frontend}
                    icon={Code}
                  />
                  <SkillCategory
                    title="Backend"
                    skills={data.skills.backend}
                    icon={Code}
                  />
                  {/* Add other skill categories */}
                </div>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <FadeIn key={index} delay={index * 0.1}>
                      <Education education={edu} />
                    </FadeIn>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <ProjectGallery projects={data.projects || []} />
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                <div className="max-w-2xl mx-auto">
                  <ContactForm />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Resume