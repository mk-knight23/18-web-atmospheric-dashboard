import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './core/services/weather.service';
import { SettingsService } from './core/services/settings.service';
import { StatsService } from './core/services/stats.service';
import { AudioService } from './core/services/audio.service';
import { KeyboardService } from './core/services/keyboard.service';
import { SettingsPanelComponent } from './features/dashboard/components/settings-panel.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SettingsPanelComponent],
  template: `
    <div class="min-h-screen relative flex flex-col items-center" [class.dark]="settingsService.isDarkMode()" [class.light]="!settingsService.isDarkMode()">
      
      <!-- Dynamic Background Background -->
      <div class="fixed inset-0 z-[-1] transition-all duration-1000"
           [ngClass]="getBackgroundClass()">
      </div>

      <!-- Navigation / Search -->
      <nav class="w-full max-w-6xl px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center space-x-3">
          <div class="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/30 shadow-lg">
            <span class="text-white text-2xl">⚡</span>
          </div>
          <h1 class="text-2xl font-display font-black tracking-tight text-white drop-shadow-md">SkyScan<span class="opacity-70 font-light italic">PWA</span></h1>
        </div>

        <div class="relative w-full max-w-md group">
          <lucide-icon [name]="'search'" class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" [size]="20"></lucide-icon>
          <input 
            type="text" 
            [(ngModel)]="searchCity"
            (keyup.enter)="onSearch()"
            placeholder="Search city (e.g. London)..."
            class="input-search"
          >
        </div>

        <div class="flex items-center space-x-4">
          <button (click)="openSettings()" class="p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 transition-all shadow-lg">
            <lucide-icon [name]="'settings'" [size]="20"></lucide-icon>
          </button>
          <button (click)="toggleTheme()" class="p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 transition-all shadow-lg">
            @if (settingsService.isDarkMode()) {
              <lucide-icon [name]="'sun'" [size]="20"></lucide-icon>
            } @else {
              <lucide-icon [name]="'moon'" [size]="20"></lucide-icon>
            }
          </button>
          <button (click)="weatherService.toggleUnits()" class="p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-white font-black text-sm uppercase tracking-widest hover:bg-white/30 transition-all shadow-lg px-6">
            {{ weatherService.state().units === 'metric' ? '°C' : '°F' }}
          </button>
        </div>
      </nav>

      <main class="w-full max-w-6xl px-6 pb-20 space-y-12">
        
        @if (weatherService.isLoading()) {
          <div class="flex flex-col items-center justify-center py-40">
            <div class="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <p class="mt-4 text-white font-black uppercase tracking-[0.3em] text-[10px]">Scanning Atmospheric Data...</p>
          </div>
        } @else if (weatherService.currentWeather(); as data) {
          <!-- Main Card -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- Hero Weather -->
            <div class="lg:col-span-8 glass-card p-12 flex flex-col md:flex-row justify-between items-center relative overflow-hidden group">
               <div class="space-y-4 z-10 text-center md:text-left">
                  <div class="flex items-center justify-center md:justify-start space-x-2 text-blue-500 font-black uppercase tracking-[0.2em] text-xs">
                     <lucide-icon [name]="'map-pin'" [size]="14"></lucide-icon>
                     <span>{{ data.city }}, {{ data.country }}</span>
                  </div>
                  <h2 class="text-8xl md:text-9xl font-display font-black tracking-tighter text-slate-900 dark:text-white">{{ data.temp | number:'1.0-0' }}°</h2>
                  <div class="space-y-1">
                    <p class="text-2xl font-bold text-slate-700 dark:text-slate-300 capitalize">{{ data.description }}</p>
                    <p class="text-slate-500 dark:text-slate-500 font-medium">Feels like {{ data.feelsLike | number:'1.0-0' }}°</p>
                  </div>
               </div>
               
               <div class="z-10 mt-10 md:mt-0">
                  <img [src]="'https://openweathermap.org/img/wn/' + data.icon + '@4x.png'" 
                       class="w-64 h-64 drop-shadow-2xl animate-pulse" style="animation-duration: 4s" alt="">
               </div>

               <!-- Subtle Pattern Overlay -->
               <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                  <lucide-icon [name]="'sun'" [size]="300"></lucide-icon>
               </div>
            </div>

            <!-- Stats Sidebar -->
            <div class="lg:col-span-4 grid grid-cols-2 gap-6">
               <div class="glass-card p-8 flex flex-col items-center justify-center space-y-3">
                  <div class="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-500">
                    <lucide-icon [name]="'droplets'" [size]="24"></lucide-icon>
                  </div>
                  <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Humidity</p>
                  <p class="text-2xl font-black">{{ data.humidity }}%</p>
               </div>
               <div class="glass-card p-8 flex flex-col items-center justify-center space-y-3">
                  <div class="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-500">
                    <lucide-icon [name]="'wind'" [size]="24"></lucide-icon>
                  </div>
                  <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Wind</p>
                  <p class="text-2xl font-black">{{ data.windSpeed }} km/h</p>
               </div>
               <div class="glass-card p-8 flex flex-col items-center justify-center space-y-3">
                  <div class="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl text-amber-500">
                    <lucide-icon [name]="'sun'" [size]="24"></lucide-icon>
                  </div>
                  <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sunrise</p>
                  <p class="text-xl font-black">{{ data.sunrise * 1000 | date:'HH:mm' }}</p>
               </div>
               <div class="glass-card p-8 flex flex-col items-center justify-center space-y-3">
                  <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500">
                    <lucide-icon [name]="'thermometer'" [size]="24"></lucide-icon>
                  </div>
                  <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pressure</p>
                  <p class="text-xl font-black">{{ data.pressure }} hPa</p>
               </div>
            </div>

          </div>
          
          <!-- CTA Banner -->
          <div class="bg-blue-600 rounded-[3rem] p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-blue-600/20">
             <div class="space-y-2 text-center md:text-left">
                <h3 class="text-3xl font-display font-black tracking-tight">Stay ahead of the weather.</h3>
                <p class="text-blue-100 font-medium italic">Install SkyScan PWA to get real-time atmospheric insights offline.</p>
             </div>
             <button class="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl">
               INSTALL APP
             </button>
          </div>

        } @else if (weatherService.state().error) {
          <div class="max-w-md mx-auto glass-card p-12 text-center space-y-6">
             <div class="w-20 h-20 bg-red-50 dark:bg-red-900/30 text-red-500 rounded-3xl flex items-center justify-center mx-auto text-4xl">!</div>
             <div class="space-y-2">
               <h3 class="text-2xl font-black">Data Fetch Failed</h3>
               <p class="text-slate-500 font-medium">{{ weatherService.state().error }}</p>
             </div>
             <button (click)="onSearch()" class="text-blue-500 font-black uppercase tracking-widest text-xs hover:underline">Retry Connection</button>
          </div>
        } @else {
           <div class="max-w-2xl mx-auto py-20 text-center space-y-12">
              <div class="space-y-4">
                <h2 class="text-5xl md:text-7xl font-display font-black tracking-tight text-white drop-shadow-xl animate-bounce">Hello.</h2>
                <p class="text-white/80 text-xl font-medium italic">Search a city to begin scanning the horizon.</p>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60">
                 <div class="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 text-white">NYC</div>
                 <div class="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 text-white">LON</div>
                 <div class="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 text-white">TOK</div>
                 <div class="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 text-white">PAR</div>
              </div>
           </div>
        }

      </main>

      <footer class="mt-auto py-12 px-6 border-t border-slate-200 dark:border-slate-800 w-full flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400">
          <div class="flex items-center space-x-2">
             <span class="font-display font-black text-xl text-slate-300 dark:text-slate-700 uppercase tracking-tighter">SkyScan</span>
          </div>
          <p class="text-[10px] font-black uppercase tracking-[0.2em]">© 2026 Atmospheric Dynamics. Staff Engineering Architecture.</p>
          <div class="flex items-center space-x-6">
             <a href="https://github.com/mk-knight23/45-Weather-PWA-Dashboard"><lucide-icon [name]="'github'" [size]="18" class="hover:text-blue-500 transition-colors"></lucide-icon></a>
          </div>
      </footer>

      <app-settings-panel></app-settings-panel>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .input-search::placeholder { @apply text-slate-400 font-medium tracking-tight; }
  `]
})
export class App {
  weatherService = inject(WeatherService);
  settingsService = inject(SettingsService);
  statsService = inject(StatsService);
  private audioService = inject(AudioService);
  private keyboardService = inject(KeyboardService);
  searchCity = '';

  constructor() {
    effect(() => {
      this.settingsService.isDarkMode();
    });

    effect(() => {
      const action = this.keyboardService.lastAction();
      if (action !== 'none') {
        this.handleAction(action);
      }
    });
  }

  private handleAction(action: string): void {
    switch (action) {
      case 'help':
        this.settingsService.toggleHelp();
        break;
      case 'close':
        if (this.settingsService.showHelp()) {
          this.settingsService.toggleHelp();
        }
        break;
    }
  }

  onSearch() {
    if (this.searchCity.trim()) {
      this.weatherService.fetchWeather(this.searchCity);
      this.statsService.recordSearch();
      this.audioService.playSuccess();
    }
  }

  toggleTheme() {
    this.audioService.playClick();
    const current = this.settingsService.theme();
    const next: 'dark' | 'light' | 'system' = current === 'dark' ? 'light' : current === 'light' ? 'system' : 'dark';
    this.settingsService.setTheme(next);
  }

  openSettings() {
    this.audioService.playClick();
    this.settingsService.toggleHelp();
  }

  getBackgroundClass() {
    const condition = this.weatherService.currentWeather()?.condition?.toLowerCase() || 'clear';
    if (condition.includes('sun') || condition.includes('hot')) return 'weather-gradient-sunny';
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder')) return 'weather-gradient-rainy';
    if (condition.includes('clear')) return 'weather-gradient-clear';
    return 'bg-slate-900 dark:bg-slate-950';
  }
}
