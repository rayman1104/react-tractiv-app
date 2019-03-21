import React from 'react';
import { shallow } from 'enzyme/build';
import { shallowToJson } from 'enzyme-to-json';

import SlotsList from '../index';

describe('<SlotsList />', () => {
  it('Should render correctly', () => {
    const mockSlots = {
      '2019-03-20': [
        {
          activity: 'SURFING',
          time: '11:00AM',
          date: '2019-03-20T11:00',
          duration: 90,
        },
      ],
    };
    const output = shallow(<SlotsList slots={mockSlots} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
