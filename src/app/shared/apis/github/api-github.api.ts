import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserItem } from './models/user-item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetail } from './models/user-detail';

@Injectable()
export class ApiGithub {

  private _baseurl = 'https://api.github.com';

  constructor(
    private _api: ApiService
  ) { }

  public searchUser(search: string, page: number = 1, sort?): Observable<UserItem[]> {
    return this._api.get(`${this._baseurl}/search/users${this._api.createQuery({ q: search, page: page })}`)
      .pipe(map((response: RSearchByUser) => {
        return response.items.map(user => (extractUserItem(user)));
      }));
  }

  public getUserById(userId: number): Observable<UserDetail> {
    return this._api.get(`${this._baseurl}/user/${userId}`)
      .pipe(map((response: any) => {
        return extractUserDetail(response);
      }));
  }

  // todo
  public login(username: string, password: string) {
    return this._api.post(`${this._baseurl}/authorizations`)
      .pipe(map(response => {
        return response;
      }));
  }

}

// ======================== Helpers ========================
function extractUserItem(res: RUserItem): UserItem {
  return {
    avatarUrl: res.avatar_url,
    id: res.id,
    login: res.login,
    roleType: res.type,
    score: res.score,
  };
}

function extractUserDetail(res: RUserDetail): UserDetail {
  return {
    avatarUrl: res.avatar_url,
    bio: res.bio,
    email: res.email,
    id: res.id,
    login: res.login,
    name: res.name,
    profileUrl: res.html_url,
    roleType: res.type,
  }
}

// private interfaces for package api-github
export interface RUserDetail {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  created_at: string;
  email: string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: number
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean
  starred_url: string;
  subscriptions_url: string;
  type: string;
  updated_at: string;
  url: string;
}

export interface RUserItem {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean,
  score: number;
}

export interface RSearchByUser {
  total_count: number;
  incomplete_results: boolean;
  items: RUserItem[];
}
