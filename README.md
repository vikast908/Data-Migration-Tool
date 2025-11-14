# Data Migration Tool

A modern, user-friendly web application that helps users build professional profiles by intelligently extracting and organizing information from their resumes. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### Resume Upload & Parsing
- **Drag-and-drop** file upload with support for PDF, DOC, and DOCX formats
- **File size limit**: Up to 10MB
- Secure file handling with client-side validation

### Interactive Text Selection & Auto-fill
- **Select text** from your resume preview
- **Click any field** to auto-fill with selected text
- **Visual mapping** - see which parts of your resume have been used (green highlighting)
- **Context menu** for quick field assignment in floating panel mode

### Comprehensive Profile Builder

#### 1. Basic Information
- Full Name (required)
- Email with validation (required)
- Phone (required)
- Location
- Professional Headline

#### 2. Work Experience
- Job Title & Company Name
- Start and End Dates
- "I currently work here" checkbox (auto-clears end date)
- Description (2000 characters max)
- Multiple experience entries with full management

#### 3. Projects
- Project Title & Client
- Status: In Progress / Finished
- Start Date
- Project Description (1000 characters max)
- Multiple project entries

#### 4. Education
- Degree/Certification
- Institution/University
- Field of Study
- Duration (Start Year / End Year)
- Multiple education entries

#### 5. Skills
- Tag-based skill management
- Bulk add from comma/line-separated text
- Visual skill badges with remove functionality
- Recommendation: 8-15 skills for best visibility

### Card Management

Each experience, project, and education card supports:
- **⬆️ Move Up** - Reorder cards within section
- **⬇️ Move Down** - Reorder cards within section
- **📋 Duplicate** - Create a copy of the card (Experience & Projects only)
- **🧹 Clear** - Clear all fields while keeping the card
- **❌ Remove** - Delete the card entirely

All actions include confirmation dialogs to prevent accidental data loss.

### Progress Tracking & Encouragement

#### Progress Indicators
- **Visual progress bar** showing completion percentage
- **Real-time updates** as you fill in fields
- **Color coding**: Blue for in-progress, Green for complete

#### Milestone Celebrations
Beautiful toast notifications appear at:
- 25% - "🎉 You're off to a great start!"
- 50% - "🚀 Halfway there! Keep going."
- 75% - "⭐ Almost done! Your profile is looking strong."
- 100% - "🎊 Perfect! Your profile is complete."

#### Encouraging Messages
- Dynamic messages based on progress
- Time estimates: "This will take about 5 minutes"
- Field countdown: "Just 2 more fields to go"

### Advanced UI Features

#### Floating Panel Mode
- **Draggable panel** for work experience section
- **Resizable** with constraints (min 300x200px)
- **Minimizable** to save screen space
- **Position memory** - saved to localStorage
- Toggle between Traditional and Floating layouts

#### Resume Viewer
- **Zoom controls**: Zoom in/out (50%-200%)
- **Fit to Width** button for optimal viewing
- **Text highlighting**: Green for mapped, Gray for unmapped
- **Legend** to understand text status

#### Auto-save
- Automatic save 2 seconds after data changes
- Visual indicator with timestamp
- Tracks all form data changes

#### Review & Validation
- **Pre-submission review** screen
- **Color-coded sections**: Green for complete, Red for incomplete
- **Detailed error messages** for incomplete sections
- **Edit buttons** to quickly jump to specific sections
- **Complete Profile** button (only enabled when all required fields are filled)

### Form Features
- **Smart validation**: Email format checking, required fields
- **Character counters** for long text fields
- **Placeholder text** with helpful examples
- **Helpful hints** for better profile completion
- **Visual feedback**: Green checkmarks for filled fields, error icons for issues

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library

### Backend (Ready for Integration)
- **Supabase** - Backend-as-a-Service
  - Database schemas defined
  - Ready for user authentication
  - Profile data storage

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic CSS vendor prefixes

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/vikast908/Data-Migration-Tool.git
   cd Data-Migration-Tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (Optional - for Supabase integration)

   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🚀 Usage

### Quick Start Guide

1. **Upload Resume**
   - Drag and drop your resume file or click to browse
   - Supported formats: PDF, DOC, DOCX
   - Maximum size: 10MB

2. **Fill Basic Information**
   - Select text from your resume
   - Click on form fields to auto-fill
   - Or manually enter information

3. **Add Experience, Projects, Education**
   - Click "Add Experience/Project/Education" buttons
   - Use text selection for quick data entry
   - Manage cards with reorder, duplicate, and clear options

4. **Add Skills**
   - Type skills separated by commas
   - Or select multiple skills from resume at once
   - Remove skills by clicking the X on badges

5. **Review & Complete**
   - Navigate to Review section
   - Check all sections are complete
   - Click "Complete Profile" to finish

### Keyboard Shortcuts
- **Tab** - Navigate between fields
- **Enter** - Submit skill input
- **Escape** - Close context menu

## 📁 Project Structure

```
Data-Migration-Tool/
├── src/
│   ├── components/
│   │   ├── BasicInfoForm.tsx       # Basic information section
│   │   ├── WorkExperienceForm.tsx  # Work experience cards
│   │   ├── ProjectsForm.tsx        # Projects section
│   │   ├── EducationForm.tsx       # Education section
│   │   ├── SkillsForm.tsx          # Skills tags
│   │   ├── FormField.tsx           # Reusable form field component
│   │   ├── ResumeUpload.tsx        # File upload screen
│   │   ├── ResumeViewer.tsx        # Resume preview with zoom
│   │   ├── DataMigrationTool.tsx   # Main container component
│   │   ├── FloatingPanel.tsx       # Draggable floating panel
│   │   ├── ContextMenu.tsx         # Right-click context menu
│   │   └── CompletionScreen.tsx    # Success screen
│   ├── types/
│   │   └── profile.ts              # TypeScript interfaces
│   ├── lib/
│   │   └── supabase.ts            # Supabase client configuration
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles + Tailwind
├── supabase/
│   └── migrations/                 # Database migration files
├── public/                         # Static assets
├── DESIGN_PRD.md                   # Complete design specification
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎨 Design System

For complete design specifications, see [DESIGN_PRD.md](./DESIGN_PRD.md)

### Color Palette
- **Primary**: Blue (600-50)
- **Success**: Green (600-50)
- **Warning**: Orange/Amber (600-50)
- **Error**: Red (600-50)
- **Accent**: Purple (700-50)

### Key Components
- 40+ UI components fully documented
- Consistent spacing and typography
- Responsive design patterns
- Accessibility considerations

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` includes:
- Custom animations (bounce-once)
- Extended color palette
- Custom utilities

### TypeScript
Strict type checking enabled for better code quality

### Vite
Optimized build configuration with React plugin

## 🌐 Supabase Integration

Database schema is ready for deployment:

```sql
-- User Profiles
-- Basic Info
-- Work Experiences
-- Projects
-- Education
-- Skills
```

Migration files are located in `supabase/migrations/`

To deploy:
```bash
supabase db push
```

## 📱 Responsive Design

The application is designed to work on:
- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

Layout adapts with:
- Flexible grid systems
- Collapsible sections
- Touch-friendly controls

## ♿ Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- High contrast colors (WCAG compliant)
- Focus indicators on all interactive elements
- Descriptive button titles and tooltips

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Add comments for complex logic
- Test thoroughly before submitting PR

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Type check with TypeScript
```

## 🐛 Known Issues

- Resume parsing is currently manual (AI-powered parsing can be integrated)
- Backend integration requires Supabase setup
- PDF rendering may vary across browsers

## 🔮 Future Enhancements

- [ ] AI-powered resume text extraction
- [ ] Multiple resume format support (LinkedIn, JSON Resume)
- [ ] Export profile to PDF/JSON
- [ ] Profile templates
- [ ] Real-time collaboration
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Profile sharing with unique URLs

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Vikas Tiwari**
- GitHub: [@vikast908](https://github.com/vikast908)
- Email: vikast908@gmail.com

## 🙏 Acknowledgments

- Built with assistance from Claude Code
- Icons by [Lucide](https://lucide.dev/)
- UI inspired by modern SaaS applications
- Color palette optimized for accessibility

## 📞 Support

If you have any questions or run into issues:
1. Check the [DESIGN_PRD.md](./DESIGN_PRD.md) for detailed specifications
2. Open an issue on GitHub
3. Contact: vikast908@gmail.com

---

**Made with ❤️ and TypeScript**

🤖 *Generated with [Claude Code](https://claude.com/claude-code)*
