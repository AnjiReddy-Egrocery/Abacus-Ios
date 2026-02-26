import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { routes } from './app/app-routing.module';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      IonicModule.forRoot(),
      IonicStorageModule.forRoot() // ✅ Storage provider globally available
    ),
    provideRouter(routes),
    provideHttpClient(),
    // ✅ ADD THIS LINE (MOST IMPORTANT)
    provideCharts(withDefaultRegisterables())
  ],
}).catch(err => console.error(err));



 
