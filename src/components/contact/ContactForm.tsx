// src/components/ContactForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast"; // Import your toast function
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Assuming Shadcn UI Form component

// Define the validation schema using Zod (can be imported if defined elsewhere)
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  // Honeypot field for spam protection
  _gotcha: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Updated Formspree endpoint - make sure this is your actual endpoint
const FORMSPREE_ENDPOINT_URL = "https://formspree.io/f/xovdekll"; // Your Formspree URL

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      _gotcha: "", // Honeypot field
    },
  });
  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Check honeypot field - if filled, it's likely spam
    if (values._gotcha) {
      console.log("Spam detected via honeypot");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          _replyto: values.email, // This tells Formspree which email to reply to
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        toast({
          title: "Message Sent Successfully! 🎉",
          description:
            "Thank you for reaching out! I will get back to you within 24 hours.",
          variant: "default",
        });
        form.reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Formspree submission error:", errorData);
        setSubmitStatus("error");
        toast({
          title: "Submission Failed",
          description:
            errorData.error ??
            "Could not send message. Please try again or email me directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Network error submitting form:", error);
      setSubmitStatus("error");
      toast({
        title: "Network Error",
        description:
          "Could not connect to send message. Please check your connection and try again.",
        variant: "destructive",
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
                <Input
                  placeholder="Your Name"
                  {...field}
                  disabled={isSubmitting}
                />
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
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  {...field}
                  disabled={isSubmitting}
                />
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
                <Input
                  placeholder="Subject of your message"
                  {...field}
                  disabled={isSubmitting}
                />
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
        />{" "}
        {/* Honeypot field for spam protection - must be hidden */}
        <FormField
          control={form.control}
          name="_gotcha"
          render={({ field }) => (
            <FormItem
              className="hidden"
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <FormLabel>Don't fill this out if you're human</FormLabel>
              <FormControl>
                <Input tabIndex={-1} autoComplete="off" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        {/* Helpful contact information */}
        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>You can also reach me directly at:</p>
          <a
            href="mailto:elijahclark@protonmail.com"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline"
          >
            elijahclark@protonmail.com
          </a>{" "}
        </div>
        {/* Optional status display */}
        {submitStatus === "success" && (
          <div className="text-center text-sm text-green-600 dark:text-green-400">
            ✅ Message sent successfully!
          </div>
        )}
        {submitStatus === "error" && (
          <div className="text-center text-sm text-red-600 dark:text-red-400">
            ❌ Failed to send message. Please try again.
          </div>
        )}
      </form>
    </Form>
  );
}
