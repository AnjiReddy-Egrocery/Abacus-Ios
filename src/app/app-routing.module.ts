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
  {
    path: 'quizexam',
    loadChildren: () => import('./pages/quizexam/quizexam.module').then( m => m.QuizexamPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'appsetting',
    loadChildren: () => import('./pages/appsetting/appsetting.module').then( m => m.AppsettingPageModule)
  },
  {
    path: 'app-progress',
    loadChildren: () => import('./pages/app-progress/app-progress.module').then( m => m.AppProgressPageModule)
  },
  {
    path: 'refoundpolicy',
    loadChildren: () => import('./pages/refoundpolicy/refoundpolicy.module').then( m => m.RefoundpolicyPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./pages/privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  {
    path: 'termsconditions',
    loadChildren: () => import('./pages/termsconditions/termsconditions.module').then( m => m.TermsconditionsPageModule)
  },
  {
    path: 'helpand-supoort',
    loadChildren: () => import('./pages/helpand-supoort/helpand-supoort.module').then( m => m.HelpandSupoortPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },

];


