import { Component, OnInit, ChangeDetectionStrategy, Input, DoCheck, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryComponent implements OnInit, DoCheck {
  @Input() public entry: any;
  public entryNow;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cd.detach();
  }

  ngDoCheck() {
    if (this.entryNow && this.entryNow.data.name === this.entry.data.name) {
      return;
    }
    this.entryNow = this.entry;
    this.cd.reattach();
  }

}
