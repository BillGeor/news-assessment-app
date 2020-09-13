import { NewsComponent } from './news/news.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home/1/none/all', pathMatch: 'full' },
  { path: 'home/:page/:category/:filter', component: NewsComponent },
  {path: '**', redirectTo: 'home/1/none/all'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}



