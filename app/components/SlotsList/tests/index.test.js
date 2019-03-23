import React from 'react';
import { shallow } from 'enzyme/build';
import { shallowToJson } from 'enzyme-to-json';

import SlotsList from '../index';

describe('<SlotsList />', () => {
  it('Should render correctly', () => {
    const mockSlots = [
      {
        activity: 'SURFING',
        date: '2019-03-29T11:00',
        duration: 90,
      },
      {
        activity: 'WEIGHTS',
        date: '2019-03-27T13:00',
        duration: 90,
      },
    ];
    const output = shallow(<SlotsList slots={mockSlots} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
