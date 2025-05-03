// src/components/editor/SplitViewEditor.tsx (simplified)
import { useState, useEffect, useRef } from 'react';
import Resume from '@/components/resume/Resume';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Save, RotateCcw, PanelLeftClose, PanelRightClose } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
import { SectionHighlighter } from '@/components/editor/SectionHighlighter';
import { SyncScroll } from '@/components/editor/SyncScroll';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ResumeEditorForm } from '@/components/editor/ResumeEditorForm';
import type { ResumeData } from '@/types/resume';

// Import the schema
import { resumeSchema } from '@/types/resume';

// Define the layout modes
type LayoutMode = 'editor' | 'preview' | 'split';

interface SplitViewEditorProps {
  initialData: ResumeData;
  onSave: (data: ResumeData) => void;
}

export function SplitViewEditor({ initialData, onSave }: SplitViewEditorProps) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('split');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<ResumeData>(initialData);
  const [focusMode, setFocusMode] = useState(false);
  const [syncScrollEnabled, setSyncScrollEnabled] = useState(true);
  const { toast } = useToast();
  const [originalData] = useState<ResumeData>(initialData);

  // Map editor sections to tab values
  const getActiveTab = (section: string | null) => {
    if (!section) return undefined;

    const sectionToTabMap: Record<string, string> = {
      profile: 'experience', // Profile info is shown in the experience tab
      experience: 'experience',
      skills: 'skills',
      education: 'education',
      projects: 'projects',
      certifications: 'education', // Certifications are shown in the education tab
      additionalInfo: 'experience' // Additional info is shown in the experience tab
    };

    return sectionToTabMap[section];
  };

  // Refs for highlighting and scrolling
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Set up form with zod validation
  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
  });

  // Watch for form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Update the form values for preview
      setFormValues(value as ResumeData);
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof resumeSchema>) => {
    // Cast to unknown first to avoid type mismatch errors
    onSave(values as unknown as ResumeData);
  };

  // Reset form to initial values
  const handleReset = () => {
    form.reset(originalData);
    setFormValues(originalData);

    toast({
      title: 'Changes discarded',
      description: 'Your changes have been reset to the last saved version.',
    });
  };

  // Apply focus mode class if enabled and there's an active section
  useEffect(() => {
    const previewElement = previewRef.current;
    if (!previewElement) return;

    if (focusMode && activeSection) {
      previewElement.classList.add('focus-mode');
    } else {
      previewElement.classList.remove('focus-mode');
    }
  }, [focusMode, activeSection]);

  return (
    <div className="h-screen pt-14 flex flex-col">
      {/* Section highlighter and sync scroll utilities */}
      <SectionHighlighter activeSection={activeSection} previewRef={previewRef} editorRef={editorRef} />
      <SyncScroll editorRef={editorRef} previewRef={previewRef} enabled={syncScrollEnabled} />

      {/* Fixed toolbar */}
      <div className="fixed top-14 left-0 right-0 z-30 bg-background border-b p-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant={layoutMode === 'editor' ? 'default' : 'outline'} size="sm" onClick={() => setLayoutMode('editor')} className="flex items-center">
            <PanelLeftClose className="w-4 h-4 mr-2" />
            Editor Only
          </Button>
          <Button variant={layoutMode === 'split' ? 'default' : 'outline'} size="sm" onClick={() => setLayoutMode('split')} className="flex items-center">
            <div className="flex w-4 h-4 mr-2">
              <div className="w-2 h-4 bg-current rounded-l-sm"></div>
              <div className="w-2 h-4 bg-current opacity-50 rounded-r-sm"></div>
            </div>
            Split View
          </Button>
          <Button variant={layoutMode === 'preview' ? 'default' : 'outline'} size="sm" onClick={() => setLayoutMode('preview')} className="flex items-center">
            <PanelRightClose className="w-4 h-4 mr-2" />
            Preview Only
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Focus mode toggle */}
          <div className="flex items-center space-x-2">
            <Switch id="focus-mode" checked={focusMode} onCheckedChange={setFocusMode} />
            <Label htmlFor="focus-mode" className="text-sm">
              Focus Mode
            </Label>
          </div>

          {/* Sync scroll toggle */}
          <div className="flex items-center space-x-2">
            <Switch id="sync-scroll" checked={syncScrollEnabled} onCheckedChange={setSyncScrollEnabled} />
            <Label htmlFor="sync-scroll" className="text-sm">
              Sync Scroll
            </Label>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Discard changes?</AlertDialogTitle>
                <AlertDialogDescription>This will reset all your changes to the last saved version. This action cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant="default" size="sm" onClick={form.handleSubmit(handleSubmit)}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Resizable panels */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="min-h-0 h-full">
          {layoutMode !== 'preview' && (
            <ResizablePanel defaultSize={layoutMode === 'editor' ? 100 : 50} minSize={layoutMode === 'editor' ? 100 : 30} className="overflow-y-auto">
              <div className="h-full p-4 overflow-y-auto" ref={editorRef}>
                <ResumeEditorForm form={form} onSubmit={form.handleSubmit(handleSubmit)} setActiveSection={setActiveSection} />
              </div>
            </ResizablePanel>
          )}

          {layoutMode !== 'editor' && (
            <>
              {layoutMode === 'split' && <ResizableHandle withHandle />}
              <ResizablePanel defaultSize={layoutMode === 'preview' ? 100 : 50} minSize={layoutMode === 'preview' ? 100 : 30} className="overflow-y-auto border-l">
                <div className="h-full p-4 flex flex-col" ref={previewRef}>
                  <div className="text-center text-xs text-muted-foreground mb-2">Live Preview {activeSection && `(Viewing: ${activeSection})`}</div>
                  <div className="flex-1 overflow-y-auto resume-preview">
                    <Resume data={formValues} activeTab={getActiveTab(activeSection)} />
                  </div>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
