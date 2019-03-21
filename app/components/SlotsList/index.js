/**
 *
 * SlotsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import SurfImage from 'images/1_surf.png';
import SurfImage2x from 'images/1_surf@2x.png';
import HikeImage from 'images/2_hike.png';
import HikeImage2x from 'images/2_hike@2x.png';
import WeightsImage from 'images/3_weights.png';
import WeightsImage2x from 'images/3_weights@2x.png';
import SpinImage from 'images/4_spin.png';
import SpinImage2x from 'images/4_spin@2x.png';

const activityImages = {
  SURFING: [SurfImage, SurfImage2x],
  HIKING: [HikeImage, HikeImage2x],
  WEIGHTS: [WeightsImage, WeightsImage2x],
  SPINNING: [SpinImage, SpinImage2x],
};

function byField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

/* eslint-disable react/prefer-stateless-function */
class SlotsList extends React.PureComponent {
  render() {
    const { slots } = this.props;
    const dates = Object.keys(slots).sort();
    if (dates.length < 1) {
      return (
        <span className="app_main_section_text">
          You don&apos;t have any activities schedules yet.
        </span>
      );
    }
    return dates.map(date => (
      <section key={date} className="app_main_day">
        <h2 className="app_main_day_date">{moment(date).format('MMMM D')}</h2>
        <h2 className="app_main_day_weekday">{moment(date).format('dddd')}</h2>
        <div className="app_main_day_roll_wrap">
          <div className="app_main_day_roll">
            {slots[date].sort(byField('date')).map(slot => (
              <div
                key={slot.date + slot.activity}
                className="app_main_day_activity"
              >
                <div className="app_grid_day_action">
                  <img
                    src={activityImages[slot.activity][0]}
                    srcSet={`${activityImages[slot.activity][1]} 2x`}
                    className="app_grid_day_action_icon"
                    alt={slot.activity}
                  />
                </div>
                <span className="app_grid_day_time">{slot.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    ));
  }
}

SlotsList.propTypes = {
  slots: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        activity: PropTypes.oneOf(['SURFING', 'HIKING', 'WEIGHTS', 'SPINNING'])
          .required,
        time: PropTypes.string.required,
        date: PropTypes.string.required,
        duration: PropTypes.number,
      }),
    ),
  ),
};

export default SlotsList;
