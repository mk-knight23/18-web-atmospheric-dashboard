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

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Presentation Layer                           │
│  Angular Components + Signals + Template Directives           │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Service Layer                                │
│  WeatherService + SettingsService + StatsService               │
│  + AudioService + KeyboardService                             │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer                                 │
│  OpenWeatherMap API + LocalStorage + State Management          │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                            │
│  OpenWeatherMap API + PWA Capabilities                          │
└─────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
18-web-atmospheric-dashboard/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── weather.service.ts      # Weather API integration
│   │   │   │   ├── settings.service.ts    # Settings & theme management
│   │   │   │   ├── stats.service.ts       # Usage analytics
│   │   │   │   ├── audio.service.ts       # Audio feedback
│   │   │   │   └── keyboard.service.ts    # Keyboard shortcuts
│   │   │   └── utils/
│   │   │       └── constants.ts           # App constants
│   │   ├── features/
│   │   │   └── dashboard/
│   │   │       └── components/
│   │   │           └── settings-panel.component.ts
│   │   ├── types/
│   │   │   └── weather.ts                 # TypeScript interfaces
│   │   ├── app.component.ts              # Main application component
│   │   ├── app.config.ts                 # Angular configuration
│   │   └── app.routes.ts                 # Routing configuration
│   ├── index.html                        # HTML entry point
│   └── main.ts                           # Bootstrap Angular
│
├── public/                               # Static assets
│
├── .github/workflows/                    # CI/CD pipelines
│
├── angular.json                          # Angular CLI configuration
├── package.json                          # Dependencies & scripts
├── tsconfig.json                         # TypeScript configuration
├── vercel.json                          # Vercel deployment
├── render.yaml                          # Render deployment
├── firebase.json                        # Firebase configuration
├── amplify.yml                          # AWS Amplify configuration
└── README.md                            # This file
```

### Tech Stack

```typescript
{
  framework: {
    name: "Angular",
    version: "21.1.0",
    features: [
      "Standalone Components",
      "Signals (reactive state)",
      "Effect() (computed side effects)",
      "TypeScript 5.9",
      "Zone.js",
      "RxJS 7.8"
    ]
  },
  styling: {
    name: "Tailwind CSS",
    version: "4.0.0",
    features: [
      "Dark mode support",
      "Responsive utilities",
      "Custom animations",
      "Backdrop blur",
      "Glass morphism effects"
    ]
  },
  icons: {
    library: "Lucide Angular",
    version: "0.563.0",
    features: ["Tree-shakeable", "Type-safe"]
  },
  buildTool: {
    name: "Angular CLI",
    version: "21.1.1",
    features: [
      "ESBuild",
      "Production optimizations",
      "Bundle analysis",
      "Tree-shaking"
    ]
  }
}
```

### Service Architecture

```typescript
{
  services: {
    weatherService: {
      purpose: "Weather data management",
      state: {
        type: "Signal",
        properties: [
          "currentWeather: WeatherData | null",
          "isLoading: boolean",
          "error: string | null",
          "units: 'metric' | 'imperial'"
        ]
      },
      methods: [
        "fetchWeather(city: string): Promise<void>",
        "toggleUnits(): void",
        "state(): Signal<WeatherState>"
      ],
      api: {
        provider: "OpenWeatherMap",
        endpoint: "https://api.openweathermap.org/data/2.5/weather",
        auth: "API Key (environment variable)"
      }
    },
    settingsService: {
      purpose: "User preferences & theme management",
      state: {
        type: "Signal",
        properties: [
          "theme: 'dark' | 'light' | 'system'",
          "showHelp: boolean"
        ]
      },
      methods: [
        "setTheme(theme: string): void",
        "theme(): Signal<string>",
        "isDarkMode(): boolean",
        "toggleHelp(): void",
        "showHelp(): Signal<boolean>"
      ],
      storage: "LocalStorage"
    },
    statsService: {
      purpose: "Usage analytics",
      state: {
        type: "LocalStorage",
        metrics: [
          "searchCount: number",
          "lastSearch: timestamp",
          "citiesSearched: string[]"
        ]
      },
      methods: [
        "recordSearch(): void",
        "getStats(): UsageStats"
      ]
    },
    audioService: {
      purpose: "Audio feedback",
      sounds: [
        "click: button interactions",
        "success: successful operations",
        "error: failed operations"
      ],
      implementation: "Web Audio API or Audio elements"
    },
    keyboardService: {
      purpose: "Keyboard shortcuts",
      shortcuts: {
        "/": "Toggle help",
        "Escape": "Close modals"
      },
      state: {
        type: "Signal",
        lastAction: "Signal<string>"
      }
    }
  }
}
```

### Component Architecture

```typescript
{
  appComponent: {
    purpose: "Main application shell",
    features: [
      "City search",
      "Current weather display",
      "Theme toggle",
      "Unit toggle",
      "Settings panel",
      "Dynamic backgrounds"
    ],
    template: {
      sections: [
        "Navigation bar with search",
        "Main weather card",
        "Stats grid (humidity, wind, etc)",
        "Error states",
        "Loading states",
        "Empty states",
        "Footer",
        "Settings panel"
      ]
    },
    signals: {
      searchCity: "string",
      isDarkMode: "boolean",
      weatherData: "WeatherData | null",
      isLoading: "boolean"
    }
  },
  settingsPanelComponent: {
    purpose: "Settings and help modal",
    features: [
      "Theme selection",
      "Keyboard shortcuts help",
      "About information"
    ],
    state: {
      isOpen: "Signal<boolean>"
    }
  }
}
```

### State Management Architecture

```typescript
{
  stateManagement: {
    approach: "Angular Signals",
    pattern: "Reactive state with effect()",
    features: [
      "Automatic tracking",
      "Performance optimizations",
      "Type-safe",
      "Zone.js coalescing",
      "Effect() for side effects"
    ],
    signalTypes: [
      {
        type: "WritableSignal",
        example: "searchCity = signal('')"
      },
      {
        type: "ComputedSignal",
        example: "isDarkMode = computed(() => theme() === 'dark')"
      },
      {
        type: "Effect",
        example: "effect(() => console.log(theme()))"
      }
    ]
  }
}
```

### Weather Data Flow

```
User Input → Search Component
    ↓
weatherService.fetchWeather(city)
    ↓
HTTP Request → OpenWeatherMap API
    ↓
Parse Response → WeatherData Interface
    ↓
Update State → weatherService.state()
    ↓
Template Updates → Signal Re-render
    ↓
UI Update → Weather Display
```

### TypeScript Interfaces

```typescript
{
  types: {
    weatherData: {
      city: "string",
      country: "string",
      temp: "number",
      feelsLike: "number",
      description: "string",
      condition: "string",
      icon: "string",
      humidity: "number",
      windSpeed: "number",
      pressure: "number",
      sunrise: "number (timestamp)",
      sunset: "number (timestamp)"
    },
    weatherState: {
      currentWeather: "WeatherData | null",
      isLoading: "boolean",
      error: "string | null",
      units: "'metric' | 'imperial'"
    },
    usageStats: {
      searchCount: "number",
      lastSearch: "number",
      citiesSearched: "string[]"
    }
  }
}
```

### Styling Architecture

```typescript
{
  styling: {
    framework: "Tailwind CSS 4.0.0",
    approach: "Utility-first",
    features: [
      "Dark mode (class strategy)",
      "Responsive breakpoints (sm, md, lg)",
      "Custom animations",
      "Glass morphism (backdrop-blur)",
      "Gradient backgrounds"
    ],
    customStyles: [
      "weather-gradient-sunny",
      "weather-gradient-rainy",
      "weather-gradient-clear",
      "glass-card (background blur)"
    ],
    themeColors: {
      dark: {
        background: "slate-950",
        text: "white",
        cards: "slate-900/50"
      },
      light: {
        background: "slate-50",
        text: "slate-900",
        cards: "white"
      }
    }
  }
}
```

### Dynamic Backgrounds

```typescript
{
  backgrounds: {
    implementation: "CSS classes based on weather condition",
    mapping: {
      sunny: "weather-gradient-sunny",
      clear: "weather-gradient-clear",
      rainy: "weather-gradient-rainy",
      default: "bg-slate-900 dark:bg-slate-950"
    },
    transitions: "All backgrounds use transition-all duration-1000"
  }
}
```

### PWA Features

```typescript
{
  pwa: {
    features: [
      "Responsive design",
      "Touch-optimized UI",
      "Mobile-first approach",
      "Fast loading",
      "Offline-ready architecture"
    ],
    deployment: [
      "Firebase Hosting",
      "Vercel",
      "Render",
      "AWS Amplify"
    ]
  }
}
```

### Build Pipeline

```typescript
{
  build: {
    dev: "ng serve",
    production: "ng build --configuration production",
    output: "dist/ directory",
    features: [
      "Code splitting",
      "Tree-shaking",
      "Minification",
      "ESBuild",
      "Optimized bundles"
    ]
  }
}
```

### Environment Variables

```typescript
{
  envVariables: {
    OPENWEATHERMAP_API_KEY: "Required - OpenWeatherMap API key",
    API_URL: "OpenWeatherMap API endpoint"
  },
  files: [".env.example", ".env (gitignored)"]
}
```

### Keyboard Shortcuts

```typescript
{
  shortcuts: [
    {
      key: "/",
      action: "Toggle help/settings panel"
    },
    {
      key: "Escape",
      action: "Close open panels"
    },
    {
      key: "Enter",
      action: "Submit search"
    }
  ]
}
```

### Error Handling

```typescript
{
  errorHandling: {
    states: [
      {
        type: "loading",
        display: "Spinner with scanning message"
      },
      {
        type: "error",
        display: "Error card with retry button"
      },
      {
        type: "empty",
        display: "Welcome message with quick city buttons"
      }
    ],
    userFeedback: [
      "Audio feedback on errors",
      "Visual error messages",
      "Retry functionality"
    ]
  }
}
```

### CI/CD Pipeline

```yaml
Push to main → Build → Test → Deploy
     ↓          ↓        ↓        ↓
  Trigger    Angular   Tests   Multiple
              Build    (Jest)   Platforms
```

- **Build**: Angular production build
- **Test**: Run Jest tests
- **Deploy**: Multi-platform deployment

### Multi-Platform Deployment

| Platform | URL | Type |
|----------|-----|------|
| Render | https://18-web-atmospheric-dashboard.onrender.com | Serverless |
| Vercel | https://18-web-atmospheric-dashboard.vercel.app | Edge Functions |
| Firebase | https://web-atmospheric-dashboard.web.app | Static Hosting |
| AWS Amplify | https://main.18-web-atmospheric-dashboard.amplifyapp.com | Full-Stack |

### Extension Points

```typescript
{
  extensions: [
    "Add forecast data (5-day forecast)",
    "Add hourly breakdown",
    "Add weather alerts",
    "Add multiple locations saved",
    "Add geolocation support",
    "Add weather maps",
    "Add historical data",
    "Add weather news"
  ]
}
```

### Key Architectural Decisions

**Why Angular 21?**
- Latest stable version with Signals
- Standalone components (no NgModules)
- Built-in DI and routing
- Enterprise-grade architecture
- Excellent TypeScript support

**Why Angular Signals?**
- Automatic dependency tracking
- Better performance than RxJS for local state
- Simpler mental model
- Type-safe
- Coalesced updates with Zone.js

**Why Tailwind CSS 4.0?**
- Latest version with better performance
- Native CSS-first approach
- No PostCSS dependencies
- Smaller bundle size
- Better dark mode support

**Why OpenWeatherMap API?**
- Free tier available
- Comprehensive weather data
- Simple REST API
- Wide city coverage
- Consistent response format

**Why Signals for State?**
- Reactive without RxJS complexity
- Better performance than OnPush
- Automatic change detection
- Type-safe
- Synchronous reads

### Design Philosophy

```typescript
{
  design: {
    principles: [
      "Minimalism",
      "Glass morphism",
      "Dark mode first",
      "Mobile-first",
      "Fast loading",
      "Smooth animations"
    ],
    ui: {
      approach: "Card-based layout",
      visualEffects: [
        "Backdrop blur",
        "Gradient backgrounds",
        "Pulse animations",
        "Hover transitions"
      ]
    }
  }
}
```

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Tech Stack

- Modern web framework
- Optimized for performance
- Responsive design
- Accessibility ready

## 🛠️ Installation

```bash
git clone https://github.com/mk-knight23/18-web-atmospheric-dashboard.git
cd 18-web-atmospheric-dashboard
npm install
```

## 📝 License

MIT

---

*Last updated: 2026-03-01*
