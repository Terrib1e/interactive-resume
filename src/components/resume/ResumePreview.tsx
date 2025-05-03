import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ResumeData } from '@/types/resume';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the available templates
const TEMPLATES = [
  { id: 'modern', name: 'Modern' },
  { id: 'elegant', name: 'Elegant' },
  { id: 'simple', name: 'Simple' },
];

interface ResumePreviewProps {
  data: ResumeData;
  template?: string;
  onEdit?: () => void;
  isPrintMode?: boolean;
  isSplitView?: boolean;
}

const ResumePreview = ({
  data,
  template = 'modern',
  onEdit,
  isPrintMode = false,
  isSplitView = false
}: ResumePreviewProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(template);

  const socialLinks = [
    { name: 'GitHub', link: data.profile.links?.github, icon: 'github' },
    { name: 'LinkedIn', link: data.profile.links?.linkedin, icon: 'linkedin' },
    { name: 'Website', link: data.profile.links?.website, icon: 'website' },
  ];

  if (!data) {
    return <div className="text-center text-gray-500">No data to display. Please edit your resume.</div>;
  }

  // Function to apply template styles
  const getTemplateStyles = (templateId: string) => {
    switch (templateId) {
      case 'modern':
        return {
          fontClass: 'font-sans',
          headingClass: 'text-2xl font-bold mb-4',
          bodyClass: 'text-gray-700 dark:text-gray-300 leading-relaxed',
          accentColor: 'text-blue-500',
        };
      case 'elegant':
        return {
          fontClass: 'font-serif',
          headingClass: 'text-2xl font-semibold mb-4',
          bodyClass: 'text-gray-800 dark:text-gray-200 leading-relaxed',
          accentColor: 'text-purple-500',
        };
      case 'simple':
        return {
          fontClass: 'font-mono',
          headingClass: 'text-xl font-semibold mb-3',
          bodyClass: 'text-gray-600 dark:text-gray-400 leading-normal',
          accentColor: 'text-green-500',
        };
      default:
        return {
          fontClass: 'font-sans',
          headingClass: 'text-2xl font-bold mb-4',
          bodyClass: 'text-gray-700 dark:text-gray-300 leading-relaxed',
          accentColor: 'text-blue-500',
        };
    }
  };

  const templateStyles = getTemplateStyles(selectedTemplate);

  return (
    <div className={cn('p-6', templateStyles.fontClass, isPrintMode ? 'font-serif' : 'font-sans', isSplitView ? 'h-full overflow-y-auto' : '')}>
      {/* Template Selector */}
      <div className="mb-4 flex justify-between items-center">
        <Select onValueChange={setSelectedTemplate} value={selectedTemplate}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Template" />
          </SelectTrigger>
          <SelectContent>
            {TEMPLATES.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {onEdit && (
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Edit Resume
          </button>
        )}
      </div>

      <Card className={cn(isSplitView ? 'h-full' : '')}>
        <CardHeader>
          <CardTitle className={cn('text-3xl font-bold mb-2', isPrintMode ? 'text-2xl' : '')}>{data.profile.name}</CardTitle>
          <p className={cn('text-lg text-gray-600 dark:text-gray-400 mb-4', isPrintMode ? 'text-base' : '')}>{data.profile.title}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={cn('text-sm text-gray-500 dark:text-gray-400', isPrintMode ? 'text-xs' : '')}>{data.profile.location}</span>
            <span className={cn('text-sm text-gray-500 dark:text-gray-400', isPrintMode ? 'text-xs' : '')}>{data.profile.email}</span>
            <span className={cn('text-sm text-gray-500 dark:text-gray-400', isPrintMode ? 'text-xs' : '')}>{data.profile.phone}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((item) =>
              item.link ? (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
                    isPrintMode ? 'text-sm' : '',
                    templateStyles.accentColor, // Apply accent color
                  )}
                >
                  {item.name}
                </a>
              ) : null,
            )}
          </div>
        </CardHeader>

        <CardContent className={cn(isSplitView ? 'h-full overflow-y-auto' : '')}>
          <section className="mb-8 resume-section" data-section="profile">
            <h2 className={cn(templateStyles.headingClass, isPrintMode ? 'text-xl' : '')}>About Me</h2>
            <p className={cn(templateStyles.bodyClass, isPrintMode ? 'text-base' : '')}>{data.profile.bio}</p>
          </section>

          <section className="mb-8 resume-section" data-section="experience">
            <h2 className={cn(templateStyles.headingClass, isPrintMode ? 'text-xl' : '')}>Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className={cn('mb-6', isPrintMode ? 'mb-4' : '')}>
                <h3 className={cn('text-xl font-semibold mb-1', isPrintMode ? 'text-lg' : '')}>
                  {exp.position} at {exp.company}
                </h3>
                <p className={cn('text-gray-600 dark:text-gray-400 mb-1', isPrintMode ? 'text-sm' : '')}>
                  {exp.location ? `${exp.location}, ` : ''}
                  {exp.period}
                </p>
                <ul className={cn('list-disc list-inside space-y-1', isPrintMode ? 'text-base text-gray-700' : '')}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
                {exp.technologies && Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                  <div className="mt-2">
                    <span className={cn('font-semibold mr-1', isPrintMode ? 'text-sm' : '')}>Technologies:</span>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech: string, i: number) => (
                        <Badge key={i} variant="secondary" className={cn(isPrintMode ? 'text-xs' : '')}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="mb-8">
            <h2 className={cn(templateStyles.headingClass, isPrintMode ? 'text-xl' : '')}>Skills</h2>
            {Object.entries(data.skills).map(([category, skills]) => (
              <div key={category} className={cn('mb-6', isPrintMode ? 'mb-4' : '')}>
                <h3 className={cn('text-xl font-semibold mb-2', isPrintMode ? 'text-lg' : '')}>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={cn(isPrintMode ? 'text-base' : '')}>{skill.name}</span>
                      {skill.level && (
                        <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className={cn('h-full rounded-full', templateStyles.accentColor)} style={{ width: `${skill.level}%` }}></div>
                        </div>
                      )}
                      {skill.experience && <span className={cn('text-sm text-gray-500 dark:text-gray-400', isPrintMode ? 'text-xs' : '')}>({skill.experience})</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="mb-8 resume-section" data-section="education">
            <h2 className={cn(templateStyles.headingClass, isPrintMode ? 'text-xl' : '')}>Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className={cn('mb-6', isPrintMode ? 'mb-4' : '')}>
                <h3 className={cn('text-xl font-semibold mb-1', isPrintMode ? 'text-lg' : '')}>
                  {edu.degree} at {edu.school}
                </h3>
                <p className={cn('text-gray-600 dark:text-gray-400 mb-1', isPrintMode ? 'text-sm' : '')}>
                  {edu.location}, {edu.period}
                </p>
                {edu.gpa && <p className={cn('text-gray-600 dark:text-gray-400 mb-1', isPrintMode ? 'text-sm' : '')}>GPA: {edu.gpa}</p>}
                {Array.isArray(edu.achievements) && edu.achievements.length > 0 && (
                  <ul className={cn('list-disc list-inside space-y-1', isPrintMode ? 'text-base text-gray-700' : '')}>
                    {edu.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          {data.projects && data.projects.length > 0 && (
            <section className="mb-8 resume-section" data-section="projects">
              <h2 className={cn(templateStyles.headingClass, isPrintMode ? 'text-xl' : '')}>Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} className={cn('mb-6', isPrintMode ? 'mb-4' : '')}>
                  <h3 className={cn('text-xl font-semibold mb-1', isPrintMode ? 'text-lg' : '')}>{project.title}</h3>
                  <p className={cn('text-gray-600 dark:text-gray-400 mb-1', isPrintMode ? 'text-sm' : '')}>{project.period}</p>
                  <p className={cn('text-muted-foreground mb-2', isPrintMode ? 'text-base' : '')}>{project.description}</p>
                  {project.highlights && project.highlights.length > 0 && (
                    <div>
                      <span className={cn('font-semibold mb-1', isPrintMode ? 'text-sm' : '')}>Highlights:</span>
                      <ul className={cn('list-disc list-inside space-y-1', isPrintMode ? 'text-base text-gray-700' : '')}>
                        {project.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <section className="mb-8 resume-section" data-section="certifications">
              <h2 className={cn(templateStyles.headingClass, isPrintMode ? 'text-xl' : '')}>Certifications</h2>
              <ul className={cn('list-disc list-inside space-y-2', isPrintMode ? 'text-base text-gray-700' : '')}>
                {data.certifications.map((cert, index) => (
                  <li key={index}>{typeof cert === 'string' ? cert : cert.name}</li>
                ))}
              </ul>
            </section>
          )}

          {data.additionalInfo && data.additionalInfo.length > 0 && (
            <section className="resume-section" data-section="additionalInfo">
              <h2 className={cn(templateStyles.headingClass, isPrintMode ? 'text-xl' : '')}>Additional Information</h2>
              <ul className={cn('list-disc list-inside space-y-2', isPrintMode ? 'text-base text-gray-700' : '')}>
                {data.additionalInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumePreview;
