// src/components/editor/SyncScroll.tsx
import { useEffect, useRef, useState } from 'react'

interface SyncScrollProps {
  editorRef: React.RefObject<HTMLDivElement>
  previewRef: React.RefObject<HTMLDivElement>
  enabled?: boolean
}

export function SyncScroll({ editorRef, previewRef, enabled = true }: SyncScrollProps) {
  const [isScrolling, setIsScrolling] = useState<'editor' | 'preview' | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
      const editorScrollRatio = editorElement.scrollTop /
        (editorElement.scrollHeight - editorElement.clientHeight)

      // Apply the same ratio to preview
      const previewTargetScroll = editorScrollRatio *
        (previewElement.scrollHeight - previewElement.clientHeight)

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
      const previewScrollRatio = previewElement.scrollTop /
        (previewElement.scrollHeight - previewElement.clientHeight)

      // Apply the same ratio to editor
      const editorTargetScroll = previewScrollRatio *
        (editorElement.scrollHeight - editorElement.clientHeight)

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

  return null
}