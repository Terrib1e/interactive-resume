// src/hooks/use-language.ts
import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'resume_language_preference';

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
];

// Basic translations for UI elements (in a real app, you'd use a more robust i18n system)
export const translations = {
  en: {
    resume: 'Resume',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    print: 'Print',
    download: 'Download PDF',
    saveTemplate: 'Save Template',
    templateSelector: 'Choose a Resume Template',
    selectTemplate: 'Select Template',
        goToEditor: 'Go to Editor',
        edit: 'Edit',
        delete: 'Delete',
        preview: 'Preview',
        save: 'Save',
        cancel: 'Cancel',
        add: 'Add',
        update: 'Update',
        submit: 'Submit',
        close: 'Close',
        confirm: 'Confirm',
        editor: 'Editor',
        view: 'View',
        profile: 'Profile',
        name: 'Name',
        location: 'Location',
        title: 'Title',
        email: 'Email',
        phone: 'Phone',
        bio: 'Bio',
        achievements: 'Achievements',
        technologies: 'Technologies',
        highlights: 'Highlights',
        startDate: 'Start Date',
        endDate: 'End Date',
        current: 'Current',
        company: 'Company',
        position: 'Position',
        institution: 'Institution',
        degree: 'Degree',
        field: 'Field',
        period: 'Period',
        description: 'Description',
        link: 'Link',
        image: 'Image',
        addSkill: 'Add Skill',
        addExperience: 'Add Experience',
        addEducation: 'Add Education',
        addProject: 'Add Project',
        addProfile: 'Add Profile',
        addContact: 'Add Contact',
        addAchievement: 'Add Achievement',
        addTechnology: 'Add Technology',
        resumeEditor: 'Resume Editor',
        resumePreview: 'Resume Preview',
        editResumeDescription: 'Edit your resume details here.',
        previewResumeDescription: 'Preview how your resume will look to potential employers.',
        website: 'Website',
        summary: 'Summary',
        languages: 'Languages',
        currentPosition: 'Current Position',
        currentlyStudying: 'Currently Studying',
        imageUrl: 'Image URL',
    // Add more translations as needed
  },
  es: {
    resume: 'Currículum',
    experience: 'Experiencia',
    education: 'Educación',
    skills: 'Habilidades',
    projects: 'Proyectos',
    contact: 'Contacto',
    print: 'Imprimir',
    download: 'Descargar PDF',
    saveTemplate: 'Guardar Plantilla',
    templateSelector: 'Elegir una Plantilla de Currículum',
    selectTemplate: 'Seleccionar Plantilla',
    goToEditor: 'Ir al Editor',
  },
  fr: {
    resume: 'CV',
    experience: 'Expérience',
    education: 'Formation',
    skills: 'Compétences',
    projects: 'Projets',
    contact: 'Contact',
    print: 'Imprimer',
    download: 'Télécharger PDF',
    saveTemplate: 'Enregistrer le Modèle',
    templateSelector: 'Choisir un Modèle de CV',
    selectTemplate: 'Sélectionner le Modèle',
    goToEditor: 'Aller à l\'Éditeur',
  },
  de: {
    resume: 'Lebenslauf',
    experience: 'Erfahrung',
    education: 'Bildung',
    skills: 'Fähigkeiten',
    projects: 'Projekte',
    contact: 'Kontakt',
    print: 'Drucken',
    download: 'PDF Herunterladen',
    saveTemplate: 'Vorlage Speichern',
    templateSelector: 'Lebenslaufvorlage Auswählen',
    selectTemplate: 'Vorlage Auswählen',
    goToEditor: 'Zum Editor',
  },
  zh: {
    resume: '简历',
    experience: '工作经验',
    education: '教育背景',
    skills: '技能',
    projects: '项目',
    contact: '联系方式',
    print: '打印',
    download: '下载PDF',
    saveTemplate: '保存模板',
    templateSelector: '选择简历模板',
    selectTemplate: '选择模板',
    goToEditor: '前往编辑器',
  },
  ja: {
    resume: '履歴書',
    experience: '職歴',
    education: '学歴',
    skills: 'スキル',
    projects: 'プロジェクト',
    contact: '連絡先',
    print: '印刷',
    download: 'PDFをダウンロード',
    saveTemplate: 'テンプレートを保存',
    templateSelector: '履歴書テンプレートを選択',
    selectTemplate: 'テンプレートを選択',
    goToEditor: 'エディタへ',
  },
};

export function useLanguage(defaultLanguage: SupportedLanguage = 'en') {
    const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(defaultLanguage);

    const languages = languageOptions;

  // Load saved language preference on initial mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LOCAL_STORAGE_KEY) as SupportedLanguage | null;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const changeLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    localStorage.setItem(LOCAL_STORAGE_KEY, language);
  };

  // Get translation function
  const t = (key: keyof typeof translations.en): string => {
    // Fallback to English if translation doesn't exist
    return (translations[currentLanguage] as typeof translations.en)[key] || translations.en[key] || key;
  };
    return {
        currentLanguage,
        changeLanguage,
        languages,
        t,
    };
}