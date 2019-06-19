import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api-service';
import { Observable, Subject, merge } from 'rxjs';
import { share, map, tap } from 'rxjs/operators';
import { lowerCase } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Reddit Test';
  public limit = '40';
  public redditsObs: Observable<any[]>;
  public filtering = new Subject();
  public redditsList = [];

  constructor(private api: ApiService) {
  }

  public ngOnInit() {
    this.redditsObs = merge(
      this.api.fetchReddits('reddits', { limit: this.limit, count: this.limit }).pipe(
        tap((reddits) => {
          this.redditsList = reddits;
        })
      ),
      this.filtering.pipe(
        map((event: any) => {
          const str = lowerCase(event.target.value);
          return str.length ? this.redditsList.filter(reddit => {
            const name: string = lowerCase(reddit.display_name);
            return name.startsWith(str);
          }) : this.redditsList;
        }),
      )
    )
      .pipe(
        share()
      );
  }

  public onFilterChange(event) {
    const str = event.target.value;
  }
}
