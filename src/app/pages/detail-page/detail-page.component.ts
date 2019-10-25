import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGithub } from 'src/app/shared/apis/github/api-github.api';
import { UserDetail } from 'src/app/shared/apis/github/models/user-detail';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  infoMessage: string = null;
  loading: boolean = false;
  user: UserDetail;
  constructor(
    private _route: ActivatedRoute,
    private _apiGit: ApiGithub
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.loading = true;
        this.infoMessage = null;
        const userId = Number.parseInt(params.get('id'));
        this._apiGit.getUserById(userId)
          .pipe(
            tap(user => this.infoMessage = user == null ? 'User not found' : null),
            finalize(() => this.loading = false)
          )
          .subscribe(
            (user) => this.user = user,
            (error) => {
              this.user = null;
              this.infoMessage = 'oops something is broken'
            });
      }
    });
  }

}
