import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entry-title',
  templateUrl: './entry-title.component.html',
  styleUrls: ['./entry-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryTitleComponent implements OnInit, OnChanges {
  @Input() public title = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit() {
  }

  public ngOnChanges(a) {
    console.log(a);
  }
}
