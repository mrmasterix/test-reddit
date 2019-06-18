import { Component, OnInit, Input, OnChanges, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api-service';
import { Observable, of, Subject, fromEvent, interval, merge, combineLatest } from 'rxjs';
import { map, switchMap, withLatestFrom, shareReplay, tap, switchMapTo, isEmpty, share } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { last, first, omit, pick } from 'lodash';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryListComponent implements OnInit, DoCheck {
  public subreddit: string;
  public $entries: Observable<any>;
  public entries: any[];
  public fetchNext = new Subject();
  public fetchPrev = new Subject();
  public changeNum = new Subject();
  public lastEntryName: string;
  public firstEntryName: string;
  public itemsNumToFetch = '10';
  public page = 1;
  public pageNavigation = {};

  constructor(
    public apiService: ApiService,
    public route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) { }

  public ngOnInit() {
    this.subreddit = this.route.snapshot.params.subreddit;
    this.initDataFetchObs();
  }

  public ngDoCheck() {
    // this.cd.markForCheck();
  }

  public initDataFetchObs() {
    const $fetchNextEntries = this.fetchNext.pipe(
      tap(() => this.page += 1),
      switchMap(() => this.fetchEntries({}, 'next'))
    );
    const $fetchPrevEntries = this.fetchPrev.pipe(
      tap(() => this.page -= 1),
      switchMap(() => this.fetchEntries({}, 'prev'))
    );
    const $fetchNum = this.changeNum.pipe(
      tap((num: string) => this.itemsNumToFetch = num),
      switchMap(() => this.fetchEntries())
    );
    this.$entries = merge(
      this.fetchEntries({ limit: '9' }),
      $fetchNum,
      $fetchNextEntries,
      $fetchPrevEntries,
    ).pipe(share());
  }

  public fetchEntries(userQuery = {}, dest?) {
    const reqQuery = {
      limit: this.itemsNumToFetch,
      count: this.itemsNumToFetch,
      before: null,
      after: (this.pageNavigation[this.page - 1] || {}).after,
      ...userQuery,
    };

    if (dest && dest === 'next') {
      reqQuery.after = this.pageNavigation[this.page - 1].after;
    }

    if (dest && dest === 'prev') {
      reqQuery.before = this.pageNavigation[this.page + 1].before;
      delete reqQuery.after;
    }

    return this.apiService.fetchSubreddit(this.subreddit, reqQuery)
      .pipe(
        map((response): any[] => response.data),
        tap((data: any) => {
          this.pageNavigation[this.page] = {
            after: data.after,
            before: data.before,
          };
          this.lastEntryName = data.after;
        }),
        map((data): any[] => data.children),
      );
  }

  public isPrevDisabled() {
    return this.page === 1;
  }
}
