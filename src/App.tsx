// src/App.tsx
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Resume from '@/components/resume/Resume';
import { Toaster } from '@/components/ui/toaster';
import { resumeData } from '@/data/resumeData';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="resume-theme">
      <div className="relative min-h-screen bg-background">
        <Resume data={resumeData as never} />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
