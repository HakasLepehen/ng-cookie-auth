import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of, switchMap, tap} from 'rxjs';
import {Environment} from '@angular/cli/lib/config/workspace-schema';
import {App} from './app';
import {API_URL} from './constants';

type User = any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = inject(API_URL);
  http = inject(HttpClient);
  router = inject(Router);

  user = signal<any>(null);

  fetchUser(forceReload = false): Observable<User> {
    const user = this.user();

    if (!!user && !forceReload) return of(user);

    return this.http.get<any>(`${API_URL}/me`, {}).pipe(
      tap(u => this.user.set(u))
    );
  }

  register(credentials: {
    email: string,
    password: string,
    name: string,
    surname: string
  }) {
    return this.http.post<boolean>(`${API_URL}/register`, credentials);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${API_URL}/login`, { email, password }).pipe(
      switchMap(() => this.fetchUser()),
    );
  }
}
