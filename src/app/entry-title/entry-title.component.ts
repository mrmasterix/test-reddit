import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entry-title',
  templateUrl: './entry-title.component.html',
  styleUrls: ['./entry-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryTitleComponent implements OnInit, DoCheck {
  @Input() public title = '';
  @Input() public permalink = '';
  public oldTitle = '';
  public oldPermalink = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  public ngOnInit() {
  }

  public ngDoCheck() {
    if (this.title !== this.oldTitle) {
      this.oldTitle = this.title;
      this.oldPermalink = this.permalink;
      this.cd.markForCheck();
    }
  }

  public onTitleClick() {
    this.router.navigate([this.permalink]);
  }
}
