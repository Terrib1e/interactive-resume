// src/components/resume/HeroSection.tsx
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { getInitials } from '@/lib/resume-utils';
import type { Profile } from '@/types/resume';

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  // Handler for smooth scrolling to main content
  const handleViewResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('View Resume clicked!');
    // Find the main resume content section by ID instead of class
    const mainContent = document.getElementById('resume-scroll-target') || document.querySelector('.container .Card');

    if (!mainContent) {
      console.error('Main content not found!');
      return;
    }
    console.log('Main content found:', mainContent);

    // Smooth scroll to the main content section
    mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center mb-12">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-background to-primary-50/10 dark:from-primary-950/30 dark:to-background">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {profile.name.split(' ').map((part, i) => (
                <span key={i} className="block">
                  {i === 0 && <span className="text-primary-500">Hi, I'm </span>}
                  {part}
                </span>
              ))}
            </h1>
            <h2 className="text-2xl sm:text-3xl text-muted-foreground mb-6">{profile.title}</h2>
            <p className="text-lg max-w-md leading-relaxed mb-8">{profile.bio.split('.')[0]}.</p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="flex flex-wrap gap-3">
              <a
                href="#"
                onClick={handleViewResumeClick}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-all shadow-lg hover:shadow-primary-500/25 flex items-center gap-2"
              >
                View Resume <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="px-6 py-3 bg-transparent border border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-md transition-all"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Avatar / Image Content */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }} className="hidden md:flex justify-center">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              {profile.avatar ? (
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary-200 dark:border-primary-800 shadow-2xl">
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center border-4 border-primary-200 dark:border-primary-800 shadow-2xl">
                  <span className="text-7xl font-bold text-white">{getInitials(profile.name)}</span>
                </div>
              )}

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-secondary-500/20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary-500/20 blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bouncing arrow indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-primary-500" />
      </div>
    </div>
  );
}

export default HeroSection;
