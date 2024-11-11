# Interactive Resume Builder

A modern, interactive resume builder built with React, TypeScript, and shadcn/ui. Create, customize, and showcase your professional experience with a beautiful, responsive interface.

![Interactive Resume Builder Screenshot](screenshot.png)

## 🌟 Features

- **Interactive UI**: Clean, modern interface with smooth animations and transitions
- **Dark/Light Mode**: Built-in theme support with system preference detection
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Multiple Sections**:
  - 📋 Professional Profile
  - 💼 Work Experience with Timeline View
  - 🎯 Skills Visualization
  - 🎓 Education History
  - 🚀 Project Showcase
  - 📬 Contact Form

- **Interactive Features**:
  - Timeline visualization for experience
  - Animated skill progress bars
  - Project gallery with modal views
  - Contact form with validation
  - In-place resume editing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interactive-resume.git
cd interactive-resume
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

```bash
npm run build
```

### Deployment

To deploy to GitHub Pages:
```bash
npm run deploy
```

## 🛠 Technologies Used

- **Framework**: React with TypeScript
- **Styling**: 
  - Tailwind CSS
  - shadcn/ui components
  - CSS variables for theming
- **Animation**: Framer Motion
- **Form Handling**: 
  - React Hook Form
  - Zod validation
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── resume/        # Resume section components
│   ├── animations/    # Animation components
│   ├── editor/        # Resume editing components
│   └── theme/         # Theme components
├── types/             # TypeScript type definitions
├── styles/            # Global styles and themes
├── lib/              # Utility functions
└── data/             # Resume data
```

## 🎨 Customization

### Updating Resume Data

Edit `src/data/resumeData.ts` to update your personal information:

```typescript
export const resumeData = {
  profile: {
    name: "Your Name",
    title: "Your Title",
    // ...
  },
  // ...
}
```

### Theming

1. Modify the theme variables in `src/index.css`:
```css
:root {
  --primary: 222.2 47.4% 11.2%;
  /* ... other theme variables */
}
```

2. Or use the built-in theme toggle for dark/light mode.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 📱 Supporting Mobile Devices

The resume is fully responsive and supports various screen sizes:

- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for the icons

## 📞 Support

For support, email your.email@example.com or create an issue in this repository.

## 🔮 Future Enhancements

- [ ] Add PDF export functionality
- [ ] Implement data persistence with backend integration
- [ ] Add more project templates
- [ ] Include rich text editing for descriptions
- [ ] Add more animation options
- [ ] Implement multi-language support

## 📸 Screenshots

### Dark Mode
![Dark Mode](dark-mode-screenshot.png)

### Light Mode
![Light Mode](light-mode-screenshot.png)

### Mobile View
![Mobile View](mobile-screenshot.png)
