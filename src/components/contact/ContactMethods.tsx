// src/components/contact/ContactMethods.tsx
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import type { Profile } from "@/types/resume";

interface ContactMethodsProps {
  profile: Profile;
}

export function ContactMethods({ profile }: ContactMethodsProps) {
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
        variant: "default",
      });
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Copy failed",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const getButtonText = (label: string) => {
    if (label === "Email") return "Send";
    if (label === "Phone") return "Call";
    return "View";
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      copyText: profile.email,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone}`,
      copyText: profile.phone,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(
        profile.location
      )}`,
      copyText: profile.location,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  const socialLinks = [
    ...(profile.links.github
      ? [
          {
            icon: Github,
            label: "GitHub",
            value: `@${profile.links.github}`,
            href: `https://github.com/${profile.links.github}`,
            color: "text-gray-700 dark:text-gray-300",
          },
        ]
      : []),
    ...(profile.links.linkedin
      ? [
          {
            icon: Linkedin,
            label: "LinkedIn",
            value: profile.links.linkedin,
            href: `https://linkedin.com/in/${profile.links.linkedin}`,
            color: "text-blue-700",
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      {/* Direct Contact Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Direct Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg ${method.bgColor} border border-gray-200 dark:border-gray-700`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <method.icon className={`w-5 h-5 ${method.color}`} />
                  <div>
                    <div className="font-medium text-sm">{method.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {method.value}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {" "}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(method.copyText, method.label)
                    }
                    className="h-8 w-8 p-0"
                    title={`Copy ${method.label}`}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" asChild className="h-8">
                    <a
                      href={method.href}
                      target={
                        method.label === "Location" ? "_blank" : undefined
                      }
                      rel={
                        method.label === "Location"
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {getButtonText(method.label)}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Social & Professional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-4"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <social.icon className={`w-5 h-5 ${social.color}`} />
                      <div className="text-left">
                        <div className="font-medium">{social.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {social.value}
                        </div>
                      </div>
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Contact Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Badge variant="secondary" className="px-3 py-1">
          ⚡ Usually responds within 24 hours
        </Badge>
        <Badge variant="secondary" className="px-3 py-1">
          🌍 Open to relocation
        </Badge>
        <Badge variant="secondary" className="px-3 py-1">
          💼 Available for new opportunities
        </Badge>
      </motion.div>
    </div>
  );
}
