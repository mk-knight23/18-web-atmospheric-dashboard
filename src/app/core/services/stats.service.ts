import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { STORAGE_KEYS } from '../utils/constants';

interface Stats {
  totalSearches: number;
  totalLocationsSaved: number;
  lastSearchDate: string | null;
  totalTimeSpent: number;
}

const defaultStats: Stats = {
  totalSearches: 0,
  totalLocationsSaved: 0,
  lastSearchDate: null,
  totalTimeSpent: 0,
};

@Injectable({ providedIn: 'root' })
export class StatsService {
  private platformId = inject(PLATFORM_ID);

  private _totalSearches = signal<number>(0);
  private _totalLocationsSaved = signal<number>(0);
  private _totalTimeSpent = signal<number>(0);
  private _lastSearchDate = signal<string | null>(null);

  readonly totalSearches = this._totalSearches.asReadonly();
  readonly totalLocationsSaved = this._totalLocationsSaved.asReadonly();
  readonly totalTimeSpent = this._totalTimeSpent.asReadonly();
  readonly lastSearchDate = this._lastSearchDate.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STATS);
      if (stored) {
        const data = JSON.parse(stored);
        this._totalSearches.set(data.totalSearches ?? 0);
        this._totalLocationsSaved.set(data.totalLocationsSaved ?? 0);
        this._totalTimeSpent.set(data.totalTimeSpent ?? 0);
        this._lastSearchDate.set(data.lastSearchDate ?? null);
      }
    } catch {
      // Silently handle storage read failure
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(
        STORAGE_KEYS.STATS,
        JSON.stringify({
          totalSearches: this._totalSearches(),
          totalLocationsSaved: this._totalLocationsSaved(),
          totalTimeSpent: this._totalTimeSpent(),
          lastSearchDate: this._lastSearchDate(),
        })
      );
    } catch {
      // Silently handle storage write failure
    }
  }

  recordSearch(): void {
    this._totalSearches.update(v => v + 1);
    this._lastSearchDate.set(new Date().toISOString());
    this.saveToStorage();
  }

  recordLocationSaved(): void {
    this._totalLocationsSaved.update(v => v + 1);
    this.saveToStorage();
  }

  addTimeSpent(seconds: number): void {
    this._totalTimeSpent.update(v => v + seconds);
    this.saveToStorage();
  }

  resetStats(): void {
    this._totalSearches.set(0);
    this._totalLocationsSaved.set(0);
    this._totalTimeSpent.set(0);
    this._lastSearchDate.set(null);
    this.saveToStorage();
  }

  formatTime(): string {
    const seconds = this._totalTimeSpent();
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
}
