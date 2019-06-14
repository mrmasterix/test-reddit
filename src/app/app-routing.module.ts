import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryTitleComponent } from './entry-title/entry-title.component';

const routes: Routes = [
  {
    path: 'r/:subreddit',
    component: EntryTitleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
