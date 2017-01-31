import React from 'react';
import MapContainer from './map/map_container';

const App = ({ children }) => (
  <div>
    <MapContainer />
    {children}
  </div>
);

export default App;