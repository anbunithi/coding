// data.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  users: any[]; // Change this to match the actual structure
}

// Create a feature selector for the entire state
export const selectAppState = createFeatureSelector<AppState>('appState');

// Create a selector to get the users array
export const selectUsers = createSelector(
  selectAppState,
  (state: AppState) => state.users
);
