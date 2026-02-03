import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig).catch(() => {
  // Application bootstrap failed - error handled silently in production
});
