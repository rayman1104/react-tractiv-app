/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
/**
 *
 * MainPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import LogoHeader from 'images/logo_header_wide.svg';
import SurfImage from 'images/1_surf.png';
import SurfImage2x from 'images/1_surf@2x.png';
import SurfPicture from 'images/surfing.png';
import SurfPicture2x from 'images/surfing@2x.png';
import HikeImage from 'images/2_hike.png';
import HikeImage2x from 'images/2_hike@2x.png';
import HikePicture from 'images/hiking.png';
import HikePicture2x from 'images/hiking@2x.png';
import WeightsImage from 'images/3_weights.png';
import WeightsImage2x from 'images/3_weights@2x.png';
import WeightsPicture from 'images/weights.png';
import WeightsPicture2x from 'images/weights@2x.png';
import SpinImage from 'images/4_spin.png';
import SpinImage2x from 'images/4_spin@2x.png';
import SpinPicture from 'images/spinning.png';
import SpinPicture2x from 'images/spinning@2x.png';

import SlotsList from 'components/SlotsList';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectActivitySlots } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadActivities } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class MainPage extends React.PureComponent {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div className="app page">
        <div className="app_header_main">
          <img src={LogoHeader} alt="Tractiv" className="app_header_image" />
        </div>
        <div className="app_main">
          <h1 className="app_main_header"> Track Your Activity </h1>

          <div className="app_grid">
            <div className="app_grid_cell">
              <img
                src={SurfPicture}
                srcSet={`${SurfPicture2x} 2x`}
                className="img-fluid app_grid_cell_image"
                alt="Action #1"
              />
              <div className="app_grid_data">
                <h2 className="app_grid_cell_title">Surfing</h2>
                <span className="app_grid_cell_text">Ocean beach</span>
              </div>
              <div className="app_grid_cell_action">
                <img
                  src={SurfImage}
                  srcSet={`${SurfImage2x} 2x`}
                  className="app_grid_cell_action_icon"
                  alt="Surfing"
                />
              </div>
            </div>

            <div className="app_grid_cell">
              <img
                src={HikePicture}
                srcSet={`${HikePicture2x} 2x`}
                className="img-fluid app_grid_cell_image"
                alt="Action #2"
              />
              <div className="app_grid_data">
                <h2 className="app_grid_cell_title">Hiking</h2>
                <span className="app_grid_cell_text">Torrey pines</span>
              </div>
              <div className="app_grid_cell_action">
                <img
                  src={HikeImage}
                  srcSet={`${HikeImage2x} 2x`}
                  className="app_grid_cell_action_icon"
                  alt="Hiking"
                />
              </div>
            </div>

            <div className="app_grid_cell">
              <img
                src={WeightsPicture}
                srcSet={`${WeightsPicture2x} 2x`}
                className="img-fluid app_grid_cell_image"
                alt="Action #3"
              />
              <div className="app_grid_data">
                <h2 className="app_grid_cell_title">Weights</h2>
                <span className="app_grid_cell_text">Encinitas</span>
              </div>
              <div className="app_grid_cell_action">
                <img
                  src={WeightsImage}
                  srcSet={`${WeightsImage2x} 2x`}
                  className="app_grid_cell_action_icon"
                  alt="Weights"
                />
              </div>
            </div>

            <div className="app_grid_cell">
              <img
                src={SpinPicture}
                srcSet={`${SpinPicture2x} 2x`}
                className="img-fluid app_grid_cell_image"
                alt="Action #4"
              />
              <div className="app_grid_data">
                <h2 className="app_grid_cell_title">Spinning</h2>
                <span className="app_grid_cell_text">Gym</span>
              </div>
              <div className="app_grid_cell_action">
                <img
                  src={SpinImage}
                  srcSet={`${SpinImage2x} 2x`}
                  className="app_grid_cell_action_icon"
                  alt="Spinning"
                />
              </div>
            </div>
          </div>

          <h1 className="app_main_section_title"> Scheduled Activities </h1>
          <SlotsList slots={this.props.activitySlots} />
        </div>

        <div
          className="app_button app_button_with_icon app_button_active"
          onClick={() => this.props.push('/schedule')}
        >
          <button type="button" className="app_button_text">
            Schedule activity
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  activitySlots: makeSelectActivitySlots(),
});

const mapDispatchToProps = {
  onMount: loadActivities,
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
)(MainPage);
