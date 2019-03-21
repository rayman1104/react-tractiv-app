/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
/**
 *
 * ActivityOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const ActivityOption = ({ img, activeImg, text, selected, onSelect }) => (
  <div
    className={`app_main_day_activity ${selected &&
      'app_main_overlay_activity_active'}`}
    onClick={onSelect}
  >
    <div className="app_grid_day_action">
      <img
        src={selected ? activeImg : img}
        className="app_grid_day_action_icon"
        alt={text}
      />
    </div>
    <span className="app_grid_overlay_text">{text}</span>
  </div>
);

ActivityOption.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  activeImg: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export default ActivityOption;
