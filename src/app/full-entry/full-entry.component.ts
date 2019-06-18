import { Component, OnInit, ChangeDetectionStrategy, DoCheck, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api-service';
import { flattenDeep, last } from 'lodash';

@Component({
  selector: 'app-full-entry',
  templateUrl: './full-entry.component.html',
  styleUrls: ['./full-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullEntryComponent implements OnInit, DoCheck {
  public params;
  public entry: any;
  public comments: any[];
  public limit = '10';
  public lastName = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
    this.api.fetchEntry(this.params, {
      // count: this.limit,
      // limit: this.limit,
    })
      .subscribe(([entry, comments]) => {
        this.entry = entry.data.children[0].data;
        this.comments = comments.data.children;
        const allComments = last(flattenDeep(this.comments));
        this.lastName = allComments.data.name;
      });
  }

  public ngDoCheck() {
    if (this.entry && this.entry.name === this.params.entry_id) {
      return;
    }

    this.cd.markForCheck();
  }

  public onShowComments() {
    this.api.fetchEntry(this.params, {
      count: this.limit,
      limit: this.limit,
      after: this.lastName,
    })
      .subscribe(([, comments]) => {
        this.comments.push(...comments.data.children);
      });
  }

}
