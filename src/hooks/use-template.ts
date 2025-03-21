// src/hooks/use-template.ts
import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'resume_template_preference';

export function useTemplate(defaultTemplate = 'modern') {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(defaultTemplate);

  // Load saved template preference on initial mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);

  // Save template preference to localStorage
  const saveTemplate = (template: string) => {
    setSelectedTemplate(template);
    localStorage.setItem(LOCAL_STORAGE_KEY, template);
  };

  return {
    selectedTemplate,
    saveTemplate
  };
}