import Immutable from 'immutable'
import {
  VideosFetchedAction,
  PublicVideoState
} from './actions'

import {
  VIDEOS_FETCHED_SUCCESS,
  VIDEOS_FETCHED_ERROR
} from '../actions'

export const initialState: PublicVideoState = {
  videos: [],
  error: ''
}

const immutableState = Immutable.fromJS(initialState)

export default function videoReducer (state = immutableState, action: VideosFetchedAction): any {
  switch (action.type) {
    case VIDEOS_FETCHED_SUCCESS:
      return state
        .set('videos', (action as VideosFetchedAction).videos)
    case VIDEOS_FETCHED_ERROR:
      return state
        .set('error', (action as VideosFetchedAction).message)
  }

  return state
}
