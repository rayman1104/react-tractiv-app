/*
 *
 * SchedulePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ADD_ACTIVITY_SLOT_SUCCESS,
  LOAD_SCHEDULE_SUCCESS,
  LOAD_ACTIVITIES_SUCCESS,
} from './constants';

export const initialState = fromJS({
  activitySlots: [],
  schedule: {},
});

function schedulePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_ACTIVITIES_SUCCESS: {
      return state.set('activitySlots', action.activities);
    }
    case ADD_ACTIVITY_SLOT_SUCCESS: {
      const newSlot = fromJS({
        activity: action.activity,
        date: action.date,
        duration: action.duration,
      });
      return state.update('activitySlots', activities =>
        activities.push(newSlot),
      );
      /*
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
      */
    }
    case LOAD_SCHEDULE_SUCCESS: {
      return state.set('schedule', action.schedule);
    }
    default:
      return state;
  }
}

export default schedulePageReducer;
