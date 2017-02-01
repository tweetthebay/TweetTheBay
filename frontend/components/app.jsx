import React from 'react';
import MapContainer from './map/map_container';
import SearchContainer from './search/search_container';

const App = ({ children }) => (
  <div>
    <SearchContainer />
    <MapContainer />
    {children}
  </div>
);

export default App;
