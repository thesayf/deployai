# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm install` - Install dependencies
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Common Development Tasks
When developing:
1. Always run `npm run lint` after making changes to ensure code quality
2. The project uses Prettier with Tailwind plugin - format files accordingly
3. Hot reload is enabled in development mode

## Architecture

This is a Next.js 14 marketing/landing page template using the Pages Router pattern. The project demonstrates various UI components commonly used in SaaS/startup websites.

### Key Technologies
- **Next.js 14.2.1** with Pages Router (not App Router)
- **React 18** with TypeScript 5
- **Tailwind CSS** for styling (indigo palette for primary, zinc for neutral)
- **Framer Motion** for animations
- **class-variance-authority** for component variants
- **Google Fonts** (Roboto) via Next.js font optimization

### Project Structure
- `/src/pages/` - Next.js pages (Pages Router pattern)
  - `index.tsx` - Main landing page that imports all components
  - `_app.tsx` - App wrapper
  - `_document.tsx` - HTML document wrapper
- `/src/components/` - UI components organized by feature:
  - Each component directory is self-contained with its logic and sub-components
  - Components use Tailwind for styling and Framer Motion for animations
- `/src/styles/globals.css` - Global styles and Tailwind imports
- `/src/fonts.ts` - Font configuration using Next.js font optimization

### Important Patterns
1. **Component Organization**: Components are grouped by feature (e.g., hero/, pricing/, blog/) with each directory containing the main component and its sub-components
2. **TypeScript Path Alias**: Use `@/*` to import from `/src/*`
3. **Styling**: All styling uses Tailwind utility classes. To change the color scheme, find/replace color names (e.g., "indigo" → "blue")
4. **No Testing Framework**: The project doesn't include tests - add your preferred testing library if needed

### Adding New Features
- Create new components in `/src/components/[feature-name]/`
- Import and add them to `/src/pages/index.tsx`
- Follow existing component patterns for consistency
- Use Tailwind classes for styling
- Leverage Framer Motion for animations when appropriate