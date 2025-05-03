import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui';
import { FadeIn } from '@/components/animations/fade-in';
import { ExternalLink } from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  skills?: string[];
}

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certifications.map((cert, index) => (
        <FadeIn key={cert.id} delay={index * 0.1}>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{cert.name}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {cert.issuer}
              </div>
              <div className="text-xs text-muted-foreground">
                Issued: {cert.date}
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="mt-auto">
                <Button variant="outline" size="sm" asChild>
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Credential
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      ))}
    </div>
  );
}