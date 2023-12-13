// data.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as DataActions from './user.actions'; // Create a service to fetch data
import { UserService } from '../user.service';

@Injectable()
export class DataEffects {
  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(DataActions.loadData),
    mergeMap(() => this.dataService.getUsers()
      .pipe(
        tap(data => console.log('Data from the api:', data)),
        map(data => DataActions.loadDataSuccess({data})),
        catchError(error => EMPTY)
      ))
  ));

  constructor(
    private actions$: Actions,
    private dataService: UserService, // Create this service to fetch data from the API
  ) {}
}
