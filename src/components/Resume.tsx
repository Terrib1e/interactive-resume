// src/components/Resume.tsx
import React, { useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  GraduationCap,
  Code,
  MessageSquare,
  FolderGit2,
  Download,
  Printer,
  Save
} from 'lucide-react'
import { Timeline } from './resume/Timeline'
import { ProjectGallery } from './resume/ProjectGallery'
import { ContactForm } from './contact/ContactForm'
import { SkillCategory } from './resume/Skills'
import { Education } from './resume/Education'
import { Profile } from './resume/Profile'
import { FadeIn } from './animations/fade-in'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import type { ResumeData } from '@/types/resume'
import { Experience } from './resume/Experience'
import { useMediaQuery } from '@/hooks/use-media-query.ts'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface ResumeProps {
  data: ResumeData;
  template?: string;
  onSaveTemplate?: (template: string) => void;
}

const Resume: React.FC<ResumeProps> = ({
  data,
  template = 'modern',
  onSaveTemplate
}) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  // Function to handle printing
  const handlePrint = () => {
    window.print();
    toast({
      title: "Print dialog opened",
      description: "Your resume is ready to print",
    });
  };

  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    toast({
      title: "Preparing PDF",
      description: "Please wait while we prepare your resume",
    });

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${data.profile.name.replace(/\s+/g, '_')}_resume.pdf`);

      toast({
        title: "PDF Downloaded",
        description: "Your resume has been downloaded as a PDF",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Function to save the current template
  const handleSaveTemplate = () => {
    if (onSaveTemplate) {
      onSaveTemplate(template);
      toast({
        title: "Template Saved",
        description: "Your template preference has been saved",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-3 md:p-6 print:p-0 print:bg-white">
      <div className="max-w-5xl mx-auto space-y-4 md:space-y-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-end print:hidden">
          <Button
            variant="outline"
            size={isSmallScreen ? "sm" : "default"}
            onClick={handleSaveTemplate}
            className="flex items-center gap-1"
          >
            <Save className="w-4 h-4" />
            <span className="hidden md:inline">Save Template</span>
          </Button>
          <Button
            variant="outline"
            size={isSmallScreen ? "sm" : "default"}
            onClick={handlePrint}
            className="flex items-center gap-1"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden md:inline">Print</span>
          </Button>
          <Button
            variant="default"
            size={isSmallScreen ? "sm" : "default"}
            onClick={handleDownloadPDF}
            className="flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">Download PDF</span>
          </Button>
        </div>

        <div ref={resumeRef} className="print:pt-0">
          <FadeIn>
            <Profile data={data.profile} />
          </FadeIn>

          <Card className="mt-4 print:shadow-none print:border-none">
            <CardContent className="p-4 md:p-6">
              <Tabs defaultValue="experience" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 print:hidden">
                  <TabsTrigger value="experience">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className={isSmallScreen ? "hidden" : ""}>Experience</span>
                  </TabsTrigger>
                  <TabsTrigger value="timeline">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className={isSmallScreen ? "hidden" : ""}>Timeline</span>
                  </TabsTrigger>
                  <TabsTrigger value="skills">
                    <Code className="w-4 h-4 mr-2" />
                    <span className={isSmallScreen ? "hidden" : ""}>Skills</span>
                  </TabsTrigger>
                  <TabsTrigger value="education">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span className={isSmallScreen ? "hidden" : ""}>Education</span>
                  </TabsTrigger>
                  <TabsTrigger value="projects">
                    <FolderGit2 className="w-4 h-4 mr-2" />
                    <span className={isSmallScreen ? "hidden" : ""}>Projects</span>
                  </TabsTrigger>
                  <TabsTrigger value="contact">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span className={isSmallScreen ? "hidden" : ""}>Contact</span>
                  </TabsTrigger>
                </TabsList>

                {/* For printing, show all sections */}
                <div className="hidden print:block space-y-8">
                  <h2 className="text-xl font-bold">Experience</h2>
                  <div className="space-y-6">
                    {data.experience.map((exp, index) => (
                      <Experience key={index} experience={exp} />
                    ))}
                  </div>

                  <h2 className="text-xl font-bold mt-6">Skills</h2>
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

                  <h2 className="text-xl font-bold mt-6">Education</h2>
                  <div className="space-y-6">
                    {data.education.map((edu, index) => (
                      <Education key={index} education={edu} />
                    ))}
                  </div>

                  <h2 className="text-xl font-bold mt-6">Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.projects?.slice(0, 4).map((project, index) => (
                      <div key={index} className="border p-4 rounded-md">
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive tabs for screen view */}
                <TabsContent value="experience" className="mt-6 print:hidden">
                  <div className="space-y-6">
                    {data.experience.map((exp, index) => (
                      <FadeIn key={index} delay={index * 0.1}>
                        <Experience experience={exp} />
                      </FadeIn>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="mt-6 print:hidden">
                  <Timeline experiences={data.experience} />
                </TabsContent>

                <TabsContent value="skills" className="mt-6 print:hidden">
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

                <TabsContent value="education" className="mt-6 print:hidden">
                  <div className="space-y-6">
                    {data.education.map((edu, index) => (
                      <FadeIn key={index} delay={index * 0.1}>
                        <Education education={edu} />
                      </FadeIn>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="mt-6 print:hidden">
                  <ProjectGallery projects={data.projects || []} />
                </TabsContent>

                <TabsContent value="contact" className="mt-6 print:hidden">
                  <div className="max-w-2xl mx-auto">
                    <ContactForm />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Resume