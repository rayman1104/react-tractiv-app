import { takeLatest, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import request, { statusRequest } from 'utils/request';
import {
  scheduleLoaded,
  scheduleLoadingError,
  addActivitySuccess,
  addActivityError,
  loadActivitiesSuccess,
  loadActivitiesError,
} from './actions';
import { LOAD_ACTIVITIES, LOAD_SCHEDULE, ADD_ACTIVITY_SLOT } from './constants';

export function* addActivity(action) {
  const requestURL = '/api/activities';
  const { activity, date, duration } = action;
  try {
    const packet = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activity, date, duration }),
    };
    yield call(statusRequest, requestURL, packet);
    yield put(addActivitySuccess(activity, date, duration));
  } catch (err) {
    yield put(addActivityError(err));
  }
}

export function* loadActivities() {
  const requestURL = '/api/activities';
  try {
    const fetchedActivities = yield call(request, requestURL);
    const activities = yield fromJS(fetchedActivities);
    yield put(loadActivitiesSuccess(activities));
  } catch (err) {
    yield put(loadActivitiesError(err));
  }
}

export function* getSchedule() {
  const requestURL = '/api/schedule';
  try {
    const fetchedSchedule = yield call(request, requestURL);
    const schedule = yield fromJS(fetchedSchedule);
    yield put(scheduleLoaded(schedule));
  } catch (err) {
    yield put(scheduleLoadingError(err));
  }
}

export default function* mainPageSaga() {
  yield takeLatest(ADD_ACTIVITY_SLOT, addActivity);
  yield takeLatest(LOAD_ACTIVITIES, loadActivities);
  yield takeLatest(LOAD_SCHEDULE, getSchedule);
}
