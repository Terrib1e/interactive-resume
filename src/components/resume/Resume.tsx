// src/components/Resume.tsx
import React from "react";
import {
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  Briefcase,
  GraduationCap,
  Code,
  MessageSquare,
  FolderGit2,
  Github,
  Sun,
  Moon,
} from "lucide-react";
import { ProjectGallery } from "./ProjectGallery";
import { ContactForm } from "../contact/ContactForm";
import { ContactMethods } from "../contact/ContactMethods";
import { Education } from "./Education";
import { HeroSection } from "./HeroSection";
import { FadeIn } from "../animations/fade-in";
import { Experience } from "./Experience";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/types/resume";
import { GitHubProjects } from "./GithubProjects";
import { SkillsSection } from "./SkillsSection";
import { Certifications } from "./Certifications";

interface ResumeProps {
  data: ResumeData;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const githubUsername = import.meta.env.GITHUB_USERNAME ?? "terrib1e";

const Resume: React.FC<ResumeProps> = ({ data, activeTab, onTabChange }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div
      className="min-h-screen bg-background dark:bg-dark-bg"
      id="resume-main"
    >
      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 rounded-full w-10 h-10 bg-background/80 backdrop-blur-sm"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Hero Section */}
      <header>
        <HeroSection
          profile={data.profile}
          onContactClick={() => onTabChange?.("contact")}
        />
      </header>

      {/* Main Content */}
      <main
        className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
        id="resume-scroll-target"
      >
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl border-none overflow-hidden">
          <CardContent className="p-0">
            <Tabs
              defaultValue="experience"
              value={activeTab}
              onValueChange={onTabChange}
              className="w-full"
            >
              <div className="bg-primary-50 dark:bg-gray-800 border-b px-2 sm:px-4 py-2">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 bg-muted/50">
                  <TabsTrigger
                    value="experience"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-600 text-xs sm:text-sm"
                  >
                    <Briefcase
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                      aria-hidden="true"
                    />
                    <span className="hidden md:inline">Experience</span>
                    <span className="inline md:hidden">Work</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-600 text-xs sm:text-sm"
                  >
                    <Code
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                      aria-hidden="true"
                    />
                    <span>Skills</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-600 text-xs sm:text-sm"
                  >
                    <GraduationCap
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                      aria-hidden="true"
                    />
                    <span className="hidden md:inline">Education</span>
                    <span className="inline md:hidden">Edu</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-600 text-xs sm:text-sm"
                  >
                    <FolderGit2
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                      aria-hidden="true"
                    />
                    <span>Projects</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="github"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-600 text-xs sm:text-sm"
                  >
                    <Github
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                      aria-hidden="true"
                    />
                    <span>GitHub</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="contact"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-blue-600 text-xs sm:text-sm"
                  >
                    <MessageSquare
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                      aria-hidden="true"
                    />
                    <span>Contact</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab contents */}
              <div className="p-4 sm:p-6">
                {/* Experience Tab */}
                <TabsContent
                  value="experience"
                  className="mt-0 animate-fade-in"
                  data-section="experience"
                >
                  <h2 className="text-2xl font-bold mb-6 text-primary-700 dark:text-blue-300">
                    Professional Experience
                  </h2>{" "}
                  <div className="space-y-6">
                    {" "}
                    {data.experience.map((exp) => (
                      <div
                        key={exp.company + exp.position}
                        className="animate-slide-up animate-delay-100"
                      >
                        <Experience experience={exp} />
                      </div>
                    ))}
                  </div>
                </TabsContent>{" "}
                {/* Skills Tab */}
                <TabsContent
                  value="skills"
                  className="mt-0 animate-fade-in"
                  data-section="skills"
                >
                  <h2 className="text-2xl font-bold mb-6 text-primary-700 dark:text-blue-300">
                    Technical Skills
                  </h2>
                  <SkillsSection skills={data.skills} />
                </TabsContent>
                {/* Education Tab */}
                <TabsContent
                  value="education"
                  className="mt-0 animate-fade-in"
                  data-section="education"
                >
                  <h2 className="text-2xl font-bold mb-6 text-primary-700 dark:text-blue-300">
                    Education & Certifications
                  </h2>
                  <div className="space-y-6">
                    {" "}
                    {data.education.map((edu) => (
                      <FadeIn key={edu.school + edu.degree} delay={0.1}>
                        <Education education={edu} />
                      </FadeIn>
                    ))}
                    {data.certifications && data.certifications.length > 0 && (
                      <div className="mt-10">
                        <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-blue-400">
                          Certifications
                        </h3>
                        <Certifications certifications={data.certifications} />
                      </div>
                    )}
                  </div>
                </TabsContent>
                {/* Certifications Tab */}
                {/* <TabsContent value="certifications" className="mt-0 animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6 text-primary-700 dark:text-blue-300">Professional Certifications</h2>
                  {data.certifications && data.certifications.length > 0 ? (
                    <Certifications certifications={data.certifications} />
                  ) : (
                    <p className="text-muted-foreground">No certifications added yet.</p>
                  )}
                </TabsContent> */}
                {/* Projects Tab */}
                <TabsContent
                  value="projects"
                  className="mt-0 animate-fade-in"
                  data-section="projects"
                >
                  <h2 className="text-2xl font-bold mb-6 text-primary-700 dark:text-blue-300">
                    Featured Projects
                  </h2>
                  <ProjectGallery projects={data.projects || []} />
                </TabsContent>
                {/* GitHub Tab */}
                <TabsContent
                  value="github"
                  className="mt-0 animate-fade-in"
                  data-section="github"
                >
                  <h2 className="text-2xl font-bold mb-6 text-primary-700 dark:text-blue-300">
                    GitHub Repositories
                  </h2>
                  <GitHubProjects username={githubUsername} count={6} />
                </TabsContent>{" "}
                {/* Contact Tab */}
                <TabsContent
                  value="contact"
                  className="mt-0 animate-fade-in"
                  data-section="contact"
                >
                  <h2 className="text-2xl font-bold mb-6 text-primary-700 dark:text-blue-300">
                    Get In Touch
                  </h2>
                  <div id="contact" className="space-y-8">
                    {/* Contact Methods */}
                    <div className="max-w-4xl mx-auto">
                      <ContactMethods profile={data.profile} />
                    </div>

                    {/* Contact Form */}
                    <div className="max-w-2xl mx-auto">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Send me a message
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Fill out the form below and I'll get back to you as
                          soon as possible.
                        </p>
                      </div>
                      <ContactForm />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-primary-800 dark:bg-gray-900 text-white/80 text-center mt-12">
        <div className="container mx-auto px-6">
          <p>
            © {new Date().getFullYear()} {data.profile.name}. All rights
            reserved.
          </p>
          <div className="flex justify-center gap-4 mt-3">
            {" "}
            {data.profile.links?.github && (
              <a
                href={`https://github.com/${data.profile.links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label={`Visit ${data.profile.name}'s GitHub profile`}
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
            )}{" "}
            {data.profile.links?.linkedin && (
              <a
                href={`https://linkedin.com/in/${data.profile.links.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label={`Visit ${data.profile.name}'s LinkedIn profile`}
                title="LinkedIn Profile"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}{" "}
            {data.profile.links?.website && (
              <a
                href={`https://${data.profile.links.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label={`Visit ${data.profile.name}'s personal website`}
                title="Personal Website"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c-1.657 0-3-4.03-3-9s1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resume;
