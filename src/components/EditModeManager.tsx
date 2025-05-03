// src/components/EditModeManager.tsx (simplified)
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Resume from '@/components/resume/Resume';
import { SplitViewEditor } from '@/components/editor/SplitViewEditor';
import { Edit, Eye, Save, Download, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { ResumeData } from '@/types/resume';

interface EditModeManagerProps {
  initialData: ResumeData;

}

// Define the edit modes
type EditMode = 'preview' | 'split';

export function EditModeManager({ initialData }: EditModeManagerProps) {
  const [editMode, setEditMode] = useState<EditMode>('preview');
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const { toast } = useToast();

  // Local storage integration
  const [storedData, setStoredData, removeStoredData] = useLocalStorage<ResumeData>('resume-data', initialData);

  // Load data from localStorage on mount
  useEffect(() => {
    if (storedData) {
      setResumeData(storedData);
    }
  }, [storedData]);

  const handleSave = (newData: ResumeData) => {
    setResumeData(newData);
    setStoredData(newData);
    setEditMode('preview');

    toast({
      title: 'Changes saved',
      description: 'Your resume has been updated and saved to local storage.',
    });
  };

  const handleResetToDefault = () => {
    setResumeData(initialData);
    setStoredData(initialData);

    toast({
      title: 'Reset complete',
      description: 'Your resume has been reset to the default template.',
    });
  };

  const handleClearData = () => {
    removeStoredData();
    setResumeData(initialData);

    toast({
      title: 'Data cleared',
      description: 'Your resume data has been cleared from local storage.',
    });
  };

  // Export resume data as JSON
  const exportJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = 'resume-data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast({
      title: 'JSON exported',
      description: 'Your resume data has been exported as a JSON file.',
    });
  };

  // Import resume data from JSON file
  const importJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string) as ResumeData;
        setResumeData(importedData);
        setStoredData(importedData);

        toast({
          title: 'Import successful',
          description: 'Your resume data has been imported and saved.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Import failed',
          description: 'There was an error importing your resume data. Please check the file format.',
        });
      }
    };
    reader.readAsText(file);

    // Reset the input
    event.target.value = '';
  };

  return (
    <div className="relative min-h-screen" id="resume-content">
      {/* Mode Toggle and Data Management Buttons */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {/* Data Management Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Resume Data</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={exportJSON}>
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => document.getElementById('json-upload')?.click()}>
              <Save className="w-4 h-4 mr-2" />
              Import JSON
              <input id="json-upload" type="file" accept=".json" onChange={importJSON} className="hidden" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                  <span className="text-destructive">Reset to Default</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This will reset your resume to the default template. All your custom data will be lost.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetToDefault}>Reset</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                  <span className="text-destructive">Clear All Data</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>This will permanently remove your resume data from local storage. This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearData}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Edit/Preview Mode Toggle */}
        <Button variant="outline" size="sm" onClick={() => setEditMode(editMode === 'preview' ? 'split' : 'preview')}>
          {editMode === 'preview' ? (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </>
          )}
        </Button>
      </div>

      {/* Main Content */}
      {editMode === 'split' ? <SplitViewEditor initialData={resumeData} onSave={handleSave} /> : <Resume data={resumeData} />}

      {/* Only show ExportButton in preview mode
      {editMode === 'preview' && <ExportButton />} */}
    </div>
  );

}
