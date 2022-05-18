import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, tap } from 'rxjs';
import { selectCourseAndUserForRegistration } from '..';
import {
  RegistrationCommands,
  RegistrationDocuments,
  RegistrationEvents,
} from '../actions/registration.actions';
import { RegistrationEntity } from '../reducers/registrations.reducer';

@Injectable()
export class RegistrationEffects {
  sendThemToTheRegistatrionPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegistrationDocuments.Registration),
        tap(() => this.router.navigate(['../courses/registrations']))
      );
    },
    { dispatch: false }
  );

  createRegistrationRequest$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegistrationEvents.registrationRequested),
        concatLatestFrom((a) =>
          this.store.select(
            selectCourseAndUserForRegistration(a.payload.course, a.payload.date)
          )
        ),
        map(([_, payload]) =>
          RegistrationCommands.createRegistration({ payload })
        )
      );
    },
    { dispatch: true }
  );

  sendRegistration$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegistrationCommands.createRegistration),
        // https://blog.angular-university.io/rxjs-higher-order-mapping/
        switchMap((action) =>
          this.http
            .post<RegistrationEntity>('/api/registrations', action.payload)
            .pipe(
              map((response) =>
                RegistrationDocuments.Registration({ payload: response })
              )
            )
        )
      );
    },
    { dispatch: true }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private http: HttpClient,
    private router: Router
  ) {}
}
