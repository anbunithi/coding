// data.actions.ts
import { createAction, props } from '@ngrx/store';
import { Root } from '../model/model';

export const loadData = createAction('[Data] Load Data');
export const loadDataSuccess = createAction('[Data] Load Data Success', props<{ data: Root[] }>());
export const loadDataFailure = createAction('[Data] Load Data Failure', props<{ error: Root }>());
