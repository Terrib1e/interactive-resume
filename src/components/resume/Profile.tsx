import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Github, Linkedin, Globe } from 'lucide-react'
import type { Profile as ProfileType } from '@/types/resume'

interface ProfileProps {
  data: ProfileType
}

export const Profile: React.FC<ProfileProps> = ({ data }) => {
const getInitials = (name: string) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-2 border-primary">
            <AvatarImage src={data.avatar} alt={data.name} />
            <AvatarFallback>{getInitials(data.name)}</AvatarFallback>
          </Avatar>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div>
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="text-muted-foreground">{data.title}</p>
              <p className="text-sm text-muted-foreground">{data.location}</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${data.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </a>
              </Button>

              {data.links.github && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://${data.links.github}`} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}

              {data.links.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://${data.links.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              )}

              {data.links.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://${data.links.website}`} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}