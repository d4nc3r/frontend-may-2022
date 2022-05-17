import { createAction, props } from '@ngrx/store';

export const NotificationsEvents = {};

export const NotificationsCommands = {
  displayApiNotification: createAction(
    '[courses] display api error notification',
    props<{ source: string; message: string }>()
  ),
};

export const NotificationsDocuments = {};
