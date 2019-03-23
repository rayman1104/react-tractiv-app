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

/*
*  [{ activity, date, duration }]
*  -> { 'YYYY-MM-DD': [{ activity, date, duration, 'h:mmA' }] }
*/
function processSlots(slots) {
  return slots.sort(byField('date')).reduce((acc, slot) => {
    const date = moment(slot.date).format('YYYY-MM-DD');
    const time = moment(slot.date).format('h:mmA');
    return {
      ...acc,
      [date]: [
        ...(acc[date] || []),
        {
          activity: slot.activity,
          date: slot.date,
          time,
          duration: slot.duration,
        },
      ],
    };
  }, {});
}

/* eslint-disable react/prefer-stateless-function */
class SlotsList extends React.PureComponent {
  render() {
    const { slots } = this.props;
    if (slots.length < 1) {
      return (
        <span className="app_main_section_text">
          You don&apos;t have any activities schedules yet.
        </span>
      );
    }
    const processedSlots = processSlots(slots);
    const dates = Object.keys(processedSlots).sort();
    return dates.map(date => (
      <section key={date} className="app_main_day">
        <h2 className="app_main_day_date">{moment(date).format('MMMM D')}</h2>
        <h2 className="app_main_day_weekday">{moment(date).format('dddd')}</h2>
        <div className="app_main_day_roll_wrap">
          <div className="app_main_day_roll">
            {processedSlots[date].map(slot => (
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
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      activity: PropTypes.oneOf(['SURFING', 'HIKING', 'WEIGHTS', 'SPINNING'])
        .required,
      date: PropTypes.string.required,
      duration: PropTypes.number,
    }),
  ),
};

export default SlotsList;
