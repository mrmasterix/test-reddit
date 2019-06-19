import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api-service';
import { Observable, Subject, merge } from 'rxjs';
import { map, switchMap, tap, share, filter, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryListComponent implements OnInit, DoCheck {
  public subreddit: string;
  public $entries: Observable<any>;
  public entries: any[] = [];
  public newEntries: any[] = [];
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
    private router: Router,
  ) { }

  public ngOnInit() {
    this.subreddit = this.route.snapshot.params.subreddit;
    this.initDataFetchObs();
  }

  public ngDoCheck() {
    const curEntriesNames = this.entries.map(entr => entr.data.name);
    const newEntriesNames = this.newEntries.map(entr => entr.data.name);
    if (!isEqual(curEntriesNames, newEntriesNames)) {
      this.entries = this.newEntries;
      this.cd.markForCheck();
    }
  }

  public fetchNextEntries() {
    return this.fetchNext.pipe(
      tap(() => this.page += 1),
      switchMap(() => this.fetchEntries({ after: this.pageNavigation[this.page - 1].after }))
    );
  }

  public fetchPrevEntries() {
    return this.fetchPrev.pipe(
      tap(() => this.page -= 1),
      switchMap(() => this.fetchEntries({ before: this.pageNavigation[this.page + 1].before }))
    );
  }

  public onCountChange() {
    return this.changeNum.pipe(
      tap((num: string) => this.itemsNumToFetch = num),
      distinctUntilChanged(),
      switchMap(() => this.fetchEntries())
    );
  }

  public onRouteChage() {
    return this.router.events.pipe(
      filter(val => val instanceof NavigationEnd),
      tap(() => {
        this.subreddit = this.route.snapshot.params.subreddit;
        this.page = 1;
        this.pageNavigation = {};
      }),
      switchMap(() => this.fetchEntries({ after: null, before: null }))
    );
  }

  public initDataFetchObs() {
    this.$entries = merge(
      this.fetchEntries(),
      this.fetchNextEntries(),
      this.fetchPrevEntries(),
      this.onCountChange(),
      this.onRouteChage(),
    ).pipe(share());

    this.$entries.subscribe(entries => {
      this.newEntries = entries;
    });
  }

  public fetchEntries(userQuery = {}) {
    const reqQuery = {
      limit: this.itemsNumToFetch,
      count: this.itemsNumToFetch,
      before: null,
      after: (this.pageNavigation[this.page - 1] || {}).after,
      ...userQuery,
    };

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

  public onNumItemsChange(event): void {
    const val = event.target.value;
    this.itemsNumToFetch = val;
  }
}
