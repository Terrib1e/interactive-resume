// src/components/ContactForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label'; // Assuming Label is separate or use FormLabel
import { toast } from '@/hooks/use-toast'; // Import your toast function
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'; // Assuming Shadcn UI Form component

// Define the validation schema using Zod (can be imported if defined elsewhere)
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  // Optional: Add a honeypot field for basic spam protection if needed by Formspree (check their docs)
  // _gotcha: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const FORMSPREE_ENDPOINT_URL = 'https://formspree.io/f/xovdekll'; // Your Formspree URL

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    setSubmitStatus('idle'); // Reset status on new submission

    try {
      const response = await fetch(FORMSPREE_ENDPOINT_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json', // Important: Ask Formspree for a JSON response
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Handle successful submission (response.ok means status 200-299)
        setSubmitStatus('success');
        toast({
          title: 'Message Sent!',
          description: 'Thanks for reaching out. I will get back to you soon.',
          variant: 'default', // Or 'success' if you have one
        });
        form.reset(); // Clear the form
      } else {
        // Handle errors (e.g., Formspree validation errors, server issues)
        const errorData = await response.json().catch(() => ({})); // Try to parse error, default to empty object
        console.error('Formspree submission error:', errorData);
        setSubmitStatus('error');
        toast({
          title: 'Submission Failed',
          description: errorData.error || 'Could not send message. Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error submitting form:', error);
      setSubmitStatus('error');
      toast({
        title: 'Network Error',
        description: 'Could not connect to send message. Please check your connection.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject of your message" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message..."
                  rows={5}
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Optional: Honeypot field for spam protection - must be hidden */}
        {/* <FormField
          control={form.control}
          name="_gotcha"
          render={({ field }) => (
            <FormItem className="hidden" style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <FormLabel>Don't fill this out</FormLabel>
              <FormControl>
                <Input tabIndex={-1} autoComplete="off" {...field} />
              </FormControl>
            </FormItem>
          )}
        /> */}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>

        {/* Optional: Display simple status messages directly if not relying solely on toasts */}
        {/* {submitStatus === 'success' && <p className="text-green-600">Message sent successfully!</p>}
        {submitStatus === 'error' && <p className="text-red-600">Failed to send message.</p>} */}
      </form>
    </Form>
  );
}