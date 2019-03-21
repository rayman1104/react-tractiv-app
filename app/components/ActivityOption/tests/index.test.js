import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SpinIcon from 'images/icn_spin.svg';
import SpinIconActive from 'images/icn_spin_white.svg';
import ActivityOption from '../index';

describe('<ActivityOption />', () => {
  it('Should render correctly', () => {
    const output = shallow(
      <ActivityOption
        img={SpinIcon}
        activeImg={SpinIconActive}
        text="SPINNING"
        selected
        onSelect={() => {}}
      />,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
