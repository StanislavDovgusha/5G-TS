import { Component, OnInit } from '@angular/core';
import { SearchEvent } from 'src/app/shared/components/search/interfaces/search-event';
import { ApiGithub } from 'src/app/shared/apis/github/api-github.api';
import { UserItem } from 'src/app/shared/apis/github/models/user-item';
import { take, mergeMap, filter, toArray, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-blocks-page',
  templateUrl: './blocks-page.component.html',
  styleUrls: ['./blocks-page.component.scss']
})
export class BlocksPageComponent implements OnInit {


  infoMessage: string = null;
  loading: boolean = false;
  users: UserItem[] = [];
  constructor(
    private _apiGit: ApiGithub
  ) { }

  ngOnInit() {
  }

  search(event: SearchEvent) {
    const { value } = event;
    if (value == null || value.length === 0) {
      this.users = [];
      return;
    }
    this.loading = true;
    this.infoMessage = null;
    this._apiGit.searchUser(value)
      .pipe(
        mergeMap(res => res),
        take(20),
        toArray(),
        finalize(() => { this.loading = false; }),
        tap(users => this.infoMessage = users.length === 0 ? 'User not found' : null),
      )
      .subscribe(
        (users) => this.users = users,
        (error) => {
          this.users = [];
          this.infoMessage = 'oops something is broken'
        });
  }

  trackUser(index, user: UserItem) { return user.id }

}
