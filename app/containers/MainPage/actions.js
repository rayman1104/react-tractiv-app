import {
  DEFAULT_ACTION,
  ADD_ACTIVITY_SLOT,
  ADD_ACTIVITY_SLOT_SUCCESS,
  ADD_ACTIVITY_SLOT_ERROR,
  LOAD_ACTIVITIES,
  LOAD_ACTIVITIES_SUCCESS,
  LOAD_ACTIVITIES_ERROR,
  LOAD_SCHEDULE,
  LOAD_SCHEDULE_SUCCESS,
  LOAD_SCHEDULE_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addActivity(activity, date, duration) {
  return {
    type: ADD_ACTIVITY_SLOT,
    activity,
    date,
    duration,
  };
}

export function addActivitySuccess(activity, date, duration) {
  return {
    type: ADD_ACTIVITY_SLOT_SUCCESS,
    activity,
    date,
    duration,
  };
}

export function addActivityError(err) {
  return {
    type: ADD_ACTIVITY_SLOT_ERROR,
    err,
  };
}

export function loadActivities() {
  return {
    type: LOAD_ACTIVITIES,
  };
}

export function loadActivitiesSuccess(activities) {
  return {
    type: LOAD_ACTIVITIES_SUCCESS,
    activities,
  };
}

export function loadActivitiesError(err) {
  return {
    type: LOAD_ACTIVITIES_ERROR,
    err,
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
