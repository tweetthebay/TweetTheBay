import React from 'react';
import MapContainer from './map/map_container';
import SearchContainer from './search/search_container';
import SidebarContainer from './sidebar/sidebar_container';

const App = ({ children }) => (
  <div>
    <SearchContainer />
    <main className='index-body'>
      <SidebarContainer />
      <MapContainer />
    </main>
    {children}
  </div>
);

export default App;
