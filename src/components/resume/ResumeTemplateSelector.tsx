import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, LayoutDashboard, List, Book, Briefcase, Users, Settings, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTemplate } from '@/hooks/use-template';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useToast } from '@/hooks/use-toast';

// Mock template data (replace with actual data)
const templates = [
  { id: 'simple', name: 'Simple', description: 'Clean and basic template.', image: '/placeholder.svg' },
  { id: 'modern', name: 'Modern', description: 'Stylish and contemporary design.', image: '/placeholder.svg' },
  { id: 'professional', name: 'Professional', description: 'Formal and business-oriented.', image: '/placeholder.svg' },
  { id: 'creative', name: 'Creative', description: 'Unique and visually appealing.', image: '/placeholder.svg' },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

interface ResumeTemplateSelectorProps {
  onSelectTemplate?: (templateId: string) => void;
  onNavigateToEditor?: () => void;
}

const ResumeTemplateSelector: React.FC<ResumeTemplateSelectorProps> = ({
  onSelectTemplate,
  onNavigateToEditor
}) => {
  const { selectedTemplate, saveTemplate } = useTemplate();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const { toast } = useToast();

  const handleTemplateSelect = (templateId: string) => {
    // Inform parent component if callback exists
    if (onSelectTemplate) {
      onSelectTemplate(templateId);
    }

    toast({
      title: "Template Selected",
      description: `You've selected the ${templates.find(t => t.id === templateId)?.name} template`
    });
  };

  const handleSaveTemplatePreference = () => {
    if (selectedTemplate) {
      saveTemplate(selectedTemplate);

      toast({
        title: "Template Preference Saved",
        description: "Your template preference has been saved and will be used for future sessions."
      });
    }
  };

  const handleGoToEditor = () => {
    if (onNavigateToEditor) {
      onNavigateToEditor();
    } else {
      // Fallback if no callback provided
      toast({
        title: "Navigating to Editor",
        description: "Moving to the resume editor with your selected template."
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Choose a Resume Template</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {templates.map((template) => (
            <motion.div key={template.id} variants={cardVariants} initial="hidden" animate="visible" exit="exit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  'border-2',
                  selectedTemplate === template.id ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-700 hover:border-gray-600 hover:shadow-md hover:shadow-gray-700/10',
                )}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    {template.name}
                    {selectedTemplate === template.id && <CheckCircle className="w-5 h-5 text-blue-500" />}
                  </CardTitle>
                  <CardDescription className="text-gray-400">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={template.image} alt={template.name} className="w-full h-48 object-cover rounded-md" />
                  <Button
                    onClick={() => handleTemplateSelect(template.id)}
                    className={cn('mt-4 w-full', selectedTemplate === template.id ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white')}
                    disabled={selectedTemplate === template.id}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedTemplate && (
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            You have selected the <span className="font-semibold text-blue-500">{templates.find((t) => t.id === selectedTemplate)?.name}</span> template.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={handleSaveTemplatePreference}
              variant="outline"
              size={isSmallScreen ? "sm" : "default"}
              className="flex items-center gap-1"
            >
              <Save className="w-4 h-4" />
              <span className={isSmallScreen ? "hidden" : "inline"}>Save Preference</span>
            </Button>

            <Button
              onClick={handleGoToEditor}
              className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-1"
              size={isSmallScreen ? "sm" : "default"}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className={isSmallScreen ? "hidden" : "inline"}>Go to Editor</span>
            </Button>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Additional Templates (Illustrative)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-200 flex items-center gap-2">
                <List className="w-4 h-4" /> Basic
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-200 flex items-center gap-2">
                <Book className="w-4 h-4" /> Academic
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-200 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Technical
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-200 flex items-center gap-2">
                <Users className="w-4 h-4" /> CV
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <p className="mt-4 text-gray-500 text-sm">These are just example templates to illustrate the variety that could be offered.</p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300 flex items-center gap-2">
          <Settings className="w-6 h-6" /> Template Customization
        </h2>
        <p className="text-gray-400 text-sm">We could allow users to customize the selected template, such as changing colors, fonts, and layout, to further personalize their resume.</p>
      </div>
    </div>
  );
};

export default ResumeTemplateSelector;
