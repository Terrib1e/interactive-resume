import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ResumeEditor } from '@/components/editor/ResumeEditor';
import Resume from '@/components/Resume';
import { Edit, Eye, Columns, Maximize } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ResumeData } from '@/types/resume';


// Define the props for the EditModeManager component
interface EditModeManagerProps {
  initialData: ResumeData;
}
export function EditModeManager({ initialData }: EditModeManagerProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [isSplitView, setIsSplitView] = useState(false);
  const { toast } = useToast();

  // Use useCallback for memoization
  const handleSave = useCallback(
    (newData: ResumeData) => {
      setResumeData(newData);
      if (!isSplitView) {
        setIsEditMode(false);
      }
      toast({
        title: 'Changes saved',
        description: 'Your resume has been updated successfully.',
      });
    },
    [isSplitView, toast],
  );

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
    if (isEditMode && isSplitView) {
      setIsSplitView(false);
    }
  }, [isEditMode, isSplitView]);

  const toggleSplitView = useCallback(() => {
    setIsSplitView((prev) => !prev);
    if (!isSplitView && !isEditMode) {
      setIsEditMode(true);
    }
  }, [isEditMode, isSplitView]);

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button variant="outline" size="sm" onClick={toggleSplitView} className="print:hidden">
          {isSplitView ? (
            <>
              <Maximize className="w-4 h-4 mr-2" />
              Full View
            </>
          ) : (
            <>
              <Columns className="w-4 h-4 mr-2" />
              Split View
            </>
          )}
        </Button>

        <Button variant="outline" size="sm" onClick={toggleEditMode} className="print:hidden">
          {isEditMode ? (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      <div className={`${isSplitView ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}`}>
        {(isEditMode || isSplitView) && (
          <div className={`${isSplitView ? 'md:max-h-screen md:overflow-y-auto' : ''}`}>
            <ResumeEditor initialData={resumeData} onSave={handleSave} isSplitView={isSplitView} />
          </div>
        )}

        {(!isEditMode || isSplitView) && (
          <div className={`${isSplitView ? 'md:max-h-screen md:overflow-y-auto' : ''}`}>
            <Resume data={resumeData} />
          </div>
        )}
      </div>
    </div>
  );
}
