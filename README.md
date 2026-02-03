# 18-web-atmospheric-dashboard

An enterprise-grade weather intelligence platform built with Angular 21 and Tailwind CSS v4.

## Live Links

| Platform | URL | Status |
|----------|-----|--------|
| **Render** | https://18-web-atmospheric-dashboard.onrender.com | Ready to Deploy |
| **Vercel** | https://18-web-atmospheric-dashboard.vercel.app | Ready to Deploy |
| **Firebase** | https://web-atmospheric-dashboard.web.app | Ready to Deploy |
| **AWS Amplify** | https://main.18-web-atmospheric-dashboard.amplifyapp.com | Ready to Deploy |

*Auto-deployed from GitHub main branch*

## Features

- **Dynamic Intelligence** - Real-time weather scanning with adaptive UI gradients based on atmospheric conditions.
- **Location Scanning** - Global city search with auto-complete simulation.
- **Advanced Metrics** - Comprehensive weather stats including feels-like temperature, humidity, wind speed, and pressure.
- **Responsive Fluidity** - Pixel-perfect layout across all screen sizes.
- **Dark/Light Intelligence** - Sophisticated theme management for all lighting conditions.
- **Keyboard Shortcuts** - Full keyboard navigation support (Ctrl+S, Ctrl+F, Escape, H, ?)
- **Audio Feedback** - Subtle audio cues for interactions (can be disabled)

## Tech Stack

- **Framework:** Angular 21 (Signals, Standalone Architecture)
- **Styling:** Tailwind CSS v4 (Modern Glassmorphism)
- **Icons:** Lucide Angular
- **API:** OpenWeatherMap API
- **Testing:** Vitest 4.0

## Project Structure

```text
src/app/
├── core/services/          # Weather, Settings, Stats, Audio, Keyboard services
├── types/                  # Strict atmospheric data interfaces
├── features/dashboard/     # Dashboard components
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

Output directory: `dist/weather-pwa`

### Testing

```bash
# Run tests
npm test
```

## Deployment

### Render (One-Click Deploy)

This repository includes a `render.yaml` blueprint for automated deployment:

1. Visit [dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect repository: `mk-knight23/18-web-atmospheric-dashboard`
4. Render will auto-detect and apply the blueprint configuration

### Vercel

```bash
# Deploy to Vercel
vercel --prod
```

### Firebase Hosting

```bash
# Deploy to Firebase
firebase deploy --only hosting
```

### AWS Amplify

Connect the repository in AWS Amplify Console. The `amplify.yml` file is included for automatic configuration.

## Manual Deployment

- **Build Command**: `npm run build`
- **Publish Directory**: `dist/weather-pwa`

---

**License:** MIT
**Architect:** mk-knight23
