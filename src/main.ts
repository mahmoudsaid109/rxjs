import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponet } from './app/app';

bootstrapApplication(AppComponet, appConfig)
  .catch((err) => console.error(err));
