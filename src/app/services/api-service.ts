import { Injectable } from '@angular/core';
import { API_URL } from '../global-constants';
import { Observable } from 'rxjs';
import { get } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface GetQuery {
  limit?: string;
  count?: string;
  before?: string;
  after?: string;
}

@Injectable()
export class ApiService {
  private apiUrl: string = API_URL;
  public limit = '10';

  constructor(
    private http: HttpClient,
  ) {

  }

  public generateQuery(query: GetQuery) {
    const limit: string = get(query, 'limit', this.limit);
    const after = get(query, 'after');
    const before = get(query, 'before');

    const result =  new URLSearchParams();
    result.set('limit', limit);
    result.set('count', limit);

    if (after) { result.set('after', after); }
    if (before) { result.set('before', before); }

    return result.toString();
  }

  public fetchReddits(endpoint: string, query: GetQuery = {}): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}.json?${this.generateQuery(query)}`)
      .pipe(map(this.mapReddits));
  }

  public mapReddits(response) {
    const data = get(response, 'data.children', []);

    return data.map(child => child.data);
  }

  public fetchSubreddit(subreddit: string, query: GetQuery = {}): Observable<any> {
    return this.http.get(`${this.apiUrl}/r/${subreddit}.json?${this.generateQuery(query)}`);
  }
}
