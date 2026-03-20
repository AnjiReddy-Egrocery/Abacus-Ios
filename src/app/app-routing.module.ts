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
  {
    path: 'allocatedcourses',
    loadChildren: () => import('./pages/allocatedcourses/allocatedcourses.module').then( m => m.AllocatedcoursesPageModule)
  },
  {
    path: 'course-level',
    loadChildren: () => import('./pages/allocated-course-levels/allocated-course-levels.module').then( m => m.AllocatedCourseLevelsPageModule)
  },
  {
    path: 'allocated-topic-exam',
    loadChildren: () => import('./pages/allocated-topic-exam/allocated-topic-exam.module').then( m => m.AllocatedTopicExamPageModule)
  },
  {
    path: 'allocated-topic-exam-result-page',
    loadChildren: () => import('./pages/allocated-topic-exam-result-page/allocated-topic-exam-result-page.module').then( m => m.AllocatedTopicExamResultPagePageModule)
  },
  {
    path: 'allocated-topic-visualization-exam',
    loadChildren: () => import('./pages/allocated-topic-visualization-exam/allocated-topic-visualization-exam.module').then( m => m.AllocatedTopicVisualizationExamPageModule)
  },
  {
    path: 'allocated-topic-visualization-result-page',
    loadChildren: () => import('./pages/allocated-topic-visualization-result-page/allocated-topic-visualization-result-page.module').then( m => m.AllocatedTopicVisualizationResultPagePageModule)
  },
  {
    path: 'allocated-assignment-exam',
    loadChildren: () => import('./pages/allocated-assignment-exam/allocated-assignment-exam.module').then( m => m.AllocatedAssignmentExamPageModule)
  },
  {
    path: 'allocated-assignment-exam-result-page',
    loadChildren: () => import('./pages/allocated-assignment-exam-result-page/allocated-assignment-exam-result-page.module').then( m => m.AllocatedAssignmentExamResultPagePageModule)
  },
  {
    path: 'allocated-assignment-visualization-exam',
    loadChildren: () => import('./pages/allocated-assignment-visualization-exam/allocated-assignment-visualization-exam.module').then( m => m.AllocatedAssignmentVisualizationExamPageModule)
  },
  {
    path: 'allocated-assignment-visualization-result-page',
    loadChildren: () => import('./pages/allocated-assignment-visualization-result-page/allocated-assignment-visualization-result-page.module').then( m => m.AllocatedAssignmentVisualizationResultPagePageModule)
  },
  {
    path: 'allocated-view-topic-practices',
    loadChildren: () => import('./pages/allocated-view-topic-practices/allocated-view-topic-practices.module').then( m => m.AllocatedViewTopicPracticesPageModule)
  },
  {
    path: 'allocated-view-topic-result-practices',
    loadChildren: () => import('./pages/allocated-view-topic-result-practices/allocated-view-topic-result-practices.module').then( m => m.AllocatedViewTopicResultPracticesPageModule)
  },
  {
    path: 'orders-page',
    loadChildren: () => import('./pages/orders-page/orders-page.module').then( m => m.OrdersPagePageModule)
  },
  {
    path: 'orders-info-page',
    loadChildren: () => import('./pages/orders-info-page/orders-info-page.module').then( m => m.OrdersInfoPagePageModule)
  },
  {
    path: 'allocated-assignment-view-practices',
    loadChildren: () => import('./pages/allocated-assignment-view-practices/allocated-assignment-view-practices.module').then( m => m.AllocatedAssignmentViewPracticesPageModule)
  },
  {
    path: 'allocated-assignment-view-result-practices',
    loadChildren: () => import('./pages/allocated-assignment-view-result-practices/allocated-assignment-view-result-practices.module').then( m => m.AllocatedAssignmentViewResultPracticesPageModule)
  },
  {
    path: 'worksheet-list',
    loadChildren: () => import('./pages/worksheet-list/worksheet-list.module').then( m => m.WorksheetListPageModule)
  },
  {
    path: 'worksheet-purchased-list',
    loadChildren: () => import('./pages/worksheet-purchased-list/worksheet-purchased-list.module').then( m => m.WorksheetPurchasedListPageModule)
  },
  {
    path: 'worksheet-purchased-list-topic',
    loadChildren: () => import('./pages/worksheet-purchased-list-topic/worksheet-purchased-list-topic.module').then( m => m.WorksheetPurchasedListTopicPageModule)
  },
  {
    path: 'worksheet-purchased-list-topic-exam',
    loadChildren: () => import('./pages/worksheet-purchased-list-topic-exam/worksheet-purchased-list-topic-exam.module').then( m => m.WorksheetPurchasedListTopicExamPageModule)
  },
  {
    path: 'worksheet-purchased-list-topic-exam-result',
    loadChildren: () => import('./pages/worksheet-purchased-list-topic-exam-result/worksheet-purchased-list-topic-exam-result.module').then( m => m.WorksheetPurchasedListTopicExamResultPageModule)
  },
  {
    path: 'worksheet-purchased-list-visualization-topic-exam',
    loadChildren: () => import('./pages/worksheet-purchased-list-visualization-topic-exam/worksheet-purchased-list-visualization-topic-exam.module').then( m => m.WorksheetPurchasedListVisualizationTopicExamPageModule)
  },
  {
    path: 'worksheet-purchased-list-visualization-topic-exam-result',
    loadChildren: () => import('./pages/worksheet-purchased-list-visualization-topic-exam-result/worksheet-purchased-list-visualization-topic-exam-result.module').then( m => m.WorksheetPurchasedListVisualizationTopicExamResultPageModule)
  },
  {
    path: 'worksheet-purchased-list-view-practices',
    loadChildren: () => import('./pages/worksheet-purchased-list-view-practices/worksheet-purchased-list-view-practices.module').then( m => m.WorksheetPurchasedListViewPracticesPageModule)
  },
  {
    path: 'worksheet-purchased-list-view-result',
    loadChildren: () => import('./pages/worksheet-purchased-list-view-result/worksheet-purchased-list-view-result.module').then( m => m.WorksheetPurchasedListViewResultPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./pages/update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
  {
    path: 'schedules',
    loadChildren: () => import('./pages/schedules/schedules.module').then( m => m.SchedulesPageModule)
  },
  {
    path: 'schedules-details',
    loadChildren: () => import('./pages/schedules-details/schedules-details.module').then( m => m.SchedulesDetailsPageModule)
  },
  {
    path: 'schedules-topic-list',
    loadChildren: () => import('./pages/schedules-topic-list/schedules-topic-list.module').then( m => m.SchedulesTopicListPageModule)
  },
  {
    path: 'schedules-assignment-list',
    loadChildren: () => import('./pages/schedules-assignment-list/schedules-assignment-list.module').then( m => m.SchedulesAssignmentListPageModule)
  },
  {
    path: 'schedulestopicexam',
    loadChildren: () => import('./pages/schedulestopicexam/schedulestopicexam.module').then( m => m.SchedulestopicexamPageModule)
  },
  {
    path: 'schedulestopicexam-result',
    loadChildren: () => import('./pages/schedulestopicexam-result/schedulestopicexam-result.module').then( m => m.SchedulestopicexamResultPageModule)
  },
  {
    path: 'schedulestopice-visualization-exam',
    loadChildren: () => import('./pages/schedulestopice-visualization-exam/schedulestopice-visualization-exam.module').then( m => m.SchedulestopiceVisualizationExamPageModule)
  },
  {
    path: 'schedulestopic-visualization-result',
    loadChildren: () => import('./pages/schedulestopic-visualization-result/schedulestopic-visualization-result.module').then( m => m.SchedulestopicVisualizationResultPageModule)
  },
  {
    path: 'schedulestopice-view-practices',
    loadChildren: () => import('./pages/schedulestopice-view-practices/schedulestopice-view-practices.module').then( m => m.SchedulestopiceViewPracticesPageModule)
  },
  {
    path: 'schedulestopic-view-practices-result',
    loadChildren: () => import('./pages/schedulestopic-view-practices-result/schedulestopic-view-practices-result.module').then( m => m.SchedulestopicViewPracticesResultPageModule)
  },
  {
    path: 'schedules-assignment-exam',
    loadChildren: () => import('./pages/schedules-assignment-exam/schedules-assignment-exam.module').then( m => m.SchedulesAssignmentExamPageModule)
  },
  {
    path: 'schedules-assignment-exam-result',
    loadChildren: () => import('./pages/schedules-assignment-exam-result/schedules-assignment-exam-result.module').then( m => m.SchedulesAssignmentExamResultPageModule)
  },
  {
    path: 'schedules-assignment-visualization-exam',
    loadChildren: () => import('./pages/schedules-assignment-visualization-exam/schedules-assignment-visualization-exam.module').then( m => m.SchedulesAssignmentVisualizationExamPageModule)
  },
  {
    path: 'schedules-assignment-visualization-exam-result',
    loadChildren: () => import('./pages/schedules-assignment-visualization-exam-result/schedules-assignment-visualization-exam-result.module').then( m => m.SchedulesAssignmentVisualizationExamResultPageModule)
  },
  {
    path: 'schedules-assignment-view-practices',
    loadChildren: () => import('./pages/schedules-assignment-view-practices/schedules-assignment-view-practices.module').then( m => m.SchedulesAssignmentViewPracticesPageModule)
  },
  {
    path: 'schedules-assignment-view-practices-result',
    loadChildren: () => import('./pages/schedules-assignment-view-practices-result/schedules-assignment-view-practices-result.module').then( m => m.SchedulesAssignmentViewPracticesResultPageModule)
  },
  {
    path: 'work-sheet-subscription-courses',
    loadChildren: () => import('./pages/work-sheet-subscription-courses/work-sheet-subscription-courses.module').then( m => m.WorkSheetSubscriptionCoursesPageModule)
  },
  {
    path: 'work-sheet-subscription-courses-details',
    loadChildren: () => import('./pages/work-sheet-subscription-courses-details/work-sheet-subscription-courses-details.module').then( m => m.WorkSheetSubscriptionCoursesDetailsPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'student-list',
    loadChildren: () => import('./pages/student-list/student-list.module').then( m => m.StudentListPageModule)
  },
  

];


