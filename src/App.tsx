// src/App.tsx
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { EditModeManager } from '@/components/EditModeManager';
import { Toaster } from '@/components/ui/toaster';
import { resumeData } from '@/data/resumeData';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="resume-theme">
      <div className="relative min-h-screen bg-background">
        <ThemeToggle />
        <EditModeManager initialData={resumeData as never} />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
