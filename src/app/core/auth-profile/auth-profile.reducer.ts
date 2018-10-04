import { AppState } from '../core.state';

import * as ProfileActions from './auth-profile.actions';
import { Profile } from './auth-profile.model';

export type ProfileAction = ProfileActions.AllActions;

/**
 * Define all store queries for Profile
 */
export namespace ProfileQuery {
  export const getProfile = (state: AppState) => state.profile;
}

/// Reducer function
export function profileReducer(state: Profile, action: ProfileAction) {
  switch (action.type) {
    case ProfileActions.GET_PROFILE:
      return { ...state, loading: true };

    case ProfileActions.GET_PROFILE_SUCCESS:
      return { ...state, ...action.payload, loading: false };

    case ProfileActions.GET_PROFILE_FAIL:
      return { ...state, ...action.payload, loading: false };

    case ProfileActions.UPDATE_PROFILE:
      return { ...state, ...action.payload, loading: true };

    case ProfileActions.UPDATE_SUCCESS:
      return { ...state, loading: false };

    case ProfileActions.UPDATE_FAIL:
      return { ...state, ...action.payload, loading: false };

    default:
      return state;
  }
}
