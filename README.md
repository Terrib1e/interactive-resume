# Interactive Resume Builder

A modern, interactive resume builder created with React, TypeScript, and shadcn/ui. Display your professional experience with a clean, responsive interface.

![Interactive Resume Builder Screenshot](screenshot.png)

## ✨ Features

- **Interactive UI** with smooth animations and responsive design
- **Theme Support** with automatic dark/light mode switching
- **Comprehensive Sections**:
  - 📋 Professional Profile
  - 💼 Work Experience with Timeline View
  - 🎯 Skills Visualization
  - 🎓 Education History
  - 🚀 Project Gallery
  - 📬 Contact Form

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/interactive-resume.git
cd interactive-resume

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view your resume.

### Deployment

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Components**: shadcn/ui component library
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/        # React components
│   ├── ui/           # UI components
│   ├── resume/       # Resume section components
│   ├── animations/   # Animation components
│   └── theme/        # Theme components
├── types/            # TypeScript definitions
├── styles/           # Global styles
├── lib/              # Utilities
└── data/             # Resume data
```

## 🎨 Customization

Update your resume by modifying `src/data/resumeData.ts`:

```typescript
export const resumeData = {
  profile: {
    name: "Your Name",
    title: "Your Position",
    // ...other details
  },
  // ...other sections
}
```

## 📱 Responsive Design

Fully responsive across all devices:
- Desktop (1024px+)
- Tablet (768px-1023px)
- Mobile (<768px)

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev/)

## 🔮 Roadmap

- [ ] PDF export functionality
- [ ] Data persistence with backend integration
- [ ] Additional project templates
- [ ] Rich text editing for descriptions
- [ ] Enhanced animations
- [ ] Multi-language support

## 📸 Screenshots

### Dark Mode
![Dark Mode](dark-mode-screenshot.png)

### Light Mode
![Light Mode](light-mode-screenshot.png)

### Mobile View
![Mobile View](mobile-screenshot.png)

## 📞 Support

For support, please create an issue in this repository or contact: your.email@example.com
