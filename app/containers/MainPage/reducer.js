/*
 *
 * SchedulePage reducer
 *
 */

import { fromJS } from 'immutable';
import moment from 'moment';
import {
  DEFAULT_ACTION,
  ADD_ACTIVITY_SLOT,
  LOAD_SCHEDULE_SUCCESS,
} from './constants';

export const initialState = fromJS({
  activitySlots: {},
  schedule: {},
});

function schedulePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_ACTIVITY_SLOT: {
      const date = moment(action.date).format('YYYY-MM-DD');
      const time = moment(action.date).format('h:mmA');
      const newSlot = fromJS({
        activity: action.activity,
        date: action.date,
        time,
        duration: action.duration,
      });
      return state.updateIn(['activitySlots', date], (val = fromJS([])) =>
        val.push(newSlot),
      );
    }
    case LOAD_SCHEDULE_SUCCESS: {
      return state.set('schedule', action.schedule);
    }
    default:
      return state;
  }
}

export default schedulePageReducer;
