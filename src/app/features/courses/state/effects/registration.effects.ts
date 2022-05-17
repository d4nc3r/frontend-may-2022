import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { selectCourseAndUserForRegistration } from '..';
import {
  RegistrationCommands,
  RegistrationEvents,
} from '../actions/registration.actions';

@Injectable()
export class RegistrationEffects {
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
          this.http.post('/api/registrations', action.payload)
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {}
}
