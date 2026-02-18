import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashPage } from './splash/splash.page';
import { WelcomePage } from './pages/welcome/welcome.page';
import { LoginPage } from './pages/login/login.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { VerifyPagePage } from './pages/verify-page/verify-page.page';
import { PlaywithNumbersPage } from './pages/playwith-numbers/playwith-numbers.page';



export const routes: Routes = [  
  {path: '',redirectTo: 'splash',pathMatch: 'full'},
  {path: 'splash',component:SplashPage},
  {path: 'welcome',component:WelcomePage},
  {path: 'login',component:LoginPage},
  {path: 'dashboard',component:DashboardPage},
  {path: 'verify',component:VerifyPagePage},
  {path: 'playwithnumbers',component:PlaywithNumbersPage},
  {path: 'gamelevels/:level',
    loadChildren: () => import('./pages/game-levels/game-levels.module').then( m => m.GameLevelsPageModule)
  },
  {
    path: 'exam-result',
    loadChildren: () => import('./pages/play-result-page/play-result-page.module').then( m => m.PlayResultPagePageModule)
  },

];


