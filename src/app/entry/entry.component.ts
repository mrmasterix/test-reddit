import { Component, OnInit, ChangeDetectionStrategy, Input, DoCheck, ChangeDetectorRef, OnChanges, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryComponent implements OnInit, DoCheck, OnChanges, AfterContentChecked {
  @Input() public entry: any;
  public entryNow;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.entryNow = this.entry;
    // this.cd.detach();
  }

  ngDoCheck() {
    if (this.entryNow.data.name === this.entry.data.name) {
      return;
    }

    // this.cd.reattach();
  }

  public ngOnChanges() {
    console.log('ngOnChanges: app-entry');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked: app-entry');
  }

}
