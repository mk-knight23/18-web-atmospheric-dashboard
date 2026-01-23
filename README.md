# SkyScan - Professional Weather PWA Dashboard

An enterprise-grade weather intelligence platform built with Angular 19 and designed as a high-performance Progressive Web App (PWA).

## Features

- **PWA Excellence** - Fully installable on desktop and mobile with offline-first support.
- **Dynamic Intelligence** - Real-time weather scanning with adaptive UI gradients based on atmospheric conditions.
- **Location Scanning** - Global city search with auto-complete simulation.
- **Advanced Metrics** - Comprehensive weather stats including feels-like temperature, humidity, wind speed, and pressure.
- **Responsive Fluidity** - Pixel-perfect layout across all screen sizes.
- **Dark/Light Intelligence** - Sophisticated theme management for all lighting conditions.

## Tech Stack
- **Framework:** Angular 19 (Signals, Standalone Architecture)
- **Styling:** Tailwind CSS (Modern Glassmorphism)
- **Icons:** Lucide Angular
- **PWA:** @angular/pwa (Service Workers, Manifest)
- **API:** OpenWeatherMap API

## Project Structure
```text
src/app/
├── core/services/          # Weather & Location intelligence
├── types/                  # Strict atmospheric data interfaces
└── app.component.ts        # Reactive dashboard engine
```

## Setup & Build Instructions

### Prerequisites
- Node.js 18.x or higher
- npm 10.x or higher

### Installation
```bash
# Install dependencies
npm install
```

### Development
```bash
# Start development server
npm start
```

### Production Build
```bash
# Build for production
npm run build
```

## Deployment
This dashboard is optimized for static hosting with PWA features enabled in production builds.

---

**License:** MIT
**Architect:** mk-knight23
