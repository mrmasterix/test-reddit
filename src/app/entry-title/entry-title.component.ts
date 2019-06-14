import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entry-title',
  templateUrl: './entry-title.component.html',
  styleUrls: ['./entry-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryTitleComponent implements OnInit, OnChanges {
  public title = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  get runChangeDetection() {
    console.log('Checking the view');
    return true;
  }

  public setTitle() {
    console.log('setTitle');
    this.title = this.route.snapshot.params.subreddit;
    this.cdr.detectChanges();
  }

  public ngOnInit() {
    this.setTitle();
    this.router.events.subscribe(() => {
      if ( this.route.snapshot.params.subreddit !== this.title) {
        this.setTitle();
      }
    });
  }

  public ngOnChanges(a) {
    console.log(a);
  }
}
