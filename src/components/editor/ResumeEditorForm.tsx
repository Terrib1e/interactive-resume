// src/components/editor/ResumeEditorForm.tsx
import { useState, useEffect, Key } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Plus, Trash2,Briefcase, GraduationCap, Code, FolderGit2, Award, FileText, CheckCircle2, User } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import type { ResumeData } from '@/types/resume';

// Reusable skill category editor component
interface SkillCategoryEditorProps {
  categoryName: string;
  form: UseFormReturn<any>;
  addSkill: () => void;
  removeSkill: (index: number) => void;
}

function SkillCategoryEditor({ categoryName, form, addSkill, removeSkill }: SkillCategoryEditorProps) {
  const fields = form.watch(`skills.${categoryName}`) || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Skills</h4>
        <Button type="button" variant="outline" size="sm" onClick={addSkill}>
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground border rounded-md">No skills added yet. Click the button above to add your first skill.</div>
      ) : (
        <div className="border rounded-md p-4">
          <div className="grid grid-cols-12 gap-2 mb-2 font-medium text-sm">
            <div className="col-span-5">Skill</div>
            <div className="col-span-3">Level (0-100)</div>
            <div className="col-span-3">Experience</div>
            <div className="col-span-1">Actions</div>
          </div>

          {fields.map((_: any, index: Key | null | undefined) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center mb-2">
              <div className="col-span-5">
                <FormField
                  control={form.control}
                  name={`skills.${categoryName}.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="mb-0">
                      <FormControl>
                        <Input placeholder="e.g. React" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name={`skills.${categoryName}.${index}.level`}
                  render={({ field }) => (
                    <FormItem className="mb-0">
                      <FormControl>
                        <Input type="number" min={0} max={100} {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name={`skills.${categoryName}.${index}.experience`}
                  render={({ field }) => (
                    <FormItem className="mb-0">
                      <FormControl>
                        <Input placeholder="e.g. 3 years" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 flex justify-center">
                <Button type="button" variant="destructive" size="sm" onClick={() => removeSkill(Number(index))}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// List editor component for array-type fields like certifications
interface ListEditorProps {
  items: string[];
  addItem: (value?: string) => void;
  removeItem: (index: number) => void;
  renderField: (index: number) => React.ReactNode;
  emptyMessage: string;
  addButtonLabel: string;
  isTextarea?: boolean;
}

function ListEditor({ items, addItem, removeItem, renderField, emptyMessage, addButtonLabel, isTextarea = false }: ListEditorProps) {
  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground border rounded-md">{emptyMessage}</div>
      ) : (
        <div className="space-y-2">
          {items.map((_, index) => (
            <div key={index} className="flex items-start gap-2">
              {renderField(index)}
              <Button type="button" variant="destructive" size="sm" className={cn(isTextarea ? 'mt-8' : '')} onClick={() => removeItem(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button type="button" variant="outline" size="sm" onClick={() => addItem()}>
        <Plus className="w-4 h-4 mr-2" />
        {addButtonLabel}
      </Button>
    </div>
  );
}

// Main ResumeEditorForm component
interface ResumeEditorFormProps {
  form: UseFormReturn<any>;
  onSubmit?: (values: any) => void;
  setActiveSection?: (section: string | null) => void;
}

export function ResumeEditorForm({ form, onSubmit, setActiveSection }: ResumeEditorFormProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('profile');
  const [formCompletion, setFormCompletion] = useState<Record<string, number>>({});
  const [formValues, setFormValues] = useState<any>({});

  // Track completion status of each section
  useEffect(() => {
    const currentValues = form.getValues();
    const completion: Record<string, number> = {};

    // Profile completion
    const profileFields = Object.keys(currentValues.profile || {}).filter((k) => k !== 'links');
    const filledProfileFields = profileFields.filter((k) => !!currentValues.profile[k]);
    completion.profile = Math.round((filledProfileFields.length / profileFields.length) * 100);

    // Experience completion
    if (currentValues.experience?.length) {
      const expCompletion = currentValues.experience.map((exp: any) => {
        const expFields = ['company', 'position', 'period'];
        const filledExpFields = expFields.filter((k) => !!exp[k]);
        return filledExpFields.length / expFields.length;
      });
      completion.experience = Math.round((expCompletion.reduce((a: number, b: number) => a + b, 0) / expCompletion.length) * 100);
    } else {
      completion.experience = 0;
    }

    // Education completion
    if (currentValues.education?.length) {
      const eduCompletion = currentValues.education.map((edu: any) => {
        const eduFields = ['school', 'degree', 'period'];
        const filledEduFields = eduFields.filter((k) => !!edu[k]);
        return filledEduFields.length / eduFields.length;
      });
      completion.education = Math.round((eduCompletion.reduce((a: number, b: number) => a + b, 0) / eduCompletion.length) * 100);
    } else {
      completion.education = 0;
    }

    // Skills completion
    const skillCategories = Object.keys(currentValues.skills || {});
    if (skillCategories.length) {
      const skillCompletion = skillCategories.map((category) => {
        return (currentValues.skills[category]?.length || 0) > 0 ? 100 : 0;
      });
      completion.skills = Math.round(skillCompletion.reduce<number>((a, b) => a + b, 0) / skillCategories.length);
    } else {
      completion.skills = 0;
    }

    // Projects completion
    if (currentValues.projects?.length) {
      const projCompletion = currentValues.projects.map((proj: any) => {
        const projFields = ['title', 'description', 'period'];
        const filledProjFields = projFields.filter((k) => !!proj[k]);
        return filledProjFields.length / projFields.length;
      });
      completion.projects = Math.round((projCompletion.reduce((a: number, b: number) => a + b, 0) / projCompletion.length) * 100);
    } else {
      completion.projects = 0;
    }

    // Certifications completion
    completion.certifications = (currentValues.certifications?.length || 0) > 0 ? 100 : 0;

    // Additional info completion
    completion.additionalInfo = (currentValues.additionalInfo?.length || 0) > 0 ? 100 : 0;

    setFormCompletion(completion);
  }, [form.watch(), form.getValues]);

  // Update active section when accordion changes
  const handleAccordionChange = (value: string) => {
    setActiveAccordion(value || null);
    if (setActiveSection) {
      setActiveSection(value === '' ? null : value);
    }
  };

  // Watch for form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Update the form values for preview
      setFormValues(value as ResumeData);
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Handle section expansion
  useEffect(() => {
    if (activeAccordion && setActiveSection) {
      setActiveSection(activeAccordion);
    }
  }, [activeAccordion, setActiveSection]);

  // Field arrays for form collections
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: 'experience',
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: 'education',
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: 'projects',
  });

  // Helper functions for managing nested arrays
  function appendAchievement(experienceIndex: number, value: string = '') {
    const achievements = form.getValues(`experience.${experienceIndex}.achievements`) || [];
    form.setValue(`experience.${experienceIndex}.achievements`, [...achievements, value]);
  }

  function removeAchievement(experienceIndex: number, achievementIndex: number) {
    const achievements = form.getValues(`experience.${experienceIndex}.achievements`) || [];
    form.setValue(
      `experience.${experienceIndex}.achievements`,
      achievements.filter((_: any, i: number) => i !== achievementIndex),
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
      technologies.filter((_: any, i: number) => i !== techIndex),
    );
  }

  // Project helper functions
  function appendProjectHighlight(projectIndex: number, value: string = '') {
    const highlights = form.getValues(`projects.${projectIndex}.highlights`) || [];
    form.setValue(`projects.${projectIndex}.highlights`, [...highlights, value]);
  }

  function removeProjectHighlight(projectIndex: number, highlightIndex: number) {
    const highlights = form.getValues(`projects.${projectIndex}.highlights`) || [];
    form.setValue(
      `projects.${projectIndex}.highlights`,
      highlights.filter((_: any, i: number) => i !== highlightIndex),
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
      technologies.filter((_: any, i: number) => i !== techIndex),
    );
  }

  // Education helper functions
  function appendEducationAchievement(educationIndex: number, value: string = '') {
    const achievements = form.getValues(`education.${educationIndex}.achievements`) || [];
    form.setValue(`education.${educationIndex}.achievements`, [...achievements, value]);
  }

  function removeEducationAchievement(educationIndex: number, achievementIndex: number) {
    const achievements = form.getValues(`education.${educationIndex}.achievements`) || [];
    form.setValue(
      `education.${educationIndex}.achievements`,
      achievements.filter((_: any, i: number) => i !== achievementIndex),
    );
  }

  // Skills management functions
  function appendSkill(category: string, skill = { name: '', level: 80, experience: '' }) {
    const skills = form.getValues(`skills.${category}`) || [];
    form.setValue(`skills.${category}`, [...skills, skill]);
  }

  function removeSkill(category: string, index: number) {
    const skills = form.getValues(`skills.${category}`) || [];
    form.setValue(
      `skills.${category}`,
      skills.filter((_: any, i: number) => i !== index),
    );
  }

  // Certifications and additional info functions
  function appendCertification(value: string = '') {
    const certifications = form.getValues('certifications') || [];
    form.setValue('certifications', [...certifications, value]);
  }

  function removeCertification(index: number) {
    const certifications = form.getValues('certifications') || [];
    form.setValue(
      'certifications',
      certifications.filter((_: any, i: number) => i !== index),
    );
  }

  function appendAdditionalInfo(value: string = '') {
    const additionalInfo = form.getValues('additionalInfo') || [];
    form.setValue('additionalInfo', [...additionalInfo, value]);
  }

  function removeAdditionalInfo(index: number) {
    const additionalInfo = form.getValues('additionalInfo') || [];
    form.setValue(
      'additionalInfo',
      additionalInfo.filter((_: any, i: number) => i !== index),
    );
  }

  // Render completion badge
  const renderCompletionBadge = (section: string) => {
    const completion = formCompletion[section] || 0;
    let color = 'bg-red-500';
    if (completion >= 70) color = 'bg-green-500';
    else if (completion >= 30) color = 'bg-yellow-500';

    return (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-xs text-muted-foreground">{completion}%</span>
        {completion === 100 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
      </div>
    );
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit || (() => {}))} className="space-y-6">
            <Accordion type="single" collapsible defaultValue="profile" value={activeAccordion || undefined} onValueChange={handleAccordionChange} className="border rounded-md">
              {/* Profile Section */}
              <AccordionItem value="profile" className="border-b resume-section" data-section="profile">
                <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 data-[state=open]:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span>Profile Information</span>
                  </div>
                  <div className="ml-auto mr-4">{renderCompletionBadge('profile')}</div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 bg-background">
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
                          <FormDescription>Use a publicly accessible image URL</FormDescription>
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
                        <FormDescription>A brief professional summary (3-5 sentences recommended)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Experience Section */}
              <AccordionItem value="experience" className="border-b resume-section" data-section="experience">
                <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 data-[state=open]:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                    <span>Experience</span>
                  </div>
                  <div className="ml-auto mr-4">{renderCompletionBadge('experience')}</div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 bg-background">
                  {experienceFields.length === 0 ? (
                    <div className="text-center py-6 border rounded-lg">
                      <p className="text-muted-foreground mb-4">No experience entries yet</p>
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
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  ) : (
                    experienceFields.map((field, index) => (
                      <div key={field.id} className="mb-6 p-4 border rounded-lg bg-card">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-muted-foreground" />
                            Experience {index + 1}
                          </h4>
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
                                  <Input placeholder="e.g. Acme Corporation" {...field} />
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
                                  <Input placeholder="e.g. Senior Developer" {...field} />
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
                                  <Input placeholder="e.g. San Francisco, CA" {...field} />
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
                        <div className="mt-4 p-3 border rounded-md">
                          <FormLabel className="mb-2 block">Achievements</FormLabel>
                          <div className="space-y-2">
                            {form.watch(`experience.${index}.achievements`)?.map((_: any, achievementIndex: Key | null | undefined) => (
                              <div key={achievementIndex} className="flex items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`experience.${index}.achievements.${achievementIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input placeholder="Describe a significant achievement" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeAchievement(index, Number(achievementIndex))}>
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
                        <div className="mt-4 p-3 border rounded-md">
                          <FormLabel className="mb-2 block">Technologies</FormLabel>
                          <div className="space-y-2">
                            {form.watch(`experience.${index}.technologies`)?.map((_: any, techIndex: Key | null | undefined) => (
                              <div key={techIndex} className="flex items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`experience.${index}.technologies.${techIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input placeholder="e.g. React, Python, AWS" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeTechnology(index, Number(techIndex))}>
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
                    ))
                  )}

                  {experienceFields.length > 0 && (
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
                      Add Another Experience
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Skills Section */}
              <AccordionItem value="skills" className="border-b resume-section" data-section="skills">
                <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 data-[state=open]:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-muted-foreground" />
                    <span>Skills</span>
                  </div>
                  <div className="ml-auto mr-4">{renderCompletionBadge('skills')}</div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 bg-background">
                  {/* Tabs for different skill categories */}
                  <Tabs defaultValue="frontend" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="frontend">Frontend</TabsTrigger>
                      <TabsTrigger value="backend">Backend</TabsTrigger>
                      <TabsTrigger value="cloud">Cloud</TabsTrigger>
                      <TabsTrigger value="databases">Databases</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    {/* Frontend Skills Tab */}
                    <TabsContent value="frontend">
                      <SkillCategoryEditor categoryName="frontend" form={form} addSkill={() => appendSkill('frontend')} removeSkill={(index) => removeSkill('frontend', index)} />
                    </TabsContent>

                    {/* Backend Skills Tab */}
                    <TabsContent value="backend">
                      <SkillCategoryEditor categoryName="backend" form={form} addSkill={() => appendSkill('backend')} removeSkill={(index) => removeSkill('backend', index)} />
                    </TabsContent>

                    {/* Cloud Skills Tab */}
                    <TabsContent value="cloud">
                      <SkillCategoryEditor categoryName="cloud" form={form} addSkill={() => appendSkill('cloud')} removeSkill={(index) => removeSkill('cloud', index)} />
                    </TabsContent>

                    {/* Database Skills Tab */}
                    <TabsContent value="databases">
                      <SkillCategoryEditor categoryName="databases" form={form} addSkill={() => appendSkill('databases')} removeSkill={(index) => removeSkill('databases', index)} />
                    </TabsContent>

                    {/* Analytics Skills Tab */}
                    <TabsContent value="analytics">
                      <SkillCategoryEditor categoryName="analytics" form={form} addSkill={() => appendSkill('analytics')} removeSkill={(index) => removeSkill('analytics', index)} />
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>

              {/* Education Section */}
              <AccordionItem value="education" className="border-b resume-section" data-section="education">
                <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 data-[state=open]:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    <span>Education</span>
                  </div>
                  <div className="ml-auto mr-4">{renderCompletionBadge('education')}</div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 bg-background">
                  {educationFields.length === 0 ? (
                    <div className="text-center py-6 border rounded-lg">
                      <p className="text-muted-foreground mb-4">No education entries yet</p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          appendEducation({
                            school: '',
                            degree: '',
                            location: '',
                            period: '',
                            achievements: [],
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  ) : (
                    educationFields.map((field, index) => (
                      <div key={field.id} className="mb-6 p-4 border rounded-lg bg-card">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                            Education {index + 1}
                          </h4>
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
                                <FormLabel>School / University</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Stanford University" {...field} />
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
                                <FormLabel>Degree / Program</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. B.S. Computer Science" {...field} />
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
                                  <Input placeholder="e.g. Stanford, CA" {...field} />
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
                                  <Input placeholder="e.g. 2016-2020" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`education.${index}.gpa`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>GPA (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 3.8" type="number" step="0.1" min="0" max="4" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || '')} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Achievements */}
                        <div className="mt-4 p-3 border rounded-md">
                          <FormLabel className="mb-2 block">Achievements / Activities (Optional)</FormLabel>
                          <div className="space-y-2">
                            {form.watch(`education.${index}.achievements`)?.map((_: any, achievementIndex: Key | null | undefined) => (
                              <div key={achievementIndex} className="flex items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`education.${index}.achievements.${achievementIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input placeholder="e.g. Dean's List, Research Assistant" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeEducationAchievement(index, Number(achievementIndex))}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => appendEducationAchievement(index)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Achievement
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {educationFields.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        appendEducation({
                          school: '',
                          degree: '',
                          location: '',
                          period: '',
                          achievements: [],
                        })
                      }
                      className="mt-4"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Education
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Projects Section */}
              <AccordionItem value="projects" className="border-b resume-section" data-section="projects">
                <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 data-[state=open]:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-muted-foreground" />
                    <span>Projects</span>
                  </div>
                  <div className="ml-auto mr-4">{renderCompletionBadge('projects')}</div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 bg-background">
                  {projectFields.length === 0 ? (
                    <div className="text-center py-6 border rounded-lg">
                      <p className="text-muted-foreground mb-4">No project entries yet</p>
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
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  ) : (
                    projectFields.map((field, index) => (
                      <div key={field.id} className="mb-6 p-4 border rounded-lg bg-card">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <FolderGit2 className="w-4 h-4 text-muted-foreground" />
                            Project {index + 1}
                          </h4>
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
                                <FormLabel>Project Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. E-commerce Platform" {...field} />
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
                                <FormLabel>Time Period</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 3 Months, 1 Year" {...field} />
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
                                  <Input placeholder="e.g. 2022-01" {...field} />
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
                                <FormLabel>End Date (or "Present")</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 2022-04" {...field} />
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
                                  <Input placeholder="e.g. https://github.com/username/project" {...field} />
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
                                  <Input placeholder="e.g. https://example.com/image.png" {...field} />
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
                                <Textarea className="min-h-[80px]" placeholder="Briefly describe the project, its purpose, and your role" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Project Technologies */}
                        <div className="mt-4 p-3 border rounded-md">
                          <FormLabel className="mb-2 block">Technologies Used</FormLabel>
                          <div className="space-y-2">
                            {form.watch(`projects.${index}.technologies`)?.map((_: any, techIndex: Key | null | undefined) => (
                              <div key={techIndex} className="flex items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`projects.${index}.technologies.${techIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input placeholder="e.g. React, Node.js, MongoDB" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeProjectTechnology(index, Number(techIndex))}>
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
                        <div className="mt-4 p-3 border rounded-md">
                          <FormLabel className="mb-2 block">Key Features / Highlights</FormLabel>
                          <div className="space-y-2">
                            {form.watch(`projects.${index}.highlights`)?.map((_: any, highlightIndex: Key | null | undefined) => (
                              <div key={highlightIndex} className="flex items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`projects.${index}.highlights.${highlightIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input placeholder="e.g. Implemented user authentication system" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeProjectHighlight(index, Number(highlightIndex))}>
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
                    ))
                  )}

                  {projectFields.length > 0 && (
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
                      Add Another Project
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Certifications Section */}
              <AccordionItem value="certifications" className="border-b resume-section" data-section="certifications">
                <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 data-[state=open]:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-muted-foreground" />
                    <span>Certifications</span>
                  </div>
                  <div className="ml-auto mr-4">{renderCompletionBadge('certifications')}</div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 bg-background">
                  <ListEditor
                    items={form.watch('certifications') || []}
                    addItem={appendCertification}
                    removeItem={removeCertification}
                    renderField={(index) => (
                      <FormField
                        control={form.control}
                        name={`certifications.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="e.g. AWS Certified Solutions Architect" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    emptyMessage="No certifications added yet. Add your professional certifications here."
                    addButtonLabel="Add Certification"
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Additional Info Section */}
              <AccordionItem value="additionalInfo" className="resume-section" data-section="additionalInfo">
                <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 data-[state=open]:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span>Additional Information</span>
                  </div>
                  <div className="ml-auto mr-4">{renderCompletionBadge('additionalInfo')}</div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 bg-background">
                  <ListEditor
                    items={form.watch('additionalInfo') || []}
                    addItem={appendAdditionalInfo}
                    removeItem={removeAdditionalInfo}
                    renderField={(index) => (
                      <FormField
                        control={form.control}
                        name={`additionalInfo.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Textarea className="min-h-[100px]" placeholder="e.g. Languages spoken, volunteer work, relevant hobbies, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    emptyMessage="No additional information added yet. Include any other relevant details here."
                    addButtonLabel="Add Information"
                    isTextarea={true}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
