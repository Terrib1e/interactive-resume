// src/components/editor/SyncScroll.tsx
import { useEffect, useRef, useState } from 'react'

interface SyncScrollProps {
  editorRef: React.RefObject<HTMLDivElement>
  previewRef: React.RefObject<HTMLDivElement>
  enabled?: boolean
  activeSection?: string | null
}

export function SyncScroll({ 
  editorRef, 
  previewRef, 
  enabled = true,
  activeSection = null
}: SyncScrollProps) {
  const [isScrolling, setIsScrolling] = useState<'editor' | 'preview' | null>(null)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!enabled) return

    const editorElement = editorRef.current
    const previewElement = previewRef.current

    if (!editorElement || !previewElement) return

    // Handler for editor scrolling
    const handleEditorScroll = () => {
      if (isScrolling === 'preview' || !enabled) return

      setIsScrolling('editor')

      // Calculate relative scroll position
      const editorScrollRatio = editorElement.scrollTop / (editorElement.scrollHeight - editorElement.clientHeight)
      const previewTargetScroll = editorScrollRatio * (previewElement.scrollHeight - previewElement.clientHeight)

      // Apply the same ratio to preview
      previewElement.scrollTop = previewTargetScroll

      // Reset scrolling state after a short delay
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(null)
      }, 150)
    }

    // Handler for preview scrolling
    const handlePreviewScroll = () => {
      if (isScrolling === 'editor' || !enabled) return

      setIsScrolling('preview')

      // Calculate relative scroll position
      const previewScrollRatio = previewElement.scrollTop / (previewElement.scrollHeight - previewElement.clientHeight)
      const editorTargetScroll = previewScrollRatio * (editorElement.scrollHeight - editorElement.clientHeight)

      // Apply the same ratio to editor
      editorElement.scrollTop = editorTargetScroll

      // Reset scrolling state after a short delay
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(null)
      }, 150)
    }

    // Add scroll event listeners
    editorElement.addEventListener('scroll', handleEditorScroll)
    previewElement.addEventListener('scroll', handlePreviewScroll)

    // Cleanup
    return () => {
      editorElement.removeEventListener('scroll', handleEditorScroll)
      previewElement.removeEventListener('scroll', handlePreviewScroll)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [editorRef, previewRef, isScrolling, enabled])

  // Scroll to active section when it changes
  useEffect(() => {
    if (!enabled || !activeSection) return;
    
    const editorElement = editorRef.current;
    const previewElement = previewRef.current;
    
    if (!editorElement || !previewElement) return;
    
    // Map editor section names to preview tab values
    const sectionToTabMap: Record<string, string> = {
      // Direct matches
      'experience': 'experience',
      'skills': 'skills',
      'education': 'education',
      'projects': 'projects',
      
      // These editor sections don't have direct tab matches
      'profile': 'experience', // Default to experience tab when profile is selected
      'certifications': 'education', // Show education tab for certifications
      'additionalInfo': 'contact', // Show contact tab for additional info
    };
    
    // Get the corresponding tab for the active section
    const tabToActivate = sectionToTabMap[activeSection] || activeSection;
    
    // Add a slight delay to ensure DOM is updated
    setTimeout(() => {
      // Find tab trigger that corresponds to the mapped section
      const tabTrigger = previewElement.querySelector(`[value="${tabToActivate}"]`) as HTMLElement;
      
      if (tabTrigger) {
        // Set a flag to prevent sync scroll from interfering
        setIsScrolling('editor');
        
        // Click the tab trigger to show the correct tab
        tabTrigger.click();
        
        // Scroll the section into view after tab content is visible
        setTimeout(() => {
          // Find the section in the preview after tab has been switched
          const previewSection = previewElement.querySelector(`[data-section="${tabToActivate}"]`);
          
          if (previewSection) {
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          
          // Reset the scrolling state after animation completes
          setTimeout(() => {
            setIsScrolling(null);
          }, 800);
        }, 200); // Wait for tab content to be visible
      }
    }, 100); // Small delay to ensure DOM is ready
  }, [activeSection, enabled]);

  return null
}