import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromCourses from './reducers/courses.reducer';
import * as fromClasses from './reducers/classes.reducer';
import * as fromNotifications from './reducers/feature-notification.reducer';
import * as fromRegistrations from './reducers/registrations.reducer';
import {
  CourseEnrollmentViewModel,
  RegistrationItemViewModel,
  RegistrationsViewModel,
} from '../models';
import { selectUserName } from '../../auth/state';
import { RegistrationRequest } from './actions/registration.actions';
export const featureName = 'featureCourses';

export interface CoursesState {
  courses: fromCourses.CoursesState;
  classes: fromClasses.ClassesState;
  notifications: fromNotifications.FeatureNotificationState;
  registrations: fromRegistrations.RegistrationState;
}

export const reducers: ActionReducerMap<CoursesState> = {
  courses: fromCourses.reducer,
  classes: fromClasses.reducer,
  notifications: fromNotifications.reducer,
  registrations: fromRegistrations.reducer,
};

const selectFeature = createFeatureSelector<CoursesState>(featureName);

const selectCoursesBranch = createSelector(selectFeature, (f) => f.courses);
const selectClassesBranch = createSelector(selectFeature, (f) => f.classes);
const selectNotificationsBranch = createSelector(
  selectFeature,
  (f) => f.notifications
);
const selectRegistrationsBranch = createSelector(
  selectFeature,
  (f) => f.registrations
);

const { selectAll: selectAllRegistrationEntities } =
  fromRegistrations.adapter.getSelectors(selectRegistrationsBranch);

export const selectAllRegistrations = selectAllRegistrationEntities;

export const selectNotificationNeeded = createSelector(
  selectNotificationsBranch,
  (b) => b.hasErrors
);

export const selectNotificationMessage = createSelector(
  selectNotificationsBranch,
  (b) => b.errorMessage || 'something bad happened.'
);
const {
  selectAll: selectAllCoursesArray,
  selectEntities: selectCourseEntities,
} = fromCourses.adapter.getSelectors(selectCoursesBranch);

const {
  selectEntities: selectAllClassesEntities,
  selectAll: selectAllClassesArray,
} = fromClasses.adapter.getSelectors(selectClassesBranch);

export const selectAllCourses = selectAllCoursesArray;

export const selectCourseById = (id: string) =>
  createSelector(selectCourseEntities, (entities) => entities[id]);

export const selectClassDatesById = (courseId: string) =>
  createSelector(
    selectAllClassesEntities,
    (entities) => entities[courseId]?.offerings
  );

export const selectCourseAndUserForRegistration = (
  courseId: string,
  date: string
) =>
  createSelector(selectCourseById(courseId), selectUserName, (course, user) => {
    return {
      courseId: courseId,
      courseName: course?.title,
      dateOfCourse: date,
      user,
    } as RegistrationRequest;
  });

export const selectCourseEnrollmentViewModel = (courseId: string) =>
  createSelector(
    selectCourseEntities,
    selectAllClassesEntities,
    selectUserName,
    (courses, classes, user) => {
      const course = courses[courseId];
      const offerings =
        classes[courseId]?.offerings.map((o) => {
          const msDiff =
            new Date(o.endDate).getTime() - new Date(o.startDate).getTime();
          const days = msDiff / (1000 * 3600 * 24);
          return { ...o, numberOfDays: days + 1 };
        }) || [];
      if (course) {
        return {
          course: course,
          dates: offerings,
          user,
        } as CourseEnrollmentViewModel;
      } else {
        return undefined;
      }
    }
  );

interface ClassDateInfo {
  id: string;
  startDate: string;
  endDate: string;
}
const selectDateForRegistration = createSelector(
  selectAllClassesArray,
  (classes) => {
    // this will stink.
    // go through each class, and create a new item in an array with the id, the startDate, and the endDate
    // such that the id and startDate are the "unique" parts.
    const x = classes.reduce((lhs: ClassDateInfo[], rhs) => {
      let smooshed = rhs.offerings.map((r) => ({
        startDate: r.startDate,
        endDate: r.endDate,
      }));
      let newThing: ClassDateInfo[] = smooshed.map((s) => ({
        id: rhs.id,
        startDate: s.startDate,
        endDate: s.endDate,
      }));
      return [...lhs, ...newThing];
    }, []);
    return x;
  }
);

const selectRegistrationItemViewModels = createSelector(
  selectAllRegistrationEntities,
  selectDateForRegistration,
  (registrations, endDate) =>
    registrations.map((r) => {
      const endDateInfo = endDate.find(
        (e) => e.id === r.courseId && e.startDate === r.dateOfCourse
      )?.endDate;
      return {
        id: r.registrationId,
        courseName: r.courseName,
        startDate: r.dateOfCourse,
        endDate: endDateInfo,
        startTime: '9:30 AM ET',
        endTime: '5:00 PM ET',
        cancellationAllowed: true, // ???
        status: r.status,
        invitationSent: false,
      } as RegistrationItemViewModel;
    })
);

export const selectRegistrationListViewModel = createSelector(
  selectRegistrationItemViewModels,
  (registrations) => ({ registrations })
  // selectAllRegistrations,
  // () => {
  //   return {
  //     registrations: [
  //       {
  //         id: 'course1',
  //         courseName: 'Country Line Dancing',
  //         cancellationAllowed: true,
  //         status: 'PENDING',
  //         startDate: '2022-08-01',
  //         endDate: '2022-08-03',
  //         startTime: '9:30 ET',
  //         endTime: '5:00 ET',
  //       },
  //       {
  //         id: 'course2',
  //         courseName: 'Kubernetes for Smarties',
  //         cancellationAllowed: false,
  //         status: 'APPROVED',
  //         startDate: '2022-05-20',
  //         endDate: '2022-05-23',
  //         startTime: '9:30 ET',
  //         endTime: '5:00 ET',
  //       },
  //     ],
  //   } as RegistrationsViewModel;
  // }
);
