import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mainPage state domain
 */

const selectMainPageDomain = state => state.get('mainPage', initialState);

/**
 * Other specific selectors
 */

const makeSelectActivitySlots = () =>
  createSelector(selectMainPageDomain, state =>
    state.get('activitySlots').toJS(),
  );

const makeSelectSchedule = () =>
  createSelector(selectMainPageDomain, state => state.get('schedule').toJS());

/**
 * Default selector used by MainPage
 */

const makeSelectMainPage = () =>
  createSelector(selectMainPageDomain, substate => substate.toJS());

export default makeSelectMainPage;
export { selectMainPageDomain, makeSelectActivitySlots, makeSelectSchedule };
