import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Reddit Test';
  public redditsObs: Observable<any[]>;

  constructor(private api: ApiService) {
  }

  public ngOnInit() {
    this.redditsObs = this.api.fetchReddits('reddits');
  }
}
