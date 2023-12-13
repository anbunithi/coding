// data.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as DataActions from './user.actions';
import { Root } from '../model/model';

export interface AppState {
  users: Root[],
  total: number,
  skip: number,
  limit: number // Define the type of your users array
}

export const initialState: AppState = {
  users:[],
  total: 0,
  skip: 0,
  limit: 0
}

export const dataReducer = createReducer(
  initialState,
  on(DataActions.loadDataSuccess, (state, { data }) => ({ ...state, users: data })),
);
