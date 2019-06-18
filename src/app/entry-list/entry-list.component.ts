import { Component, OnInit, Input, OnChanges, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { last } from 'lodash';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryListComponent implements OnInit, DoCheck {
  @Input() public subreddit: string;
  public entries: Observable<any[]>;

  public entriesCache: any = {};
  public lastEntry: any;

  constructor(
    public apiService: ApiService,
    public route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.subreddit = this.route.snapshot.params.subreddit;
    this.entries = this.fetchSubredditData();
  }

  ngDoCheck() {
    const newSubreddit = this.route.snapshot.params.subreddit;
    if (newSubreddit === this.subreddit) {
      return;
    }

    this.cd.markForCheck();
    this.subreddit = newSubreddit;
    this.entries = this.fetchSubredditData();
  }

  public fetchSubredditData(query = {}): Observable<any[]> {
    if (!this.subreddit) {
      return of([]);
    }

    if (this.entriesCache[this.subreddit]) {
      return of(this.entriesCache[this.subreddit]);
    }

    return this.apiService.fetchSubreddit(this.subreddit, query)
      .pipe(
        map(data => {
          const childrenData = data.data.children;
          this.entriesCache[this.subreddit] = childrenData;
          this.lastEntry = last(this.entriesCache[this.subreddit]);
          return childrenData;
        })
      );
  }

  public onClearCache(): void {
    this.entriesCache = {};
  }

  public onLoadNext() {
    const idName = this.lastEntry.data.name;
    const query = {
      after: idName,
    };
    this.entries = this.apiService.fetchSubreddit(this.subreddit, query)
      .pipe(
        map(data => {
          const childrenData = data.data.children;
          const all = this.entriesCache[this.subreddit].concat((childrenData));
          this.lastEntry = last(this.entriesCache[this.subreddit]);
          return all;
        })
      );
    this.cd.markForCheck();
  }
}
