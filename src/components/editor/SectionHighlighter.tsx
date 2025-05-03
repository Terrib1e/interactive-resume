// src/components/editor/SectionHighlighter.tsx
import { useEffect, useRef } from 'react'

interface SectionHighlighterProps {
  activeSection: string | null
  previewRef: React.RefObject<HTMLDivElement>
  editorRef: React.RefObject<HTMLDivElement>
}

export function SectionHighlighter({ activeSection, previewRef, editorRef }: SectionHighlighterProps) {
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing highlight
    if (previewRef.current) {
      const allSections = previewRef.current.querySelectorAll('.resume-section')
      allSections.forEach(section => {
        section.classList.remove('section-active')
      })
    }

    // Apply new highlight if there's an active section
    if (activeSection && previewRef.current) {
      // Clean up previous timeout
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current)
      }

      // Find the corresponding section in the preview
      const sectionElement = previewRef.current.querySelector(`[data-section="${activeSection}"]`)

      if (sectionElement) {
        // Add active class
        sectionElement.classList.add('section-active')

        // Scroll the preview to show the section
        highlightTimeoutRef.current = setTimeout(() => {
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }, 100)
      }

      // Also scroll the editor to the corresponding section
      if (editorRef.current) {
        const editorSection = editorRef.current.querySelector(`[data-section="${activeSection}"]`)
        if (editorSection) {
          editorSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
      }
    }

    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current)
      }
    }
  }, [activeSection, previewRef, editorRef])

  return null // This is a utility component with no UI
}