import { createReducer } from '@ngrx/store';

export interface FeatureNotificationState {
  hasErrors: boolean;
  errorMessage?: string;
}

const initialState: FeatureNotificationState = {
  hasErrors: false,
};

export const reducer = createReducer(initialState);
