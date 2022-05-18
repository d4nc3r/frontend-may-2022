import { createReducer, on } from '@ngrx/store';
import { NotificationsCommands } from '../actions/notifications.actions';

export interface FeatureNotificationState {
  hasErrors: boolean;
  errorMessage?: string;
}

const initialState: FeatureNotificationState = {
  hasErrors: false,
};

export const reducer = createReducer(
  initialState,
  on(NotificationsCommands.displayApiNotification, (s, a) => ({
    hasErrors: true,
    errorMessage: `${a.source}: ${a.message}`,
  }))
);
