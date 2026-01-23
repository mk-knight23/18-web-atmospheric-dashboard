import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { LucideAngularModule, Search, MapPin, Wind, Droplets, Sun, Moon, CloudRain, Cloud, Thermometer, ArrowUp, ArrowDown, Github } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({ Search, MapPin, Wind, Droplets, Sun, Moon, CloudRain, Cloud, Thermometer, ArrowUp, ArrowDown, Github }))
  ]
};
