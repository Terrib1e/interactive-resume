// src/components/EditModeManager.tsx
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ResumeEditor } from "@/components/editor/ResumeEditor"
import Resume from "@/components/Resume"
import { Edit, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ResumeData } from '@/types/resume'

interface EditModeManagerProps {
  initialData: ResumeData
}

export function EditModeManager({ initialData }: EditModeManagerProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData>(initialData)
  const { toast } = useToast()

  const handleSave = (newData: ResumeData) => {
    setResumeData(newData)
    setIsEditMode(false)
    // In a real app, you would save this to your backend
    toast({
      title: "Changes saved",
      description: "Your resume has been updated successfully.",
    })
  }

  return (
    <div className="relative min-h-screen">
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 right-20 z-50"
        onClick={() => setIsEditMode(!isEditMode)}
      >
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

      {isEditMode ? (
        <ResumeEditor
          initialData={resumeData}
          onSave={handleSave}
        />
      ) : (
        <Resume data={resumeData} />
      )}
    </div>
  )
}