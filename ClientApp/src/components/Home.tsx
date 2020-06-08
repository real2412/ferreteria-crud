import * as React from 'react';
import { connect } from 'react-redux';

import CrudProductos from './CrudProductos';

const Home = () => (
  <div>
    <CrudProductos/>
  </div>
);

export default connect()(Home);
