import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryListComponent } from './entry-list/entry-list.component';
import { FullEntryComponent } from './full-entry/full-entry.component';

const routes: Routes = [
  {
    path: 'r/:subreddit',
    component: EntryListComponent,
  },
  {
    path: 'r/:subreddit/comments/:entry_id/:entry_title',
    component: FullEntryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
