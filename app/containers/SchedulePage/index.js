/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
/**
 *
 * SchedulePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';

import moment from 'moment';

import CloseIcon from 'images/icn_close.svg';

import SpinIcon from 'images/icn_spin.svg';
import SurfingIcon from 'images/icn_surfing.svg';
import WeightsIcon from 'images/icn_weights.svg';
import HikingIcon from 'images/icn_hiking.svg';

import SpinIconActive from 'images/icn_spin_white.svg';
import SurfingIconActive from 'images/icn_surfing_white.svg';
import WeightsIconActive from 'images/icn_weights_white.svg';
import HikingIconActive from 'images/icn_hiking_white.svg';

import ActivityOption from 'components/ActivityOption';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { addActivity, loadSchedule } from '../MainPage/actions';
import reducer from '../MainPage/reducer';
import saga from '../MainPage/saga';
import { makeSelectSchedule } from '../MainPage/selectors';
import { getDaySlots } from './sheduleSlots';

const durations = [
  { name: '15 min', value: 15 },
  { name: '30 min', value: 30 },
  { name: '45 min', value: 45 },
  { name: '1 h', value: 60 },
  { name: '1 h 30 min', value: 90 },
  { name: '2 h', value: 120 },
  { name: '2 h 30 min', value: 150 },
  { name: '3 h', value: 180 },
  { name: '3 h 30 min', value: 210 },
];

/* eslint-disable react/prefer-stateless-function */
export class SchedulePage extends React.PureComponent {
  state = {
    activity: null,
    duration: '15',
    date: undefined,
  };

  componentDidMount() {
    this.props.onMount();
  }

  onDurationChange = event => {
    this.setState({ duration: event.target.value });
  };

  onDateChange = event => {
    this.setState({ date: event.target.value });
  };

  onSubmit = () => {
    const { activity, duration, date } = this.state;
    this.props.addSlot(activity, date, +duration);
    console.log({ activity, duration, date });
    this.props.push('/');
  };

  findFreeSlots = (schedule, duration) => {
    if (!schedule) {
      return [];
    }
    const freeSlots = [];
    for (let i = 1; i < 8; i += 1) {
      const dayStart = moment()
        .startOf('day')
        .add(i, 'days');
      const weekday = dayStart.format('dddd');
      if (weekday in schedule) {
        const daySlots = getDaySlots(duration, schedule[weekday]).map(
          offset => {
            const startDay = dayStart.clone();
            return startDay.add(offset, 'minutes');
          },
        );
        Array.prototype.push.apply(freeSlots, daySlots);
      }
    }
    return freeSlots.map(slot => ({
      name: slot.format('dddd, MMMM Do h:mma'),
      value: slot.format('YYYY-MM-DDTHH:mm'),
    }));
  };

  render() {
    const { schedule } = this.props;
    const { activity, duration, date } = this.state;
    return (
      <div className="page app_overlay">
        <button
          type="button"
          className="app_header_overlay"
          onClick={() => this.props.push('/')}
        >
          <img src={CloseIcon} alt="Close" className="app_close_icon" />
        </button>

        <div className="app_main">
          <h1 className="app_main_overlay_header">Schedule your activity</h1>
          <div className="app_main_day_roll app_main_overlay_roll">
            <ActivityOption
              img={SpinIcon}
              activeImg={SpinIconActive}
              text="SPINNING"
              selected={activity === 'SPINNING'}
              onSelect={() => {
                this.setState({ activity: 'SPINNING' });
              }}
            />
            <ActivityOption
              img={SurfingIcon}
              activeImg={SurfingIconActive}
              text="SURFING"
              selected={activity === 'SURFING'}
              onSelect={() => {
                this.setState({ activity: 'SURFING' });
              }}
            />
            <ActivityOption
              img={WeightsIcon}
              activeImg={WeightsIconActive}
              text="WEIGHTS"
              selected={activity === 'WEIGHTS'}
              onSelect={() => {
                this.setState({ activity: 'WEIGHTS' });
              }}
            />
            <ActivityOption
              img={HikingIcon}
              activeImg={HikingIconActive}
              text="HIKING"
              selected={activity === 'HIKING'}
              onSelect={() => {
                this.setState({ activity: 'HIKING' });
              }}
            />
          </div>

          <div className="app_overlay_question">
            <div className="app_overlay_question_title">
              How long do you want to do this activity?
            </div>
            <div className="app_input_ghost_wrapper">
              <select
                className="app_input_ghost"
                onChange={this.onDurationChange}
                value={duration}
              >
                {durations.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="app_overlay_question">
            <div className="app_overlay_question_title">
              When do you want to do this activity?
            </div>
            <div className="app_input_group_wrapper">
              <div className="app_input_wrapper">
                <input
                  className="app_input"
                  id="date"
                  type="datetime-local"
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                  value={date}
                  onChange={this.onDateChange}
                  placeholder="Pick a date & time or find a free slot"
                />
              </div>
              <select
                className="app_input_icon_pretender"
                onChange={this.onDateChange}
              >
                {this.findFreeSlots(schedule, duration).map(slot => (
                  <option
                    className="app_input_date_option"
                    key={slot.value}
                    value={slot.value}
                  >
                    {slot.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="app_overlay_filler" />

        <div
          className={activity && date ? 'app_button' : 'app_button_disabled'}
          onClick={activity && date ? this.onSubmit : null}
        >
          <span className="app_button_text">Schedule</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  schedule: makeSelectSchedule(),
});

const mapDispatchToProps = {
  onMount: loadSchedule,
  addSlot: addActivity,
  push,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(SchedulePage);
