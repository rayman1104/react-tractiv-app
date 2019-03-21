import { takeLatest, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import request from 'utils/request';
import { scheduleLoaded, scheduleLoadingError } from './actions';
import { LOAD_SCHEDULE } from './constants';

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
  yield takeLatest(LOAD_SCHEDULE, getSchedule);
}
