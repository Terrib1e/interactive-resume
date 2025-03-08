/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/editor/ResumeEditor.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Trash2, Save } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { ResumeData } from '@/types/resume';

// Create a schema for form validation
const resumeSchema = z.object({
  profile: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    title: z.string().min(2, 'Title must be at least 2 characters'),
    location: z.string(),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string(),
    bio: z.string().min(10, 'Bio must be at least 10 characters'),
    avatar: z.string().optional(),
    links: z
      .object({
        github: z.string().optional(),
        linkedin: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
  }),
  experience: z.array(
    z.object({
      company: z.string().min(2, 'Company name must be at least 2 characters'),
      position: z.string().min(2, 'Position must be at least 2 characters'),
      location: z.string().optional(),
      period: z.string(),
      achievements: z.array(z.string()),
      technologies: z.array(z.string()).optional(),
    }),
  ),
  skills: z.object({
    frontend: z.array(
      z.object({
        name: z.string(),
        level: z.number().min(0).max(100).optional(),
        experience: z.string().optional(),
      }),
    ),
    backend: z.array(
      z.object({
        name: z.string(),
        level: z.number().min(0).max(100).optional(),
        experience: z.string().optional(),
      }),
    ),
    cloud: z
      .array(
        z.object({
          name: z.string(),
          level: z.number().min(0).max(100).optional(),
          experience: z.string().optional(),
        }),
      )
      .optional(),
    databases: z
      .array(
        z.object({
          name: z.string(),
          level: z.number().min(0).max(100).optional(),
          experience: z.string().optional(),
        }),
      )
      .optional(),
    analytics: z
      .array(
        z.object({
          name: z.string(),
          level: z.number().min(0).max(100).optional(),
          experience: z.string().optional(),
        }),
      )
      .optional(),
  }),
  education: z.array(
    z.object({
      school: z.string().min(2, 'School name must be at least 2 characters'),
      degree: z.string().min(2, 'Degree must be at least 2 characters'),
      location: z.string(),
      period: z.string(),
      achievements: z.array(z.string()).optional(),
      gpa: z.number().min(0).max(4).optional(),
    }),
  ),
  projects: z
    .array(
      z.object({
        title: z.string().min(2, 'Project title must be at least 2 characters'),
        description: z.string(),
        period: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        technologies: z.array(z.string()),
        highlights: z.array(z.string()),
        link: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .optional(),
  certifications: z.array(z.string()).optional(),
  additionalInfo: z.array(z.string()).optional(),
});

interface ResumeEditorProps {
  initialData: ResumeData;
  onSave: (data: ResumeData) => void;
}

export function ResumeEditor({ initialData, onSave }: ResumeEditorProps) {
  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
  });

  // Experience field array
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: 'experience',
  });

  // Education field array
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: 'education',
  });

  // Projects field array
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: 'projects',
  });

  // Skills field arrays
  const { fields: frontendSkillFields, append: appendFrontendSkill, remove: removeFrontendSkill } = useFieldArray({ control: form.control, name: 'skills.frontend' });

  const { fields: backendSkillFields, append: appendBackendSkill, remove: removeBackendSkill } = useFieldArray({ control: form.control, name: 'skills.backend' });

  function onSubmit(values: z.infer<typeof resumeSchema>) {
    onSave(values as ResumeData);
  }

  function appendAchievement(experienceIndex: number, value: string = '') {
    const achievements = form.getValues(`experience.${experienceIndex}.achievements`) || [];
    form.setValue(`experience.${experienceIndex}.achievements`, [...achievements, value]);
  }

  function removeAchievement(experienceIndex: number, achievementIndex: number) {
    const achievements = form.getValues(`experience.${experienceIndex}.achievements`) || [];
    form.setValue(
      `experience.${experienceIndex}.achievements`,
      achievements.filter((_, i) => i !== achievementIndex),
    );
  }

  function appendTechnology(experienceIndex: number, value: string = '') {
    const technologies = form.getValues(`experience.${experienceIndex}.technologies`) || [];
    form.setValue(`experience.${experienceIndex}.technologies`, [...technologies, value]);
  }

  function removeTechnology(experienceIndex: number, techIndex: number) {
    const technologies = form.getValues(`experience.${experienceIndex}.technologies`) || [];
    form.setValue(
      `experience.${experienceIndex}.technologies`,
      technologies.filter((_, i) => i !== techIndex),
    );
  }

  function appendProjectHighlight(projectIndex: number, value: string = '') {
    const highlights = form.getValues(`projects.${projectIndex}.highlights`) || [];
    form.setValue(`projects.${projectIndex}.highlights`, [...highlights, value]);
  }

  function removeProjectHighlight(projectIndex: number, highlightIndex: number) {
    const highlights = form.getValues(`projects.${projectIndex}.highlights`) || [];
    form.setValue(
      `projects.${projectIndex}.highlights`,
      highlights.filter((_, i) => i !== highlightIndex),
    );
  }

  function appendProjectTechnology(projectIndex: number, value: string = '') {
    const technologies = form.getValues(`projects.${projectIndex}.technologies`) || [];
    form.setValue(`projects.${projectIndex}.technologies`, [...technologies, value]);
  }

  function removeProjectTechnology(projectIndex: number, techIndex: number) {
    const technologies = form.getValues(`projects.${projectIndex}.technologies`) || [];
    form.setValue(
      `projects.${projectIndex}.technologies`,
      technologies.filter((_, i) => i !== techIndex),
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Accordion type="single" collapsible defaultValue="profile">
                {/* Profile Section */}
                <AccordionItem value="profile">
                  <AccordionTrigger>Profile Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="profile.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="profile.title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="profile.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="profile.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="profile.location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="profile.avatar"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Avatar URL</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Social Links</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="profile.links.github"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>GitHub</FormLabel>
                              <FormControl>
                                <Input placeholder="github.com/username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="profile.links.linkedin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>LinkedIn</FormLabel>
                              <FormControl>
                                <Input placeholder="linkedin.com/in/username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="profile.links.website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input placeholder="example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="profile.bio"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea className="min-h-[120px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>

                {/* Experience Section */}
                <AccordionItem value="experience">
                  <AccordionTrigger>Experience</AccordionTrigger>
                  <AccordionContent>
                    {experienceFields.map((field, index) => (
                      <div key={field.id} className="mb-6 p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold">Experience {index + 1}</h4>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot be undone. This will permanently delete this experience entry.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => removeExperience(index)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`experience.${index}.company`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`experience.${index}.position`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`experience.${index}.location`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`experience.${index}.period`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Period</FormLabel>
                                <FormControl>
                                  <Input placeholder="Jan 2020 to Present" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Achievements */}
                        <div className="mt-4">
                          <FormLabel>Achievements</FormLabel>
                          <div className="space-y-2">
                            {form.watch(`experience.${index}.achievements`)?.map((_, achievementIndex) => (
                              <div key={achievementIndex} className="flex items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`experience.${index}.achievements.${achievementIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeAchievement(index, achievementIndex)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => appendAchievement(index)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Achievement
                            </Button>
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="mt-4">
                          <FormLabel>Technologies</FormLabel>
                          <div className="space-y-2">
                            {form.watch(`experience.${index}.technologies`)?.map((_, techIndex) => (
                              <div key={techIndex} className="flex items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`experience.${index}.technologies.${techIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeTechnology(index, techIndex)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => appendTechnology(index)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Technology
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        appendExperience({
                          company: '',
                          position: '',
                          location: '',
                          period: '',
                          achievements: [],
                          technologies: [],
                        })
                      }
                      className="mt-4"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                {/* Education Section */}
                <AccordionItem value="education">
                  <AccordionTrigger>Education</AccordionTrigger>
                  <AccordionContent>
                    {educationFields.map((field, index) => (
                      <div key={field.id} className="mb-6 p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold">Education {index + 1}</h4>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot be undone. This will permanently delete this education entry.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => removeEducation(index)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`education.${index}.school`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>School</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${index}.degree`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Degree</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${index}.location`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${index}.period`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Period</FormLabel>
                                <FormControl>
                                  <Input placeholder="Aug 2015 to Jun 2019" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        appendEducation({
                          school: '',
                          degree: '',
                          location: '',
                          period: '',
                        })
                      }
                      className="mt-4"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                {/* Skills Section */}
                <AccordionItem value="skills">
                  <AccordionTrigger>Skills</AccordionTrigger>
                  <AccordionContent>
                    {/* Frontend Skills */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Frontend Skills</h4>
                      {frontendSkillFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 mb-2">
                          <FormField
                            control={form.control}
                            name={`skills.frontend.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder="Skill name" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`skills.frontend.${index}.level`}
                            render={({ field }) => (
                              <FormItem className="w-20">
                                <FormControl>
                                  <Input type="number" placeholder="Level" min={0} max={100} {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`skills.frontend.${index}.experience`}
                            render={({ field }) => (
                              <FormItem className="w-32">
                                <FormControl>
                                  <Input placeholder="Experience" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <Button type="button" variant="destructive" size="sm" onClick={() => removeFrontendSkill(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          appendFrontendSkill({
                            name: '',
                            level: 80,
                            experience: '',
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Frontend Skill
                      </Button>
                    </div>

                    {/* Backend Skills */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Backend Skills</h4>
                      {backendSkillFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 mb-2">
                          <FormField
                            control={form.control}
                            name={`skills.backend.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder="Skill name" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`skills.backend.${index}.level`}
                            render={({ field }) => (
                              <FormItem className="w-20">
                                <FormControl>
                                  <Input type="number" placeholder="Level" min={0} max={100} {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`skills.backend.${index}.experience`}
                            render={({ field }) => (
                              <FormItem className="w-32">
                                <FormControl>
                                  <Input placeholder="Experience" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <Button type="button" variant="destructive" size="sm" onClick={() => removeBackendSkill(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          appendBackendSkill({
                            name: '',
                            level: 80,
                            experience: '',
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Backend Skill
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Projects Section */}
                <AccordionItem value="projects">
                  <AccordionTrigger>Projects</AccordionTrigger>
                  <AccordionContent>
                    {projectFields.map((field, index) => (
                      <div key={field.id} className="mb-6 p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold">Project {index + 1}</h4>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot be undone. This will permanently delete this project entry.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => removeProject(index)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`projects.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`projects.${index}.period`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Period</FormLabel>
                                <FormControl>
                                  <Input placeholder="1 Year" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`projects.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="2022-01-01" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`projects.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="2023-01-01" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`projects.${index}.link`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Link</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`projects.${index}.image`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="/images/project.jpg" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`projects.${index}.description`}
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea className="min-h-[80px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Project Technologies */}
                        <div className="mt-4">
                          <FormLabel>Technologies</FormLabel>
                          <div className="space-y-2">
                            {form.watch(`projects.${index}.technologies`)?.map((_, techIndex) => (
                              <div key={techIndex} className="flex items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`projects.${index}.technologies.${techIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeProjectTechnology(index, techIndex)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => appendProjectTechnology(index)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Technology
                            </Button>
                          </div>
                        </div>

                        {/* Project Highlights */}
                        <div className="mt-4">
                          <FormLabel>Highlights</FormLabel>
                          <div className="space-y-2">
                            {form.watch(`projects.${index}.highlights`)?.map((_, highlightIndex) => (
                              <div key={highlightIndex} className="flex items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`projects.${index}.highlights.${highlightIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeProjectHighlight(index, highlightIndex)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => appendProjectHighlight(index)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Highlight
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        appendProject({
                          title: '',
                          description: '',
                          period: '',
                          startDate: '',
                          endDate: '',
                          technologies: [],
                          highlights: [],
                          link: '',
                          image: '',
                        })
                      }
                      className="mt-4"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex justify-end gap-4">
                <Button type="reset" variant="outline">
                  Reset
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
