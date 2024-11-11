/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/editor/ResumeEditor.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
} from "@/components/ui/alert-dialog"
import { Plus, Trash2, Save } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { ResumeData } from '@/types/resume'

// Create a schema for form validation
const resumeSchema = z.object({
  profile: z.object({
    name: z.string().min(2),
    title: z.string().min(2),
    location: z.string(),
    email: z.string().email(),
    phone: z.string(),
    bio: z.string().min(10),
  }),
  experience: z.array(z.object({
    company: z.string().min(2),
    position: z.string().min(2),
    location: z.string(),
    period: z.string(),
    achievements: z.array(z.string()),
    technologies: z.array(z.string()).optional(),
  })),
  skills: z.object({
    frontend: z.array(z.object({
      name: z.string(),
      level: z.number().min(0).max(100).optional(),
      experience: z.string().optional(),
    })),
    backend: z.array(z.object({
      name: z.string(),
      level: z.number().min(0).max(100).optional(),
      experience: z.string().optional(),
    })),
    // Add other skill categories as needed
  }),
  education: z.array(z.object({
    school: z.string().min(2),
    degree: z.string().min(2),
    location: z.string(),
    period: z.string(),
  })),
})

interface ResumeEditorProps {
  initialData: ResumeData;
  onSave: (data: ResumeData) => void;
}

export function ResumeEditor({ initialData, onSave }: ResumeEditorProps) {
  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
  })

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } =
    useFieldArray({
      control: form.control,
      name: "experience",
    })

  useFieldArray({
    control: form.control,
    name: "education",
  })

  function onSubmit(values: z.infer<typeof resumeSchema>) {
    onSave(values as ResumeData)
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
                      {/* Add other profile fields */}
                    </div>
                    <FormField
                      control={form.control}
                      name="profile.bio"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
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
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete this
                                  experience entry.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => removeExperience(index)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                        {/* Add experience fields */}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => appendExperience({
                        company: "",
                        position: "",
                        location: "",
                        period: "",
                        achievements: [],
                        technologies: [],
                      })}
                      className="mt-4"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                {/* Add other sections (Skills, Education, etc.) */}
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
  )
}