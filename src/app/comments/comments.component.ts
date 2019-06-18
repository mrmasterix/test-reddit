import { Component, OnInit, Input, ChangeDetectionStrategy, DoCheck, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit, DoCheck {
  @Input() public comments: any[];
  public oldComments: any[] = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.cd.detach();
  }

  ngDoCheck() {
    if (this.comments.length !== this.oldComments.length) {
      this.cd.detectChanges();
    }
  }

}
