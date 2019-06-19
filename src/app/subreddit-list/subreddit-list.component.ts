import { Component, OnInit, Input, ChangeDetectionStrategy, DoCheck, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subreddit-list',
  templateUrl: './subreddit-list.component.html',
  styleUrls: ['./subreddit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubredditListComponent {
  @Input() list: any[] = [];

  constructor(private router: Router) { }

  public onClickHandler($event: Event, item) {
    $event.preventDefault();
    this.router.navigate([item.url], { state: item });
  }

}
