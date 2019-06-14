import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryTitleComponent } from './entry-title/entry-title.component';
import { ApiService } from './services/api-service';
import { HttpClientModule } from '@angular/common/http';
import { SubredditListComponent } from './subreddit-list/subreddit-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryTitleComponent,
    SubredditListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
