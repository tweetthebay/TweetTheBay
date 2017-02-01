import React from 'react';
import MapContainer from './map/map_container';
import HeaderContainer from './header/header_container';

const App = ({ children }) => (
  <div>
    <HeaderContainer />
    <MapContainer />
    {children}
  </div>
);

export default App;
