import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponet } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponet, config);

export default bootstrap;
