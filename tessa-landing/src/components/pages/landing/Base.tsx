import React from 'react';

import { AppConfig } from '../../../utils/AppConfig';
import { Meta } from '../../layout/Meta';
import { Landing } from './Landing';
// import { VerticalFeatures } from './VerticalFeatures';

const Base = () => (
  <div className="antialiased text-gray-600">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Landing />
  </div>
);

export { Base };
