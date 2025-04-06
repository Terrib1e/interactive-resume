// src/components/ui/language-selector.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLanguage, type SupportedLanguage } from '@/hooks/use-language';
import { useToast } from '@/hooks/use-toast';

export function LanguageSelector() {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (language: SupportedLanguage) => {
    changeLanguage(language);
    toast({
      title: "Language Changed",
      description: `The language has been changed to ${languages.find(l => l.code === language)?.name}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Globe className="h-4 w-4" />
          <span>{languages.find(l => l.code === currentLanguage)?.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="cursor-pointer"
          >
            <span className={currentLanguage === language.code ? 'font-bold' : ''}>
              {language.nativeName} ({language.name})
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}