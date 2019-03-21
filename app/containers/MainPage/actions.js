/*
 *
 * SchedulePage actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_ACTIVITY_SLOT,
  LOAD_SCHEDULE,
  LOAD_SCHEDULE_SUCCESS,
  LOAD_SCHEDULE_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addActivitySlot(activity, date, duration) {
  return {
    type: ADD_ACTIVITY_SLOT,
    activity,
    date,
    duration,
  };
}

export function loadSchedule() {
  return {
    type: LOAD_SCHEDULE,
  };
}

export function scheduleLoaded(schedule) {
  return {
    type: LOAD_SCHEDULE_SUCCESS,
    schedule,
  };
}

export function scheduleLoadingError(err) {
  return {
    type: LOAD_SCHEDULE_ERROR,
    err,
  };
}
