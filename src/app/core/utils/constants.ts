export const STORAGE_KEYS = {
  SETTINGS: 'skyscan-settings',
  STATS: 'skyscan-stats',
} as const;

export const KEYBOARD_SHORTCUTS = [
  { key: 'Ctrl + S', action: 'Save Location' },
  { key: 'Ctrl + F', action: 'Focus Search' },
  { key: 'Escape', action: 'Close Modal' },
  { key: 'H', action: 'Toggle Help' },
  { key: '?', action: 'Show Shortcuts' },
] as const;
