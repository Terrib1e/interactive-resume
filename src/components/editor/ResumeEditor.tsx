/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Save, Eye, Pencil, Briefcase, GraduationCap, Code, FolderGit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';
import { useLanguage } from '@/hooks/use-language';
import type { ResumePreviewProps,ResumeData, Skill } from '@/types/resume';
import ResumePreview from '../resume/ResumePreview';

interface ResumeEditorProps {
  initialData: ResumeData;
  onSave?: (data: ResumeData) => void;
  template?: string;
  isSplitView?: boolean;
}


export function ResumeEditor({ initialData, onSave, template = 'modern', isSplitView = false }: ResumeEditorProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  const debouncedResumeData = useDebounce(resumeData, 500);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Auto-save effect that would connect to a backend in a real application
  useEffect(() => {
    // This would be an API call in a real application
    console.log('Auto-saving resume data:', debouncedResumeData);

    // Simulated successful autosave
    const autosaveTimeout = setTimeout(() => {
      // This is where you'd handle the response from your API
      console.log('Resume data auto-saved');
    }, 1000);

    return () => clearTimeout(autosaveTimeout);
  }, [debouncedResumeData]);

  // Handle profile data changes
  const handleProfileChange = (field: keyof typeof resumeData.profile, value: string) => {
    setResumeData({
      ...resumeData,
      profile: {
        ...resumeData.profile,
        [field]: value,
      },
    });
  };

  // Handle experience changes
  const handleExperienceChange = (index: number, field: keyof (typeof resumeData.experience)[0], value: string) => {
    const updatedExperiences = [...resumeData.experience];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };

    setResumeData({
      ...resumeData,
      experience: updatedExperiences,
    });
  };

  // Add new experience
  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: 'New Company',
          position: 'Position',
          startDate: new Date().toISOString().split('T')[0],
          endDate: '',
          description: 'Describe your role and achievements',
          location: 'City, Country',
          current: true,
        } as unknown as (typeof resumeData.experience)[0],
      ],
    });

    toast({
      title: 'Experience Added',
      description: 'A new experience entry has been added.',
    });
  };

  // Remove experience
  const removeExperience = (index: number) => {
    const updatedExperiences = [...resumeData.experience];
    updatedExperiences.splice(index, 1);

    setResumeData({
      ...resumeData,
      experience: updatedExperiences,
    });

    toast({
      title: 'Experience Removed',
      description: 'The experience entry has been removed.',
    });
  };

  // Handle education changes
  const handleEducationChange = (index: number, field: keyof (typeof resumeData.education)[0], value: string) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  // Add new education
  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          institution: 'New Institution',
          degree: 'Degree',
          field: 'Field of Study',
          startDate: new Date().toISOString().split('T')[0],
          endDate: '',
          current: true,
          school: 'New Institution', // Required by Education type
          location: 'City, Country', // Required by Education type
          period: 'Present', // Required by Education type
          gpa: '', // Required by Education type
          achievements: false // Required by Education type
        },
      ],
    });

    toast({
      title: 'Education Added',
      description: 'A new education entry has been added.',
    });
  };

  // Remove education
  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });

    toast({
      title: 'Education Removed',
      description: 'The education entry has been removed.',
    });
  };

  // Handle skills changes
  const handleSkillChange = (category: keyof typeof resumeData.skills, index: number, value: string) => {
    const updatedSkills = { ...resumeData.skills };
    updatedSkills[category][index] = { name: value } as Skill;

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  // Add new skill
  const addSkill = (category: keyof typeof resumeData.skills) => {
    setResumeData({
      ...resumeData,
      skills: {
        ...resumeData.skills,
        [category]: [...resumeData.skills[category], 'New Skill'],
      },
    });

    toast({
      title: 'Skill Added',
      description: `A new skill has been added to ${category}.`,
    });
  };

  // Remove skill
  const removeSkill = (category: keyof typeof resumeData.skills, index: number) => {
    const updatedSkills = { ...resumeData.skills };
    updatedSkills[category] = updatedSkills[category].filter((_, i) => i !== index);

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });

    toast({
      title: 'Skill Removed',
      description: `The skill has been removed from ${category}.`,
    });
  };

  // Handle projects changes
  const handleProjectChange = (index: number, field: keyof (typeof resumeData.projects)[0], value: string) => {
    if (!resumeData.projects) return;

    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };

    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  // Add new project
  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...(resumeData.projects || []),
        {
          title: 'New Project',
          description: 'Project description',
          link: '',
          technologies: ['Technology 1', 'Technology 2'],
          image: '',
          startDate: new Date().toISOString().split('T')[0],
          endDate: '',
          period: '',
          highlights: [],
        },
      ],
    });

    toast({
      title: 'Project Added',
      description: 'A new project has been added.',
    });
  };

  // Remove project
  const removeProject = (index: number) => {
    if (!resumeData.projects) return;

    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);

    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });

    toast({
      title: 'Project Removed',
      description: 'The project has been removed.',
    });
  };

  // Save all changes
  const saveAllChanges = () => {
    if (onSave) {
      onSave(resumeData);
    }

    // This would be an API call in a real application
    localStorage.setItem('resume_data', JSON.stringify(resumeData));

    toast({
      title: 'Resume Saved',
      description: 'All your changes have been saved successfully.',
    });
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {t('resume')} {isPreviewMode ? t('preview') : t('editor')}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={togglePreviewMode} className="flex items-center gap-1">
            {isPreviewMode ? (
              <>
                <Pencil className="h-4 w-4" />
                <span>{t('edit')}</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span>{t('preview')}</span>
              </>
            )}
          </Button>
          <Button variant="default" size="sm" onClick={saveAllChanges} className="flex items-center gap-1">
            <Save className="h-4 w-4" />
            <span>{t('save')}</span>
          </Button>
        </div>
      </div>

      {isPreviewMode ? (
              <ResumePreview data={resumeData}
                template={template}
                onEdit={() => {
                  setIsPreviewMode(false);
                }}
                isSplitView={isSplitView}
              />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t('resumeEditor')}</CardTitle>
            <CardDescription>{t('editResumeDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeSection} onValueChange={setActiveSection}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                <TabsTrigger value="profile" className="flex items-center gap-1">
                  <Pencil className="h-4 w-4" /> {t('profile')}
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {t('experience')}
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" /> {t('education')}
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-1">
                  <Code className="h-4 w-4" /> {t('skills')}
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-1">
                  <FolderGit2 className="h-4 w-4" /> {t('projects')}
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                {/* Profile Section */}
                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('name')}</Label>
                      <Input id="name" value={resumeData.profile.name} onChange={(e) => handleProfileChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">{t('title')}</Label>
                      <Input id="title" value={resumeData.profile.title} onChange={(e) => handleProfileChange('title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('email')}</Label>
                      <Input id="email" type="email" value={resumeData.profile.email} onChange={(e) => handleProfileChange('email', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('phone')}</Label>
                      <Input id="phone" value={resumeData.profile.phone} onChange={(e) => handleProfileChange('phone', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">{t('location')}</Label>
                      <Input id="location" value={resumeData.profile.location} onChange={(e) => handleProfileChange('location', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">{t('website')}</Label>
                      <Input id="website" value={resumeData.profile.website} onChange={(e) => handleProfileChange('website', e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">{t('summary')}</Label>
                    <Textarea id="summary" rows={4} value={resumeData.profile.summary} onChange={(e) => handleProfileChange('summary', e.target.value)} />
                  </div>
                </TabsContent>

                {/* Experience Section */}
                <TabsContent value="experience" className="space-y-4">
                  {resumeData.experience.map((exp, index) => (
                    <Card key={index} className="border border-border">
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{exp.company}</CardTitle>
                          <Button variant="destructive" size="sm" onClick={() => removeExperience(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`company-${index}`}>{t('company')}</Label>
                          <Input id={`company-${index}`} value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`position-${index}`}>{t('position')}</Label>
                          <Input id={`position-${index}`} value={exp.position} onChange={(e) => handleExperienceChange(index, 'position', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`location-${index}`}>{t('location')}</Label>
                          <Input id={`location-${index}`} value={exp.location} onChange={(e) => handleExperienceChange(index, 'location', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${index}`}>{t('startDate')}</Label>
                          <Input id={`startDate-${index}`} type="date" value={exp.startDate} onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${index}`}>
                            {t('endDate')}
                            {exp.current && <span className="ml-2 text-sm text-muted-foreground">({t('current')})</span>}
                          </Label>
                          <Input id={`endDate-${index}`} type="date" value={exp.endDate} disabled={exp.current} onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)} />
                        </div>
                        <div className="space-y-2 flex items-center">
                          <Label htmlFor={`current-${index}`} className="flex items-center space-x-2">
                            <input
                              id={`current-${index}`}
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => handleExperienceChange(index, 'current', e.target.checked.toString())}
                              className="form-checkbox"
                            />
                            <span>{t('currentPosition')}</span>
                          </Label>
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor={`description-${index}`}>{t('description')}</Label>
                          <Textarea id={`description-${index}`} rows={4} value={exp.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button onClick={addExperience} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> {t('addExperience')}
                  </Button>
                </TabsContent>

                {/* Education Section */}
                <TabsContent value="education" className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <Card key={index} className="border border-border">
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{edu.institution}</CardTitle>
                          <Button variant="destructive" size="sm" onClick={() => removeEducation(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`institution-${index}`}>{t('institution')}</Label>
                          <Input id={`institution-${index}`} value={edu.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${index}`}>{t('degree')}</Label>
                          <Input id={`degree-${index}`} value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`field-${index}`}>{t('field')}</Label>
                          <Input id={`field-${index}`} value={edu.field} onChange={(e) => handleEducationChange(index, 'field', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-edu-${index}`}>{t('startDate')}</Label>
                          <Input id={`startDate-edu-${index}`} type="date" value={edu.startDate} onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-edu-${index}`}>
                            {t('endDate')}
                            {edu.current && <span className="ml-2 text-sm text-muted-foreground">({t('current')})</span>}
                          </Label>
                          <Input id={`endDate-edu-${index}`} type="date" value={edu.endDate} disabled={edu.current} onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)} />
                        </div>
                        <div className="space-y-2 flex items-center">
                          <Label htmlFor={`current-edu-${index}`} className="flex items-center space-x-2">
                            <input
                              id={`current-edu-${index}`}
                              type="checkbox"
                              checked={edu.current}
                              onChange={(e) => handleEducationChange(index, 'current', e.target.checked.toString())}
                              className="form-checkbox"
                            />
                            <span>{t('currentlyStudying')}</span>
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button onClick={addEducation} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> {t('addEducation')}
                  </Button>
                </TabsContent>

                {/* Skills Section */}
                <TabsContent value="skills" className="space-y-6">
                  {/* Frontend Skills */}
                  <Card className="border border-border">
                    <CardHeader className="py-3">
                      <CardTitle>Frontend Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {resumeData.skills.frontend.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input value={skill.name} onChange={(e) => handleSkillChange('frontend', index, e.target.value)} />
                          <Button variant="destructive" size="sm" onClick={() => removeSkill('frontend', index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button onClick={() => addSkill('frontend')} variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Add Frontend Skill
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Backend Skills */}
                  <Card className="border border-border">
                    <CardHeader className="py-3">
                      <CardTitle>Backend Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {resumeData.skills.backend.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input value={skill.name} onChange={(e) => handleSkillChange('backend', index, e.target.value)} />
                          <Button variant="destructive" size="sm" onClick={() => removeSkill('backend', index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button onClick={() => addSkill('backend')} variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Add Backend Skill
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Other Skills (database, devops, tools, etc.) */}
                  {/* You can add more skill categories as needed */}
                </TabsContent>

                {/* Projects Section */}
                <TabsContent value="projects" className="space-y-4">
                  {resumeData.projects?.map((project, index) => (
                    <Card key={index} className="border border-border">
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <Button variant="destructive" size="sm" onClick={() => removeProject(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`project-title-${index}`}>{t('title')}</Label>
                          <Input id={`project-title-${index}`} value={project.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-link-${index}`}>{t('link')}</Label>
                          <Input id={`project-link-${index}`} value={project.link} onChange={(e) => handleProjectChange(index, 'link', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-image-${index}`}>{t('imageUrl')}</Label>
                          <Input id={`project-image-${index}`} value={project.image} onChange={(e) => handleProjectChange(index, 'image', e.target.value)} />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor={`project-description-${index}`}>{t('description')}</Label>
                          <Textarea id={`project-description-${index}`} rows={3} value={project.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} />
                        </div>
                        {/* Technologies would need a more complex editor for array handling */}
                      </CardContent>
                    </Card>
                  ))}

                  <Button onClick={addProject} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> {t('addProject')}
                  </Button>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
