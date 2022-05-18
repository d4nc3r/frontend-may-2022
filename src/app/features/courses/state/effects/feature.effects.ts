import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { ClassesCommands } from '../actions/classes.actions';
import { CoursesCommands } from '../actions/courses.actions';
import { FeatureEvents } from '../actions/feature.actions';
import { RegistrationCommands } from '../actions/registration.actions';

@Injectable()
export class FeatureEffects {
  constructor(private actions$: Actions) {}

  onFeatureStartedLoadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeatureEvents.featureEntered),
      map(() => CoursesCommands.LoadCourses())
    );
  });

  onFeatureStartedLoadSchedule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeatureEvents.featureEntered),
      map(() => ClassesCommands.LoadClasses())
    );
  });

  onFeatureStartedLoadRegistrations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeatureEvents.featureEntered),
      map(() => RegistrationCommands.loadRegistrations())
    );
  });
}
